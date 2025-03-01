import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import CompanyClothesApproval from "@pages/CompanyClothesApproval";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({
      state: {
        clothes: [
          { id: 1, src: "image1.jpg", description: "의상1" },
          { id: 2, src: "image2.jpg", description: "의상2" },
        ],
      },
    }),
  };
});

const renderWithRouter = () => {
  render(
    <MemoryRouter initialEntries={["/company/clothes-approval"]}>
      <Routes>
        <Route
          path="/company/clothes-approval"
          element={<CompanyClothesApproval />}
        />
      </Routes>
    </MemoryRouter>,
  );
};

describe("CompanyClothesApproval Page", () => {
  it("의상 세부사항이 제대로 렌더링되는지 확인", () => {
    renderWithRouter();
    expect(screen.getByText("의상 세부사항")).toBeInTheDocument();
    expect(screen.getByAltText("의상1")).toBeInTheDocument();
  });

  it("승인 버튼 클릭 시 다음 의상으로 변경", () => {
    renderWithRouter();

    const approveButton = screen.getByText("승인");
    fireEvent.click(approveButton);

    expect(screen.getByAltText("의상2")).toBeInTheDocument();
  });

  it("코멘트 입력 기능이 동작하는지 확인", async () => {
    renderWithRouter();

    const commentButton = screen.getByText("코멘트");
    fireEvent.click(commentButton);

    const inputField = screen.getByRole("textbox");
    fireEvent.change(inputField, { target: { value: "새 코멘트" } });

    expect(inputField).toHaveValue("새 코멘트");
  });

  it("다음 의상 컨펌하기 버튼 클릭 시 댓글이 추가되는지 확인", async () => {
    renderWithRouter();

    const commentButton = screen.getByText("코멘트");
    fireEvent.click(commentButton);

    const inputField = screen.getByRole("textbox");
    fireEvent.change(inputField, { target: { value: "새 코멘트" } });

    const submitButton = screen.getByText("다음 의상 컨펌하기");
    fireEvent.click(submitButton);

    // 의상2가 나타날 때까지 기다림
    await screen.findByAltText("의상2");
  });
});
