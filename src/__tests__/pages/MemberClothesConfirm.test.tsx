import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import MemberClothesConfirm from "@pages/MemberClothesConfirm";

// URL.createObjectURL 모킹
global.URL.createObjectURL = vi.fn().mockReturnValue("mocked-url");

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

const renderWithRouter = () => {
  render(
    <MemoryRouter initialEntries={["/member/clothes-confirm"]}>
      <Routes>
        <Route
          path="/member/clothes-confirm"
          element={<MemberClothesConfirm />}
        />
      </Routes>
    </MemoryRouter>,
  );
};

describe("MemberClothesConfirm Page", () => {
  it("컴포넌트가 제대로 렌더링되는지 확인", () => {
    renderWithRouter();

    // 기본 의상 정보가 잘 렌더링되는지 확인
    expect(screen.getByText("의상 이미지")).toBeInTheDocument();
    expect(screen.getByText("내 의상 등록")).toBeInTheDocument();
    expect(screen.getByText("역할")).toBeInTheDocument();
    expect(screen.getByText("계절")).toBeInTheDocument();
    expect(screen.getByText("상세설명")).toBeInTheDocument();
  });

  it("기본 의상 이미지가 화면에 표시되는지 확인", () => {
    renderWithRouter();

    // 기본 의상 이미지가 렌더링되는지 확인
    const images = screen.getAllByAltText(/placeholder/);
    expect(images.length).toBe(4);
  });

  it("내 의상 등록 영역에서 이미지 추가가 제대로 되는지 확인", async () => {
    renderWithRouter();

    // "의상 추가" 버튼 클릭
    const inputFile = screen.getByLabelText("의상 추가");

    // 이미지 파일 업로드
    const file = new File(["test-image"], "test-image.jpg", {
      type: "image/jpeg",
    });
    fireEvent.change(inputFile, { target: { files: [file] } });

    // 이미지가 추가되었는지 확인
    await waitFor(() => {
      const uploadedImages = screen.getAllByAltText(/my-uploaded-image/);
      expect(uploadedImages.length).toBe(1);
    });
  });

  it("등록 버튼 클릭 시 navigate가 호출되는지 확인", () => {
    renderWithRouter();

    // 등록 버튼 클릭
    const registerButton = screen.getByText("등록");
    fireEvent.click(registerButton);

    // navigate 함수가 호출되는지 확인
    expect(navigateMock).toHaveBeenCalledWith(-1);
  });
});
