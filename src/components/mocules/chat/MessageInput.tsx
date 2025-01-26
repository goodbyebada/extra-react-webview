import React, { ChangeEvent, useRef } from "react";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";

const Container = styled.div`
  /* flex: 1; */
  /* height: fit-content; */
  display: flex;
  align-items: center;
  background-color: #2c2c2c;
  border-radius: 25px;
  padding: 5px 10px;
  gap: 10px;
`;

const Input = styled.textarea`
  flex: 1;
  border: none;
  background-color: #2c2c2c;
  color: #aaa;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 14px;
  word-break: break-all;
  resize: none;
  height: fit-content;

  min-height: 37px; /* Set a minimum height */

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
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
  bottomRef: React.MutableRefObject<HTMLDivElement | null>;
}

const MessageInput = ({
  value,
  onChange,
  onSubmit,
  placeholder = "메세지를 입력하세요",
  disabled = false,
  bottomRef,
}: MessageInputProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const textAreaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleResizeHeight();
    onChange(e);
  };

  const DEFAULT_TEXTAREA_HEIGHT = {
    MIN: 37,
    MAX: 90,
  };

  const handleResizeHeight = () => {
    if (textAreaRef && textAreaRef.current) {
      if (textAreaRef.current.scrollHeight > DEFAULT_TEXTAREA_HEIGHT.MAX) {
        return;
      }

      textAreaRef.current.style.height = `${DEFAULT_TEXTAREA_HEIGHT.MIN}px`; //height 초기화

      if (
        textAreaRef.current.style.height.toString() ===
        textAreaRef.current.scrollHeight + "px"
      ) {
        return;
      }

      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";


      if (bottomRef && bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  };

  const handlePressEnterFetch = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <Container>
      <Input
        ref={textAreaRef}
        rows={1}
        value={value}
        onChange={textAreaChangeHandler}
        placeholder={placeholder}
        onKeyDown={handlePressEnterFetch}
      />
      <Button onClick={onSubmit} type="submit" disabled={disabled || !value}>
        <IoSend />
      </Button>
    </Container>
  );
};

export default MessageInput;
