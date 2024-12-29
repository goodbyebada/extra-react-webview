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

const StyledBoxButton = styled.div<{ isActive: boolean }>`
  width: 40%;
  height: 30px;
  border-radius: 5px;
  background: ${(props) =>
    props.isActive ? "rgba(116, 116, 116, 0.4)" : "#747474"};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  white-space: nowrap;
  overflow: hidden;
`;

/**
 * Favorite Button (별 모양 즐겨찾기 버튼)
 * isActive: 활성화 여부
 * 하위 컴포넌트 추가 불가능
 * @param onClick () => void (onClick method)
 * @param isActive boolean (active status)
 */
const StarToggleButton = ({ onClick, isActive }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick}>
      <img src={isActive ? star_y : star_g} alt="star" />
    </StyledButton>
  );
};

/**
 * Main Submit Button
 * isActive: 색 지정을 위한 props (비활성화 불가능)
 * isActive: true => 테마 (#f5c001) 색
 * isActive: false => 회색
 * disabled: button 비활성화 여부
 * 하위 컴포넌트에는 텍스트만 가능
 * @param children string (button inner text)
 * @param  onClick () => void (onClick method)
 * @param isActive boolean (button design type)
 * @param disabled boolean (disabled status)
 */
const MainButton = ({
  children,
  onClick = () => {},
  isActive = true,
  disabled = false,
}: ButtonProps) => {
  return (
    <StyledMainButton isActive={isActive} onClick={onClick} disabled={disabled}>
      <Text size={17} color={isActive ? "#000" : "#adadad"} weight={700}>
        {children}
      </Text>
    </StyledMainButton>
  );
};

/**
 * Box Button : 카테고리 및 타투 클릭 버튼
 * isActive: 색 지정을 위한 props (비활성화 불가능)
 * isActive: true => 어두운 회색 (rgba(116, 116, 116, 0.4))
 * isActive: false => 밝은 회색 (#747474)
 * 하위 컴포넌트에는 텍스트만 가능
 * @param children string (button inner text)
 * @param  onClick () => void (onClick method)
 * @param isActive boolean (button design type)
 */
const BoxButton = ({ children, onClick, isActive = false }: ButtonProps) => {
  return (
    <StyledBoxButton onClick={onClick} isActive={isActive}>
      <Text
        size={13}
        color={isActive ? "rgba(255, 255, 255, 0.4)" : "#fff"}
        weight={700}
      >
        {children}
      </Text>
    </StyledBoxButton>
  );
};

export { StarToggleButton, MainButton, BoxButton };
