import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MainButton } from "../../../components/atoms/Button";

describe("MainButton", () => {
  it("메인 버튼이 렌더링된다.", () => {
    render(<MainButton isActive={true}>Submit</MainButton>);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("활성화 상태에 따라 스타일이 변경된다.", () => {
    const { rerender } = render(
      <MainButton isActive={true}>Submit</MainButton>,
    );
    expect(screen.getByText("Submit")).toHaveStyle("color: #000");

    rerender(<MainButton isActive={false}>Submit</MainButton>);
    expect(screen.getByText("Submit")).toHaveStyle("color: #adadad");
  });

  it("클릭 시 onClick 핸들러가 호출된다.", () => {
    const handleClick = vi.fn();
    render(
      <MainButton isActive={true} onClick={handleClick}>
        Submit
      </MainButton>,
    );
    fireEvent.click(screen.getByText("Submit"));
    expect(handleClick).toHaveBeenCalled();
  });
});
