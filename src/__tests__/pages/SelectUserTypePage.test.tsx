import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SelectUserTypePage from "../../pages/Sign/SelectUserTypePage";

// react-router-dom의 useNavigate 훅을 모킹하여 네비게이션 동작을 테스트
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("SelectUserTypePage", () => {
  // 각 테스트 전에 localStorage를 초기화하고 컴포넌트를 렌더링
  beforeEach(() => {
    localStorage.clear();
    render(
      <BrowserRouter>
        <SelectUserTypePage />
      </BrowserRouter>,
    );
  });

  it("회원 유형 선택 버튼이 렌더링된다.", () => {
    // "보조출연자", "업체관리자", "선택" 버튼이 화면에 렌더링되는지 확인
    expect(screen.getByText("보조출연자")).toBeInTheDocument();
    expect(screen.getByText("업체관리자")).toBeInTheDocument();
    expect(screen.getByText("선택")).toBeInTheDocument();
  });

  it('보조출연자 선택 후 "선택" 버튼 클릭 시 회원 정보 폼으로 네비게이션된다.', () => {
    // "보조출연자" 버튼 클릭
    const memberButton = screen.getByText("보조출연자").closest("button");
    const selectButton = screen.getByText("선택").closest("button");

    fireEvent.click(memberButton!);
    // "선택" 버튼이 활성화되는지 확인
    expect(selectButton).not.toBeDisabled();

    // "선택" 버튼 클릭 후 localStorage와 네비게이션 확인
    fireEvent.click(selectButton!);
    expect(localStorage.getItem("type")).toBe("member");
    expect(mockNavigate).toHaveBeenCalledWith("/member-info-form");
  });

  it('업체관리자 선택 후 "선택" 버튼 클릭 시 회사 정보 폼으로 네비게이션된다.', () => {
    // "업체관리자" 버튼 클릭
    const companyButton = screen.getByText("업체관리자").closest("button");
    const selectButton = screen.getByText("선택").closest("button");

    fireEvent.click(companyButton!);
    // "선택" 버튼이 활성화되는지 확인
    expect(selectButton).not.toBeDisabled();

    // "선택" 버튼 클릭 후 localStorage와 네비게이션 확인
    fireEvent.click(selectButton!);
    expect(localStorage.getItem("type")).toBe("company");
    expect(mockNavigate).toHaveBeenCalledWith("/company-info");
  });

  it("아무 회원 유형도 선택하지 않았을 때는 네비게이션이 발생하지 않는다.", () => {
    // "선택" 버튼이 비활성화되어 있는지 확인
    const selectButton = screen.getByText("선택").closest("button");
    expect(selectButton).toBeDisabled();
  });
});
