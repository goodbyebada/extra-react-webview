import styled from "styled-components";

interface TypeSelectorButtonProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

/**
 * TypeSelectorButton : 공고 역할 등록 모달 버튼 - 성별, 계절 선택 버튼
 * @param options: option의 문자열 배열
 * @param selected: 현재 선택된 option 값
 * @param onSelect: 선택한 option 콜백 함수
 */

const TypeSelectorButton = ({
  options,
  selected,
  onSelect,
}: TypeSelectorButtonProps) => {
  return (
    <ButtonGroup>
      {options.map((option, index) => (
        <Button
          key={option}
          isActive={option === selected}
          onClick={() => onSelect(option)}
          $first={index === 0}
          $last={index === options.length - 1}
        >
          {option}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default TypeSelectorButton;

const ButtonGroup = styled.div`
  display: flex;
  margin-left: 10px;
`;

const Button = styled.button<{
  isActive: boolean;
  $first?: boolean;
  $last?: boolean;
}>`
  width: 38px;
  height: 28px;
  border: none;
  border-radius: ${(props) =>
    props.$first ? "30px 0 0 30px" : props.$last ? "0 30px 30px 0" : "0"};
  background-color: ${(props) => (props.isActive ? "#F5C001" : "#D9D9D9")};
  color: ${(props) => (props.isActive ? "#ffffff" : "#ffffff")};
  font-weight: 700;
`;
