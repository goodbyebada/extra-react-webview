import {
  render,
  screen,
  // fireEvent
} from "@testing-library/react";
import ClothesConfirmStatusListPage from "../../pages/Manage/ClothesConfirmStatusListPage";
import { describe, it, expect, vi } from "vitest";

const mockNavigate = vi.fn();
const mockLocation = { pathname: "/some/path" }; // 기본 경로 설정

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation, // mockLocation을 사용하여 경로를 설정합니다
  };
});

describe("ClothesConfirmStatusListPage", () => {
  it("컴포넌트를 렌더링하고 역할을 표시합니다", () => {
    render(<ClothesConfirmStatusListPage />); // 더미 데이터 전달

    // 역할이 렌더링되었는지 확인합니다
    expect(screen.getByText(/1\. 역할1/i)).toBeInTheDocument();
    expect(screen.getByText(/2\. 역할2/i)).toBeInTheDocument();
    expect(screen.getByText(/3\. 역할3/i)).toBeInTheDocument();
  });

  // it("검색 입력에 따라 항목을 필터링합니다", () => {
  //   render(<ClothesConfirmStatusListPage />); // 더미 데이터 전달

  //   // 역할1에 대한 검색 입력에 타이핑을 시뮬레이션합니다
  //   const searchInput = screen
  //     .getByTestId("search-input-1")
  //     .querySelector("input");
  //   fireEvent.change(searchInput, { target: { value: "이름1" } });

  //   // 필터링된 항목이 표시되는지 확인합니다
  //   expect(screen.getByText(/이름1/i)).toBeInTheDocument();

  //   // 다른 항목이 표시되지 않는지 확인합니다
  //   expect(screen.queryByText(/이름2/i)).not.toBeInTheDocument();
  // });
});
