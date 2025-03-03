import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CompanyAddRoleModal from "@components/Modal/CompanyAddRoleModal";

describe("CompanyAddRoleModal", () => {
  const onSubmit = vi.fn();
  const closeModal = vi.fn();

  it("역할 이름이 비어 있으면 onSubmit이 호출되지 않음", () => {
    render(
      <CompanyAddRoleModal
        onSubmit={onSubmit}
        closeModal={closeModal}
        isVisible={true}
      />,
    );

    const input = screen.getByPlaceholderText("역할");
    const button = screen.getByRole("button", { name: /확인/i });

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    // onSubmit과 closeModal이 호출되지 않은지 즉시 확인
    expect(onSubmit).not.toHaveBeenCalled();
    expect(closeModal).not.toHaveBeenCalled();
  });
});
