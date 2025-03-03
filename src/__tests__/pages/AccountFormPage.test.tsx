import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AccountFormPage from "../../pages/Sign/AccountFormPage";

describe("AccountFormPage", () => {
  beforeEach(() => {
    localStorage.clear();
    render(
      <BrowserRouter>
        <AccountFormPage />
      </BrowserRouter>,
    );
  });

  it("계좌 등록 페이지 요소가 렌더링된다.", () => {
    expect(screen.getByText(/계좌 등록/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/은행/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/계좌 번호/i)).toBeInTheDocument();
  });

  it("폼 제출 후 모달이 열린다.", async () => {
    const bankInput = screen.getByPlaceholderText("은행");
    const accountNumberInput = screen.getByPlaceholderText("계좌 번호");
    const submitButton = screen.getByText("다음").closest("button");

    // 초기 폼은 무효
    expect(submitButton).toBeDisabled();

    // 유효한 은행과 계좌 번호 입력
    fireEvent.change(bankInput, {
      target: { value: "Bank" },
    });
    fireEvent.change(accountNumberInput, {
      target: { value: "123456" },
    });

    await waitFor(async () => {
      expect(submitButton).not.toBeDisabled();

      fireEvent.click(submitButton!);

      expect(localStorage.getItem("backName")).toBe("Bank");
      expect(localStorage.getItem("accountNumber")).toBe("123456");

      await waitFor(() => {
        expect(screen.getByText(/약관/i)).toBeInTheDocument();
      });
    });
  });
});
