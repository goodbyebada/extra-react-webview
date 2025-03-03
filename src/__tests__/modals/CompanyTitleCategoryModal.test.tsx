import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CompanyTitleCategoryModal from "@components/Modal/CompanyTitleCategoryModal";

describe("CompanyTitleCategoryModal 컴포넌트", () => {
  const mockOnSubmit = vi.fn();
  const mockCloseModal = vi.fn();

  it("모달이 보일 때 정상적으로 렌더링되는지 확인", () => {
    render(
      <CompanyTitleCategoryModal
        onSubmit={mockOnSubmit}
        closeModal={mockCloseModal}
        isVisible={true}
      />,
    );

    expect(screen.getByText("제목 :")).toBeInTheDocument();
    expect(screen.getByText("카테고리 :")).toBeInTheDocument();
    expect(screen.getByText("마감기한 :")).toBeInTheDocument();
  });

  it("입력 필드들이 정상적으로 업데이트 되는지 확인", () => {
    render(
      <CompanyTitleCategoryModal
        onSubmit={mockOnSubmit}
        closeModal={mockCloseModal}
        isVisible={true}
      />,
    );

    const titleInput = screen.getByPlaceholderText("제목");
    fireEvent.change(titleInput, { target: { value: "새 제목" } });
    expect(titleInput).toHaveValue("새 제목");

    const categoryInput = screen.getByPlaceholderText("카테고리");
    fireEvent.change(categoryInput, { target: { value: "새 카테고리" } });
    expect(categoryInput).toHaveValue("새 카테고리");

    const deadlineInput = screen.getByPlaceholderText("마감기한");
    fireEvent.change(deadlineInput, { target: { value: "2025-03-01" } });
    expect(deadlineInput).toHaveValue("2025-03-01");
  });

  it("확인 버튼 클릭 시 onSubmit이 호출되는지 확인", () => {
    render(
      <CompanyTitleCategoryModal
        onSubmit={mockOnSubmit}
        closeModal={mockCloseModal}
        isVisible={true}
      />,
    );

    const confirmButton = screen.getByText("확인");
    fireEvent.click(confirmButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
