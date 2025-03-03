import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../../pages/Sign/LoginPage";

// Mock the necessary modules
vi.mock("react-kakao-login", () => ({
  default: () => <button>Kakao Login</button>,
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("LoginPage", () => {
  beforeEach(() => {
    localStorage.clear();
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );
  });
  it("로그인 페이지 요소가 렌더링된다.", () => {
    expect(screen.getByPlaceholderText("이메일")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("비밀번호")).toBeInTheDocument();
    expect(screen.getByText("로그인")).toBeInTheDocument();
    expect(screen.getByText("회원가입")).toBeInTheDocument();
    expect(screen.getByText("비밀번호 찾기")).toBeInTheDocument();
  });

  it("로그인 폼 제출 유효성 검사", async () => {
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const loginButton = screen.getByText("로그인").closest("button");

    // 초기 폼은 무효
    expect(loginButton).toBeDisabled();

    // 유효하지 않은 이메일 입력
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(loginButton).toBeDisabled();

    // 유효한 이메일과 비밀번호 입력
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // 폼 유효성 검사 완료 대기
    await waitFor(() => {
      expect(loginButton).not.toBeDisabled();
    });
  });

  it("회원가입 버튼 클릭 시 회원가입 페이지로 이동", () => {
    const signupButton = screen.getByText("회원가입");
    fireEvent.click(signupButton);
    expect(mockNavigate).toHaveBeenCalledWith("/main-form");
  });
});
