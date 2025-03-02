import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import TempEvaluation from "@pages/TempEvaluation";

vi.mock("@api/dummyData", () => ({
  dummyUserRoleData: [
    {
      userId: "1",
      name: "홍길동",
      category: "개발자",
      role: "프론트엔드",
      imageUrl: "https://example.com/profile.jpg",
    },
  ],
}));

const renderWithRouter = (id: string) => {
  return render(
    <MemoryRouter initialEntries={[`/evaluate/${id}`]}>
      <Routes>
        <Route path="/evaluate/:id" element={<TempEvaluation />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("TempEvaluation Page", () => {
  it("사용자의 정보를 올바르게 렌더링하는지 확인", () => {
    renderWithRouter("1");

    expect(screen.getByText("이름: 홍길동")).toBeInTheDocument();
    expect(screen.getByText("상세 정보:")).toBeInTheDocument();
    expect(screen.getByText("개발자 / 프론트엔드")).toBeInTheDocument();
    expect(screen.getByAltText("Profile")).toHaveAttribute(
      "src",
      "https://example.com/profile.jpg",
    );
  });

  it("별점 드래그 기능이 동작하는지 확인", async () => {
    renderWithRouter("1");
  });

  it("한 줄 평가를 입력할 수 있는지 확인", async () => {
    renderWithRouter("1");

    const textArea = screen.getByPlaceholderText("평가를 작성해주세요.");
    await userEvent.type(textArea, "테스트 평가");

    expect(textArea).toHaveValue("테스트 평가");
  });

  it('"등록" 버튼 클릭 시 handleSubmit이 호출되는지 확인', async () => {
    renderWithRouter("1");

    console.log = vi.fn(); // console.log를 모킹하여 호출 여부 확인

    const submitButton = screen.getByRole("button", { name: "등록" });
    await userEvent.click(submitButton);

    expect(console.log).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: "1",
        name: "홍길동",
        category: "개발자",
        role: "프론트엔드",
      }),
    );
  });
});
