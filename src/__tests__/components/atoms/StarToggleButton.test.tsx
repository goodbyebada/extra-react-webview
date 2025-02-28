import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StarToggleButton } from "../../../components/atoms/Button";

describe("StarToggleButton", () => {
  it("별 모양 버튼이 렌더링된다.", () => {
    render(<StarToggleButton isActive={false} />);
    expect(screen.getByAltText("star")).toBeInTheDocument();
  });

  it("활성화 상태에 따라 이미지가 변경된다.", () => {
    const { rerender } = render(<StarToggleButton isActive={false} />);
    expect(screen.getByAltText("star").getAttribute("src")).toContain("Star_g");

    rerender(<StarToggleButton isActive={true} />);
    expect(screen.getByAltText("star").getAttribute("src")).toContain("Star_y");
  });

  it("클릭 시 onClick 핸들러가 호출된다.", () => {
    const handleClick = vi.fn();
    render(<StarToggleButton isActive={false} onClick={handleClick} />);
    fireEvent.click(screen.getByAltText("star"));
    expect(handleClick).toHaveBeenCalled();
  });
});
