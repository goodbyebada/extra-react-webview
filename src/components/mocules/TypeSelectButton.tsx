import { BACKGROUND_COLORS, COMMON_COLORS, FONT_COLORS } from "@/styled/colors";
import Margin from "@components/atoms/Margin";
import Text from "@components/atoms/Text";
import styled from "styled-components";

interface StyledTypeSelectButtonProps {
  isActive: boolean;
}

interface TypeSelectButtonProps extends StyledTypeSelectButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  text: string;
}

const StyledTypeSelectButton = styled.button<StyledTypeSelectButtonProps>`
  width: 100%;
  height: 150px;

  border-radius: 20px;

  background: ${BACKGROUND_COLORS.input};

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isActive }) =>
    isActive ? `border: 2px solid ${COMMON_COLORS.main}` : ""}
`;

const TypeSelectButton = ({
  isActive,
  onClick,
  icon,
  text,
}: TypeSelectButtonProps) => {
  return (
    <StyledTypeSelectButton onClick={onClick} isActive={isActive}>
      {icon !== undefined && (
        <>
          {icon}
          <Margin direction="horizontal" size={20} />
        </>
      )}
      <Text
        size={20}
        weight={700}
        color={isActive ? FONT_COLORS.white : FONT_COLORS.gray}
      >
        {text}
      </Text>
    </StyledTypeSelectButton>
  );
};

export default TypeSelectButton;
