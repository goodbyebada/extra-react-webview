import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { BackButton } from "../../../components/atoms/Button";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("BackButton", () => {
  it("뒤로가기 버튼이 렌더링된다.", () => {
    render(
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>,
    );
    expect(screen.getByAltText("뒤로가기")).toBeInTheDocument();
  });

  it("클릭 시 이전 페이지로 이동한다.", () => {
    render(
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>,
    );
    fireEvent.click(screen.getByAltText("뒤로가기"));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
