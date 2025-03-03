import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CompanyRoleModal from "@components/Modal/CompanyRoleModal";

describe("CompanyRoleModal 컴포넌트", () => {
  const mockOnSubmit = vi.fn();
  const mockCloseModal = vi.fn();

  it("모달이 보일 때 정상적으로 렌더링되고 입력 필드가 업데이트되는지 확인", () => {
    render(
      <CompanyRoleModal
        onSubmit={mockOnSubmit}
        closeModal={mockCloseModal}
        isVisible={true}
      />,
    );

    expect(screen.getByText("1.성별 :")).toBeInTheDocument();
    expect(screen.getByText("2.나이 :")).toBeInTheDocument();
    expect(screen.getByText("3.의상 :")).toBeInTheDocument();
    expect(screen.getByText("4.문신여부 :")).toBeInTheDocument();
    expect(screen.getByText("5.인원 :")).toBeInTheDocument();
    expect(screen.getByText("6.시급 :")).toBeInTheDocument();

    const minAgeInput = screen.getByPlaceholderText("나이1");
    const maxAgeInput = screen.getByPlaceholderText("나이2");
    const personnelInput = screen.getByPlaceholderText("인원");
    const payInput = screen.getByPlaceholderText("시급");

    fireEvent.change(minAgeInput, { target: { value: 10 } });
    fireEvent.change(maxAgeInput, { target: { value: 20 } });
    fireEvent.change(personnelInput, { target: { value: 10 } });
    fireEvent.change(payInput, { target: { value: "15000" } });

    expect(minAgeInput).toHaveValue(10);
    expect(maxAgeInput).toHaveValue(20);
    expect(personnelInput).toHaveValue(10);
    expect(payInput).toHaveValue("15,000");
  });

  it("유효한 데이터를 입력한 후 확인 버튼 클릭 시 onSubmit이 호출되는지 확인", () => {
    render(
      <CompanyRoleModal
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
