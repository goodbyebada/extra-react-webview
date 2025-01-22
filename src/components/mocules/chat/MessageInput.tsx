import React from "react";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";

const Container = styled.form`
  display: flex;
  align-items: center;
  background-color: #2c2c2c;
  border-radius: 25px;
  padding: 5px 10px;
  gap: 10px;
  position: sticky;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background-color: #2c2c2c;
  color: #aaa;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 14px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #666;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;

  svg {
    fill: #fff;
    width: 20px;
    height: 20px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

const MessageInput = ({
  value,
  onChange,
  onSubmit,
  placeholder = "메세지를 입력하세요",
  disabled = false,
}: MessageInputProps) => {
  return (
    <Container onSubmit={onSubmit}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <Button type="submit" disabled={disabled || !value}>
        <IoSend />
      </Button>
    </Container>
  );
};

export default MessageInput;
