import Color from "@/constants/color";
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

  background: ${Color.input};

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isActive }) => (isActive ? `border: 2px solid ${Color.theme}` : "")}
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
        color={isActive ? Color.text : Color.subText}
      >
        {text}
      </Text>
    </StyledTypeSelectButton>
  );
};

export default TypeSelectButton;
