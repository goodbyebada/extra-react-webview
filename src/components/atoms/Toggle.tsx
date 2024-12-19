import { styled } from "styled-components";
export { Toggle };
import { COMMON_COLORS, COLORS } from "@/styled/colors";
import { TEXT_CONSTANTS } from "@/constants/TEXT_CONSTANTS";

const Item = styled.span<{ $on: boolean }>`
  color: ${(props) => (props.$on ? COLORS.black : COLORS.darkGray)};
  width: 100%;
  text-align: center;
  z-index: 2;
`;

const ToggleInput = styled.input`
  &[type="checkbox"] {
    appearance: none;
    text-align: center;
    order: 0;
  }

  &[type="checkbox"]::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 13px;
    background-color: ${COMMON_COLORS.main};

    width: calc(100% / 2);
    height: 100%;
    transition: left 250ms linear;
  }

  &[type="checkbox"]:checked::before {
    left: calc(100% / 2);
  }
`;

// TODO width , hegith 상수화 필요해보임
const ToggleLabel = styled.label`
  width: 128px;
  height: 27px;

  display: flex;
  align-items: center;
  position: relative;

  border-radius: 26px;
  border: solid 1px ${COLORS.darkGray};
  background-color: ${COLORS.black};
  position: relative;

  /**text & font */
  font-size: 13px;
  font-weight: 900;
`;

interface ToggleProps {
  toggleCheckedHandler: () => void;
  toggleChecked: boolean;
}

interface CustomProps extends ToggleProps {
  leftText: string;
  rightText: string;
}
/**
 * 기본 상태 전체
 * toggle True시 : 전체
 * toggle False시 : 추천
 */
const Toggle = ({
  toggleCheckedHandler,
  toggleChecked,
  leftText,
  rightText,
}: CustomProps) => {
  return (
    <ToggleLabel>
      <ToggleInput
        type="checkbox"
        onChange={toggleCheckedHandler}
        checked={toggleChecked}
      />
      <Item $on={!toggleChecked}>{leftText}</Item>
      <Item $on={toggleChecked}>{rightText}</Item>
    </ToggleLabel>
  );
};
