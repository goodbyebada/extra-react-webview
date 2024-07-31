import React, { ReactNode } from "react";
import styled from "styled-components";

interface SmallRecruitStatusProps {
  visible: boolean;
  borderColor: string;
  backgroundColor: string;
  color: string;
  fontSize: string;
  children: ReactNode;
}

const SmallRecruitStatus: React.FC<SmallRecruitStatusProps> = ({
  visible,
  borderColor,
  backgroundColor,
  color,
  fontSize,
  children,
}) => {
  return (
    <RecruitStatusContainer
      visible={visible}
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      color={color}
      fontSize={fontSize}
    >
      {children}
    </RecruitStatusContainer>
  );
};

export default SmallRecruitStatus;

const RecruitStatusContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 12px;
  right: 10px;
  width: 52px;
  height: 22px;
  border-radius: 20px;
  border: 1px solid ${(props) => props.borderColor};
  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: 900;
  letter-spacing: 0.1px;
  display: ${(props) => (props.visible ? "flex" : "none")};
`;
