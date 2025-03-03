import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MemberClothesComment from "@pages/MemberClothesComment";

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

const renderWithRouter = () => {
  render(
    <MemoryRouter initialEntries={["/member/clothes-comment"]}>
      <Routes>
        <Route
          path="/member/clothes-comment"
          element={<MemberClothesComment />}
        />
      </Routes>
    </MemoryRouter>,
  );
};

describe("MemberClothesComment Page", () => {
  it("컴포넌트가 제대로 렌더링되는지 확인", () => {
    renderWithRouter();

    expect(screen.getByText("관리자 전체 코멘트")).toBeInTheDocument();
    expect(screen.getByText("승인 의상")).toBeInTheDocument();
    expect(screen.getByText("미승인 의상")).toBeInTheDocument();
    expect(screen.getByText("확인")).toBeInTheDocument();
  });

  it("미승인 의상에 대한 코멘트가 제대로 표시되는지 확인", () => {
    renderWithRouter();

    // 미승인 의상에 코멘트가 있는지 확인
    const comments = screen.getAllByText(
      (content) =>
        content.includes("어두운 색상으로 해주세요.") ||
        content.includes("청바지가 필요합니다."),
    );

    expect(comments.length).toBeGreaterThan(0);
    expect(comments[0]).toHaveTextContent("어두운 색상으로 해주세요.");
    expect(comments[1]).toHaveTextContent("청바지가 필요합니다.");
  });

  it("확인 버튼 클릭 시 navigate가 호출되는지 확인", () => {
    renderWithRouter();

    const submitButton = screen.getByText("확인");
    fireEvent.click(submitButton);

    expect(navigateMock).toHaveBeenCalledWith(-1);
  });
});
