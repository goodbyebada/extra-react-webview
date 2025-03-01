import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CompanyDateTimePlaceModal from "@components/Modal/CompanyDateTimePlaceModal";

describe("CompanyDateTimePlaceModal 컴포넌트", () => {
  const mockOnSubmit = vi.fn();
  const mockCloseModal = vi.fn();

  it("모달이 보일 때 정상적으로 렌더링되는지 확인", () => {
    render(
      <CompanyDateTimePlaceModal
        onSubmit={mockOnSubmit}
        closeModal={mockCloseModal}
        isVisible={true}
      />,
    );

    expect(screen.getByText("날짜 :")).toBeInTheDocument();
    expect(screen.getByText("시간 :")).toBeInTheDocument();
    expect(screen.getByText("장소 :")).toBeInTheDocument();
  });

  it("입력 필드들이 정상적으로 업데이트 되는지 확인", () => {
    render(
      <CompanyDateTimePlaceModal
        onSubmit={mockOnSubmit}
        closeModal={mockCloseModal}
        isVisible={true}
      />,
    );

    const dateInput = screen.getByPlaceholderText("날짜");
    fireEvent.change(dateInput, { target: { value: "2025-03-01" } });
    expect(dateInput).toHaveValue("2025-03-01");

    const timeInput = screen.getByPlaceholderText("시간");
    fireEvent.change(timeInput, { target: { value: "12:00" } });
    expect(timeInput).toHaveValue("12:00");

    const placeInput = screen.getByPlaceholderText("장소");
    fireEvent.change(placeInput, { target: { value: "서울역" } });
    expect(placeInput).toHaveValue("서울역");
  });

  it("확인 버튼 클릭 시 onSubmit이 호출되는지 확인", () => {
    render(
      <CompanyDateTimePlaceModal
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
