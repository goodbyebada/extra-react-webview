import React from "react";
import styled from "styled-components";

// eslint-disable-next-line react/prop-types
const DeleteButton = ({ cancelText }) => {
  return <StyledDeleteButton>{cancelText}</StyledDeleteButton>;
};

export default DeleteButton;

const StyledDeleteButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 157px;
  height: 144px;
  background: #f00;
  color: #fff;
  border: 2px solid #ad0000;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  padding-right: 16px;
  font-size: 20px;
  font-weight: 900;
  border-radius: 20px;
  z-index: 1;
  white-space: pre-wrap;
  line-height: 1.2;
`;
