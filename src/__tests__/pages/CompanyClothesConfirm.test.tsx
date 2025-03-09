import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CompanyClothesConfirm from "@pages/CompanyClothesConfirm";

const navigateMock = vi.fn();

let mockLocationState: { images: string[]; comments: string[] } = {
  images: ["image1.jpg", "image2.jpg"],
  comments: ["Great choice!", "Looking good!"],
};

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => ({ state: mockLocationState }),
  };
});

const renderWithRouter = () => {
  render(
    <MemoryRouter initialEntries={["/company/clothes-confirm"]}>
      <Routes>
        <Route
          path="/company/clothes-confirm"
          element={<CompanyClothesConfirm />}
        />
      </Routes>
    </MemoryRouter>,
  );
};

describe("CompanyClothesConfirm Page", () => {
  beforeEach(() => {
    navigateMock.mockClear();
    mockLocationState = {
      images: ["image1.jpg", "image2.jpg"],
      comments: ["Great choice!", "Looking good!"],
    };
  });

  it("의상 이미지와 코멘트가 제대로 렌더링되는지 확인", () => {
    renderWithRouter();

    // 이미지 렌더링 확인
    expect(screen.getByAltText("image-0")).toBeInTheDocument();
    expect(screen.getByAltText("image-1")).toBeInTheDocument();

    // 코멘트 렌더링 확인
    expect(screen.getByText("Great choice!")).toBeInTheDocument();
    expect(screen.getByText("Looking good!")).toBeInTheDocument();
  });

  it("코멘트가 없을 경우 'No Comment' 표시", () => {
    mockLocationState = {
      images: ["image1.jpg", "image2.jpg"],
      comments: [],
    };

    renderWithRouter();

    expect(
      screen.getByText((content) => content.includes("No Comment")),
    ).toBeInTheDocument();
  });

  it("'현장 컨펌 등록' 버튼 클릭 시 navigate 호출", () => {
    renderWithRouter();

    const submitButton = screen.getByText("현장 컨펌 등록");
    fireEvent.click(submitButton);

    expect(navigateMock).toHaveBeenCalledWith("/company/clothes-member");
  });
});
