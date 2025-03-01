import { ThemeText } from "@components/atoms/Text";
import { styled } from "styled-components";

interface RoleDetailCondition {
  indexNumber: number;
  category: string;
  value: string;
}

export default function RoleDetailConditonItem({
  indexNumber,
  category,
  value,
}: RoleDetailCondition) {
  return (
    <Item>
      <NumberIcon>
        <p>{indexNumber}</p>
      </NumberIcon>
      <TextWrapper>
        <ThemeText variant={"item-subtitle"}>
          {category}: {value}
        </ThemeText>
      </TextWrapper>
    </Item>
  );
}

const TextWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  word-break: break-all;
`;

const NumberIcon = styled.span`
  width: 25px;
  height: fit-content;
  font-size: 14px;
  font-style: normal;
  font-weight: 900;

  /* 정중앙 */
  display: flex;
  justify-content: center;
  align-items: center;

  border: solid 2px white;
  border-radius: 50%;
  margin-right: 0.5em;
`;

const Item = styled.li`
  display: flex;
  width: 100%;

  align-items: center;
  padding: 5px 10px;
`;
