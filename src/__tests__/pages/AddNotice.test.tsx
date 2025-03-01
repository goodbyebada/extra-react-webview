import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import AddNotice from "@pages/AddNotice";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const renderWithRouter = () => {
  render(
    <MemoryRouter initialEntries={["/add-notice"]}>
      <Routes>
        <Route path="/add-notice" element={<AddNotice />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("AddNotice Page", () => {
  it("컴포넌트가 제대로 렌더링되는지 확인", () => {
    renderWithRouter();

    // 기본 공고 등록 화면의 텍스트 확인
    expect(screen.getByText("공고 등록")).toBeInTheDocument();
    expect(screen.getByText("제목, 카테고리")).toBeInTheDocument();
    expect(screen.getByText("날짜, 시간, 장소")).toBeInTheDocument();
  });

  it("제목, 카테고리 모달이 열리고 값을 입력할 수 있는지 확인", () => {
    renderWithRouter();

    const titleInput = screen.getByPlaceholderText("제목");
    fireEvent.change(titleInput, { target: { value: "새 제목" } });
    expect(titleInput).toHaveValue("새 제목");

    const categoryInput = screen.getByPlaceholderText("카테고리");
    fireEvent.change(categoryInput, { target: { value: "새 카테고리" } });
    expect(categoryInput).toHaveValue("새 카테고리");

    const deadlineInput = screen.getByPlaceholderText("마감기한");
    fireEvent.change(deadlineInput, { target: { value: "2025-03-01" } });
    expect(deadlineInput).toHaveValue("2025-03-01");

    const submitButton = screen.getByRole("button", { name: /확인/i });
    fireEvent.click(submitButton);
  });

  it("날짜, 시간, 장소 모달이 열리고 값을 입력할 수 있는지 확인", () => {
    renderWithRouter();

    // 날짜, 시간, 장소 클릭
    const dateCard = screen.getByText("날짜, 시간, 장소");
    fireEvent.click(dateCard);

    // 날짜, 시간, 장소 입력 후 모달 제출
    const dateInput = screen.getByPlaceholderText("날짜");
    fireEvent.change(dateInput, { target: { value: "2025-03-01" } });
    expect(dateInput).toHaveValue("2025-03-01");

    const timeInput = screen.getByPlaceholderText("시간");
    fireEvent.change(timeInput, { target: { value: "12:00" } });
    expect(timeInput).toHaveValue("12:00");

    const placeInput = screen.getByPlaceholderText("장소");
    fireEvent.change(placeInput, { target: { value: "서울역" } });
    expect(placeInput).toHaveValue("서울역");

    const submitButton = screen.getByRole("button", { name: /확인/i });
    fireEvent.click(submitButton);
  });

  it("모든 필드를 채운 후 공고 제출 버튼 클릭 시 alert이 발생하는지 확인", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    renderWithRouter();

    // 제목, 카테고리, 날짜, 시간, 장소 입력 후 제출
    fireEvent.change(screen.getByPlaceholderText("제목"), {
      target: { value: "공고 제목" },
    });
    fireEvent.change(screen.getByPlaceholderText("카테고리"), {
      target: { value: "IT" },
    });
    fireEvent.change(screen.getByPlaceholderText("마감기한"), {
      target: { value: "2025-03-01" },
    });
    fireEvent.change(screen.getByPlaceholderText("날짜"), {
      target: { value: "2025-03-01" },
    });
    fireEvent.change(screen.getByPlaceholderText("시간"), {
      target: { value: "10:00 AM" },
    });
    fireEvent.change(screen.getByPlaceholderText("장소"), {
      target: { value: "서울" },
    });

    // 모든 값이 입력된 후 "확인" 버튼 클릭
    const submitButton = screen.getByRole("button", { name: /확인/i });
    fireEvent.click(submitButton);

    // alert가 호출되었는지 확인
    expect(alertMock).toHaveBeenCalledWith("모든 값을 입력해주세요.");
  });
});
