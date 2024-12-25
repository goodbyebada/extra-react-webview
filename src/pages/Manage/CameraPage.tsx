import { useRef, useEffect, useState } from "react";

import styled from "styled-components";
import { Container, Window } from "@components/atoms/Container";
import Color from "@/constants/color";

import { RxCross2 } from "react-icons/rx";
import { IoIosFlash, IoIosFlashOff } from "react-icons/io";
import { MdCameraswitch } from "react-icons/md";

import VConsole from "vconsole";
const vConsole = new VConsole({ theme: "dark" });
import { FaCamera } from "react-icons/fa6";

const CaptureIconButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;
  border-radius: 50%;

  background: ${Color.theme};
`;

const CameraPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const [isFlashOn, setIsFlashOn] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      alert("해당 브라우저는 카메라 기능을 지원하지 않습니다.");
      return;
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log("Available devices:", devices);

    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput",
    );

    if (videoDevices.length === 0) {
      alert("카메라가 감지되지 않았습니다.");
      return;
    }

    const constraints = {
      video: {
        deviceId: videoDevices[0]?.deviceId || undefined,
        facingMode: "environment", // 필요 시 "environment"로 변경
        width: { ideal: 1920 }, // 가급적 1080p 해상도
        height: { ideal: 1080 },
        frameRate: { ideal: 30 },
      },
    };

    try {
      const mediaStream =
        await navigator.mediaDevices.getUserMedia(constraints);
      const videoTrack = mediaStream.getVideoTracks()[0];
      videoTrack.applyConstraints({
        advanced: [
          {
            frameRate: 30,
            width: 1920,
            height: 1080,
          },
        ],
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
      alert("카메라 접근에 문제가 있습니다.");
    }
  };

  const toggleFlash = async () => {
    if (!stream) {
      alert("카메라 스트림이 활성화되지 않았습니다.");
      return;
    }

    const videoTrack = stream.getVideoTracks()[0];
    const capabilities = videoTrack.getCapabilities() as { torch?: boolean };

    if (!capabilities.torch) {
      alert("이 디바이스는 플래시 기능을 지원하지 않습니다.");
      return;
    }

    try {
      await videoTrack.applyConstraints({
        advanced: [{ torch: !isFlashOn }],
      } as unknown as MediaTrackConstraints);
      setIsFlashOn((prev) => !prev);
    } catch (err) {
      console.error("플래시 토글 중 오류:", err);
      alert("플래시 상태를 변경하는 중 문제가 발생했습니다.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const video = videoRef.current;

      // 비디오 해상도에 맞추어 캔버스 크기 설정
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        console.log(imageData);
        setPhoto(imageData);
      }
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      vConsole.destroy();
    };
  }, []);

  return (
    <Window paddingHorizontal={20}>
      {photo != null ? (
        <img src={photo} alt="capture image" style={{ maxWidth: "100%" }} />
      ) : (
        <>
          <Container flex={10}>
            <Container
              flexDirection="row"
              justifyContent="space-between"
              paddingHorizontal={10}
            >
              <button type="button">
                <RxCross2 color="#fff" size={20} />
              </button>
              <button type="button" onClick={toggleFlash}>
                {isFlashOn ? (
                  <IoIosFlash size={20} color="#fff" />
                ) : (
                  <IoIosFlashOff size={20} color="#fff" />
                )}
              </button>
              <button type="button">
                <MdCameraswitch size={20} color="#fff" />
              </button>
            </Container>
          </Container>
          <Container flex={70}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Container>
          <Container flex={10}>
            <CaptureIconButton onClick={capturePhoto}>
              <FaCamera size={15} />
            </CaptureIconButton>
          </Container>
        </>
      )}
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
        width={500}
        height={500}
      ></canvas>
    </Window>
  );
};

export default CameraPage;
