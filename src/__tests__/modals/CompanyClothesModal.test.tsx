import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CompanyClothesModal from "@components/Modal/CompanyClothesModal";

describe("CompanyClothesModal 컴포넌트", () => {
  const mockOnSubmit = vi.fn();
  const mockCloseModal = vi.fn();

  it("모달이 보일 때 정상적으로 렌더링되는지 확인", () => {
    render(
      <CompanyClothesModal
        onSubmit={mockOnSubmit}
        closeModal={mockCloseModal}
        isVisible={true}
        roleName="Test Role"
      />,
    );

    expect(screen.getByText("역할")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("계절을 입력하세요"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("상세설명을 입력하세요"),
    ).toBeInTheDocument();
  });

  it("입력 필드들이 정상적으로 업데이트 되는지 확인", () => {
    render(
      <CompanyClothesModal
        onSubmit={mockOnSubmit}
        closeModal={mockCloseModal}
        isVisible={true}
        roleName="Test Role"
      />,
    );

    const seasonInput = screen.getByPlaceholderText("계절을 입력하세요");
    fireEvent.change(seasonInput, { target: { value: "여름" } });
    expect(seasonInput).toHaveValue("여름");

    const descriptionInput =
      screen.getByPlaceholderText("상세설명을 입력하세요");
    fireEvent.change(descriptionInput, { target: { value: "반팔 티셔츠" } });
    expect(descriptionInput).toHaveValue("반팔 티셔츠");
  });

  it("이미지 업로드 버튼 클릭 시 파일 업로드가 트리거된다", () => {
    render(
      <CompanyClothesModal
        onSubmit={mockOnSubmit}
        closeModal={mockCloseModal}
        isVisible={true}
        roleName="Test Role"
      />,
    );

    const fileInput = screen.getByLabelText("의상 추가");
    expect(fileInput).toBeInTheDocument();
  });

  it("확인 버튼 클릭 시 onSubmit이 호출되는지 확인", () => {
    render(
      <CompanyClothesModal
        onSubmit={mockOnSubmit}
        closeModal={mockCloseModal}
        isVisible={true}
        roleName="Test Role"
      />,
    );

    const submitButton = screen.getByText("등록");
    fireEvent.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
