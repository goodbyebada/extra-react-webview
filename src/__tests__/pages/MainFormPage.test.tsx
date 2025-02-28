import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MainFormPage from "../../pages/Sign/MainFormPage";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("MainFormPage", () => {
  beforeEach(() => {
    localStorage.clear();
    render(
      <BrowserRouter>
        <MainFormPage />
      </BrowserRouter>,
    );
  });

  it("회원가입 페이지 요소가 렌더링된다.", () => {
    expect(screen.getByPlaceholderText("이름")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("이메일")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("비밀번호")).toBeInTheDocument();
    expect(screen.getByText("다음")).toBeInTheDocument();
  });

  it("회원가입 폼 제출 유효성 검사", async () => {
    const nameInput = screen.getByPlaceholderText("이름");
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const passwordConfirmInput = screen.getByPlaceholderText("비밀번호 확인");
    const signupButton = screen.getByText("다음").closest("button");

    // 초기 폼은 무효
    expect(signupButton).toBeDisabled();

    // 유효한 이름과 이메일 입력
    fireEvent.change(nameInput, { target: { value: "홍길동" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    // 일치하지 않는 비밀번호 입력
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(passwordConfirmInput, {
      target: { value: "password12" },
    });
    expect(signupButton).toBeDisabled();

    // 일치하는 비밀번호 입력
    fireEvent.change(passwordConfirmInput, {
      target: { value: "password123" },
    });

    // 폼 유효성 검사 완료 대기
    await waitFor(() => {
      expect(signupButton).not.toBeDisabled();
    });
  });

  it("회원 정보 저장 후 인증 페이지로 이동", async () => {
    const signupButton = screen.getByText("다음").closest("button");
    const nameInput = screen.getByPlaceholderText("이름");
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const passwordConfirmInput = screen.getByPlaceholderText("비밀번호 확인");

    fireEvent.change(nameInput, { target: { value: "홍길동" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(passwordConfirmInput, {
      target: { value: "password123" },
    });

    await waitFor(async () => {
      expect(signupButton).not.toBeDisabled();

      if (signupButton) {
        fireEvent.click(signupButton);
      }

      // 이메일, 비밀번호, 이름 저장 확인
      expect(localStorage.getItem("email")).toBe("test@example.com");
      expect(localStorage.getItem("password")).toBe("password123");
      expect(localStorage.getItem("name")).toBe("홍길동");

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/auth");
      });
    });
  });
});
