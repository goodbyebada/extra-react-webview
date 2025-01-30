import { COLORS } from "@styled/colors";
import { forwardRef } from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
  flex: 1;
  border: none;
  background-color: ${COLORS.midNightGray};
  color: ${COLORS.white};
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 14px;
  word-break: break-all;
  resize: none;
  height: fit-content;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${COLORS.lightGray};
  }
`;

const TextAreaInput = forwardRef<HTMLTextAreaElement>(() => {
  return <StyledTextArea />;
});
