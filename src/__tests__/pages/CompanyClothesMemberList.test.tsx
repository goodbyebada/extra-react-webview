import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CompanyClothesMemberList from "@pages/CompanyClothesMemberList";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock("@api/dummyData", () => ({
  dummyUserClothes: [
    {
      userId: "1",
      name: "홍길동",
      imageUrl: "https://example.com/profile.jpg",
      clothesNum: 3,
      clothes: [
        { id: 1, src: "image1.jpg", description: "Clothes 1" },
        { id: 2, src: "image2.jpg", description: "Clothes 2" },
      ],
    },
    {
      userId: "2",
      name: "김철수",
      imageUrl: "https://example.com/profile2.jpg",
      clothesNum: 2,
      clothes: [
        { id: 1, src: "image3.jpg", description: "Clothes 3" },
        { id: 2, src: "image4.jpg", description: "Clothes 4" },
      ],
    },
  ],
}));

const renderWithRouter = () => {
  render(
    <MemoryRouter initialEntries={["/company/clothes-member-list"]}>
      <Routes>
        <Route
          path="/company/clothes-member-list"
          element={<CompanyClothesMemberList />}
        />
      </Routes>
    </MemoryRouter>,
  );
};

describe("CompanyClothesMemberList Page", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("사용자 목록이 제대로 렌더링되는지 확인", () => {
    renderWithRouter();

    // 사용자 이름이 화면에 렌더링되는지 확인
    expect(screen.getByText("홍길동")).toBeInTheDocument();
    expect(screen.getByText("김철수")).toBeInTheDocument();
  });

  it("사용자 검색이 제대로 동작하는지 확인", () => {
    renderWithRouter();

    const searchInput = screen.getByPlaceholderText("사용자 검색");

    // 검색어 입력 후 필터링이 잘 되는지 확인
    fireEvent.change(searchInput, { target: { value: "홍길동" } });

    expect(screen.getByText("홍길동")).toBeInTheDocument();
    expect(screen.queryByText("김철수")).toBeNull();
  });

  it("사용자 클릭 시 의상 관리 페이지로 네비게이션 되는지 확인", () => {
    renderWithRouter();

    const userItem = screen.getByText("홍길동");
    fireEvent.click(userItem);

    // 클릭 시 의상 관리 페이지로 이동하는지 확인
    expect(navigateMock).toHaveBeenCalledWith(
      "/company/clothes-approval",
      expect.any(Object),
    );
  });
});
