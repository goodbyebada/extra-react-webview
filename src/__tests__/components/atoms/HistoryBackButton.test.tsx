import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HistoryBackButton } from "../../../components/atoms/Button";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("HistoryBackButton", () => {
  it("히스토리 뒤로가기 버튼이 렌더링된다.", () => {
    render(
      <BrowserRouter>
        <HistoryBackButton />
      </BrowserRouter>,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("클릭 시 이전 페이지로 이동한다.", () => {
    const handleClick = vi.fn();
    render(
      <BrowserRouter>
        <HistoryBackButton onClick={handleClick} />
      </BrowserRouter>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
