import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MemberInfoFormPage from "../../pages/Sign/MemberInfoFormPage";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("MemberInfoFormPage", () => {
  beforeEach(() => {
    localStorage.clear();
    render(
      <BrowserRouter>
        <MemberInfoFormPage />
      </BrowserRouter>,
    );
  });

  it("보조출연자 정보 페이지 요소가 렌더링된다.", () => {
    expect(screen.getByText(/보조출연자 정보/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/생일/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/주소/i)).toBeInTheDocument();
  });

  it("폼 제출 후 정보가 저장되고 페이지가 이동한다.", async () => {
    const birthdayInput = screen.getByPlaceholderText(/생일/i);
    const addressInput = screen.getByPlaceholderText(/주소/i);
    const heightInput = screen.getByPlaceholderText(/키/i);
    const weightInput = screen.getByPlaceholderText(/몸무게/i);
    const submitButton = screen.getByText("다음").closest("button");

    // 초기 폼은 무효
    expect(submitButton).toBeDisabled();

    // 유효한 생일, 주소, 키, 몸무게 입력
    fireEvent.change(birthdayInput, {
      target: { value: "20010101" },
    });
    fireEvent.change(addressInput, {
      target: { value: "Seoul" },
    });
    fireEvent.change(heightInput, {
      target: { value: "180" },
    });
    fireEvent.change(weightInput, {
      target: { value: "70" },
    });

    await waitFor(async () => {
      expect(submitButton).not.toBeDisabled();

      fireEvent.click(submitButton!);

      expect(localStorage.getItem("birthday")).toBe("20010101");
      expect(localStorage.getItem("address")).toBe("Seoul");
      expect(localStorage.getItem("height")).toBe("180");
      expect(localStorage.getItem("weight")).toBe("70");

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/tattoo-form");
      });
    });
  });
});
