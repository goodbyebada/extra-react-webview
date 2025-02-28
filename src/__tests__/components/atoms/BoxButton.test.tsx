import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BoxButton } from "../../../components/atoms/Button";

describe("BoxButton", () => {
  it("박스 버튼이 렌더링된다.", () => {
    render(<BoxButton isActive={false}>Click Me</BoxButton>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("활성화 상태에 따라 스타일이 변경된다.", () => {
    const { rerender } = render(
      <BoxButton isActive={false}>Click Me</BoxButton>,
    );
    expect(screen.getByText("Click Me")).toHaveStyle("color: #fff");

    rerender(<BoxButton isActive={true}>Click Me</BoxButton>);
    expect(screen.getByText("Click Me")).toHaveStyle(
      "color: rgba(255, 255, 255, 0.4)",
    );
  });

  it("클릭 시 onClick 핸들러가 호출된다.", () => {
    const handleClick = vi.fn();
    render(
      <BoxButton isActive={false} onClick={handleClick}>
        Click Me
      </BoxButton>,
    );
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalled();
  });
});
