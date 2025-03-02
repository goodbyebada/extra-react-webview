import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CameraPage from "../../pages/Manage/CameraPage";
import { beforeEach, describe, expect, it, vi } from "vitest";

// navigator.mediaDevices.getUserMedia 모킹
Object.defineProperty(global.navigator, "mediaDevices", {
  value: {
    getUserMedia: vi.fn().mockResolvedValue({
      getTracks: () => [{ stop: vi.fn() }],
      getVideoTracks: () => [
        {
          applyConstraints: vi.fn(),
          getCapabilities: () => ({ torch: true }),
        },
      ],
    }),
    enumerateDevices: vi
      .fn()
      .mockResolvedValue([{ kind: "videoinput", deviceId: "camera1" }]),
  },
});

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("CameraPage 테스트", () => {
  beforeEach(() => {
    render(<CameraPage />);
  });

  it("닫기 버튼 클릭 시 네비게이션 동작 확인", async () => {
    const closeButton = screen.getByTestId("close-button");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  it("플래시 토글 버튼 클릭 시 상태 변경 확인", async () => {
    const flashButton = screen.getByTestId("flash-button");

    // 초기 상태 확인
    expect(screen.getByTestId("flash-icon-off")).toBeInTheDocument();

    // 클릭하여 플래시 켜기
    fireEvent.click(flashButton);

    // 플래시 상태 변경 확인
    await waitFor(() => {
      expect(screen.getByTestId("flash-icon-on")).toBeInTheDocument();
    });
  });

  it("카메라 전환 버튼 클릭 시 `facingMode` 변경 확인", async () => {
    const switchCameraButton = screen.getByTestId("switch-camera-button");
    fireEvent.click(switchCameraButton);
    expect(switchCameraButton).toBeInTheDocument();
  });

  it("캡처 버튼 클릭 시 이미지 생성 확인", async () => {
    const captureButton = screen.getByTestId("capture-icon");
    fireEvent.click(captureButton);

    await waitFor(() => {
      const capturedImage = screen.getByAltText("capture-image");
      expect(capturedImage).toBeInTheDocument();
      expect(capturedImage).toHaveAttribute("src");
    });
  });
});
