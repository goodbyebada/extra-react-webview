import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { useForm, FormProvider } from "react-hook-form";
import { InputField } from "../../components/atoms/Form";

function Wrapper({ name }: { name: string }) {
  const methods = useForm({ defaultValues: { [name]: "" } });

  return (
    <FormProvider {...methods}>
      <InputField
        name={name}
        control={methods.control}
        rules={{ required: true }}
        inputProps={{ placeholder: "이메일" }}
      />
    </FormProvider>
  );
}

describe("InputField", () => {
  it("입력 필드가 렌더링된다.", () => {
    render(<Wrapper name="email" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("사용자가 값을 입력하면 입력 값이 변경된다.", async () => {
    const user = userEvent.setup();
    render(<Wrapper name="email" />);

    const input = screen.getByRole("textbox");
    await user.type(input, "test@example.com");

    expect(input).toHaveValue("test@example.com");
  });
});
