import Color from "@/constants/color";
import { forwardRef } from "react";
import {
  Controller,
  Control,
  FieldValues,
  FieldPath,
  RegisterOptions,
} from "react-hook-form";
import styled from "styled-components";

interface InputProps {
  type?: string;
  placeholder?: string;
}

interface InputFieldProps<T extends FieldValues = FieldValues>
  extends InputProps {
  name: string;
  control: Control<T>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  rules?: Omit<
    RegisterOptions<T>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
}

const StyledInput = styled.input`
  width: 100%;
  height: 53px;
  padding-left: 20px;

  background: ${Color.input};
  outline: none;
  border: none;
  border-radius: 15px;
  box-sizing: border-box;

  font-size: 15px;
  font-weight: 200;
  color: #fff;

  &::placeholder,
  &::-webkit-placeholder,
  &::-moz-placeholder,
  &:-ms-input-placeholder {
    color: #5e5e5e;
  }
`;

/**
 * Input
 * @param name string (input name)
 * @param type string (input field type)
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", placeholder = "", ...props }, ref) => {
    return (
      <StyledInput
        {...props}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        ref={ref}
      />
    );
  },
);

Input.displayName = "Input";

/**
 * Input
 * @param name string (input name)
 * @param control Control (react-hook-form control object)
 * @param rules RegisterOptions (react-hook-form rules object)
 * @param type string (input field type)
 */
const InputField = forwardRef(
  <T extends FieldValues = FieldValues>(
    {
      name,
      control,
      type,
      placeholder,
      inputProps,
      ...props
    }: InputFieldProps<T>,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    return (
      <Controller
        control={control}
        name={name as FieldPath<T>}
        {...props}
        render={({ field }) => (
          <Input
            {...field}
            {...inputProps}
            placeholder={placeholder}
            type={type}
            ref={ref} // Forward the ref
          />
        )}
      />
    );
  },
);

InputField.displayName = "InputField";

export { InputField };
