import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NoticeRole from "@components/mocules/company/NoticeRole";

const mockRoleList = [
  {
    roleName: "Actor",
    details: [
      {
        id: 1,
        roleName: "Actor",
        costume: { roleName: "Actor", season: "Winter", etc: "", imageSrc: [] },
        sex: true,
        minAge: "20",
        maxAge: "30",
        limitPersonnel: 5,
        currentPersonnel: 2,
        tattoo: {
          face: false,
          chest: false,
          arm: false,
          leg: false,
          shoulder: false,
          back: false,
          hand: false,
          feet: false,
        },
        hourPay: "1000",
      },
    ],
  },
];

describe("NoticeRole 컴포넌트", () => {
  it("역할 리스트가 있을 때 정상적으로 렌더링되는지 확인", () => {
    render(<NoticeRole roleList={mockRoleList} onRoleListChange={vi.fn()} />);
    expect(screen.getByText("보조 출연자 역할")).toBeInTheDocument();
    expect(screen.getByText("1: Actor")).toBeInTheDocument();
  });

  it("'역할 추가' 버튼 클릭 시 역할 추가 모달이 열리는지 확인", () => {
    render(<NoticeRole roleList={mockRoleList} onRoleListChange={vi.fn()} />);
    fireEvent.click(screen.getByText("역할 추가"));
    expect(screen.getByText("역할 추가")).toBeInTheDocument();
  });

  it("새로운 역할을 추가할 때 onRoleListChange가 호출되는지 확인", async () => {
    const mockOnRoleListChange = vi.fn();
    render(
      <NoticeRole roleList={[]} onRoleListChange={mockOnRoleListChange} />,
    );

    // 역할 추가 버튼 클릭
    fireEvent.click(screen.getByText("역할 추가"));

    // 역할 이름 입력 필드 찾고 값 입력
    const roleNameInput = screen.getByPlaceholderText("역할");
    fireEvent.change(roleNameInput, { target: { value: "New Role" } });

    // 역할 추가 버튼(모달 내) 클릭하여 제출
    fireEvent.click(screen.getByRole("button", { name: "확인" }));

    // onRoleListChange가 호출되었는지 확인
    expect(mockOnRoleListChange).toHaveBeenCalledTimes(1);
  });
});
