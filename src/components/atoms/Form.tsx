// import React from "react";
import styled from "styled-components";

interface InputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  readOnly?: boolean;
}

const StyledInput = styled.input`
  width: 100%;
  height: 60px;
  padding-left: 14px;

  background: none;
  outline: none;
  border: 2px solid #696969;
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
 * @param placeholder string (placeholder)
 * @param value string (input value)
 * @param onChange string (onChange method)
 * @param required boolean (whether to allow empty values)
 * @param readOnly boolean (whether to allow changing values)
 */
const Input = ({
  name,
  placeholder,
  value = "",
  onChange,
  required = true,
  readOnly = false,
}: InputProps) => {
  return (
    <StyledInput
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      required={required}
      readOnly={readOnly}
      onChange={(event) => {
        event.preventDefault();
        onChange(event.target.value);
      }}
    />
  );
};

export { Input };
