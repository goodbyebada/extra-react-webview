import { useEffect, useRef } from "react";
import QrScanner from "qr-scanner";

interface QRScannerProps {
  setValue: (value: string) => void;
}

const qrOptions = {
  preferredCamera: "user",
  maxScansPerSecond: 30,
  highlightScanRegion: true,
  highlightCodeOutline: true,
};

const QRScanner = ({ setValue }: QRScannerProps) => {
  const videoRef = useRef(null);

  const handleScan = (result: QrScanner.ScanResult) => {
    setValue(result.data);
  };

  useEffect(() => {
    const videoElem = videoRef.current;
    if (videoElem) {
      const qrScanner = new QrScanner(
        videoElem,
        (result) => handleScan(result),
        qrOptions,
      );
      qrScanner.start();

      return () => qrScanner.destroy();
    }
  }, []);

  return (
    <video
      ref={videoRef}
      style={{
        width: "300px",
        height: "300px",
        objectFit: "cover",
        filter: "contrast(150%) brightness(80%)",
      }}
      autoPlay
      playsInline
    />
  );
};

export default QRScanner;
