import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CompanyInfoFormPage from "../../pages/Sign/CompanyInfoFormPage";

describe("CompanyInfoFormPage", () => {
  beforeEach(() => {
    localStorage.clear();
    render(
      <BrowserRouter>
        <CompanyInfoFormPage />
      </BrowserRouter>,
    );
  });

  it("소속 선택 페이지 요소가 렌더링된다.", () => {
    expect(screen.getByText(/소속 선택/i)).toBeInTheDocument();
  });

  it("회사를 선택하고 모달이 열린다.", async () => {
    const firstCompanyButton = screen.getByText(/A/i);
    fireEvent.click(firstCompanyButton);

    const submitButton = screen.getByRole("button", { name: "다음" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.getItem("company")).toBe("A");
      expect(screen.getByText(/약관 전체동의/i)).toBeInTheDocument();
    });
  });
});
