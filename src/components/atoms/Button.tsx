import React from "react";
import Text from "@components/atoms/Text";
import styled from "styled-components";
import star_g from "@assets/Star_g.png";
import star_y from "@assets/Star_y.png";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

const StyledButton = styled.button`
  margin: 0;
  padding: 0;
  outline: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledMainButton = styled(StyledButton)<ButtonProps>`
  width: 100%;
  height: 53px;
  margin: 0 auto;
  border-radius: 18px;
  ${({ disabled }) => !disabled && "cursor: pointer;"}

  background: ${({ isActive }) => (isActive ? "#f5c001" : "#575757")};
`;

const StarToggleButton: React.FC<ButtonProps> = ({ onClick, isActive }) => {
  return (
    <StyledButton onClick={onClick}>
      <img src={isActive ? star_y : star_g} alt="star" />
    </StyledButton>
  );
};

const MainButton: React.FC<ButtonProps> = ({
  children,
  onClick = () => {},
  isActive = true,
  disabled = false,
}) => {
  return (
    <StyledMainButton isActive={isActive} onClick={onClick} disabled={disabled}>
      <Text size={17} color={isActive ? "#000" : "#adadad"} weight={700}>
        {children}
      </Text>
    </StyledMainButton>
  );
};

export { StarToggleButton, MainButton };
