import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TattooSelectFormPage from "../../pages/Sign/TattooSelectFormPage";

describe("TattooSelectFormPage", () => {
  beforeEach(() => {
    localStorage.clear();
    render(
      <BrowserRouter>
        <TattooSelectFormPage />
      </BrowserRouter>,
    );
  });

  it("타투 부위 선택 페이지 요소가 렌더링된다.", () => {
    expect(screen.getByText(/타투 부위/i)).toBeInTheDocument();
  });

  it("타투 부위를 선택하고 정보가 저장된다.", async () => {
    const firstTattooButton = screen.getByText(/왼쪽 팔/i);
    fireEvent.click(firstTattooButton);

    const submitButton = screen.getByRole("button", { name: "다음" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.getItem("tattoo")).toContain("왼쪽 팔");
    });
  });
});
