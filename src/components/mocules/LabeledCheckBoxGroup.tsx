import { ThemeText } from "@components/atoms/Text";
import { useEffect } from "react";
import { styled } from "styled-components";
import { useState } from "react";

interface LabeldCheckedProps {
  checkedIdx: number;
  text: string;
  handleCheckboxChange: (checkedIdx: number) => void;
  checkedStatus: boolean;
}

interface LabeldCheckboxGroupProps {
  lableItemList: string[];
  defaultCheckedLabelIdx?: number;
  handleCheckedItemLable: (checkedLabel: string | undefined) => void;
}

/**
 * 체크 박스 + string label UI
 */
export const LabeledCheckbox = ({
  checkedIdx,
  text,
  handleCheckboxChange,
  checkedStatus,
}: LabeldCheckedProps) => {
  // [ ] 12.28 ThemeText childeren prop에 html 태그 들어가는것 괜찮은가? 렌더링 면에서 -> childeren wrapper과 차이는 무엇인가?
  return (
    <Label htmlFor={`check-${checkedIdx}`}>
      <StyledInput
        id={`check-${checkedIdx}`}
        type="checkbox"
        checked={checkedStatus}
        onChange={() => handleCheckboxChange(checkedIdx)}
      />
      <CheckedIcon />
      <Wrapper>
        <ThemeText
          children={<p>{text}</p>}
          variant={"item-subtitle"}
          align={"left"}
        />
      </Wrapper>
    </Label>
  );
};

export const LabeledCheckBoxGroup = ({
  lableItemList,
  defaultCheckedLabelIdx,
  handleCheckedItemLable,
}: LabeldCheckboxGroupProps) => {
  const [labelMap, setCheckLabel] = useState<Map<number, string>>(new Map());
  const [checkedArray, setCheckedArrayList] = useState<boolean[]>([]);

  const handleCheckboxChange = (checkedIdx: number) => {
    setCheckedArrayList((prev: boolean[]) =>
      prev.map((_, idx) => idx === checkedIdx),
    );

    const label = labelMap.get(checkedIdx);
    if (label) handleCheckedItemLable(label);
  };

  useEffect(() => {
    const initLabelMap = () => {
      const itemsMap = new Map<number, string>();
      lableItemList.forEach((label, key) => itemsMap.set(key, label));
      setCheckLabel(itemsMap);
    };

    const initCheckedBooleanArray = () => {
      const itemsCheckedStatus = Array.from(
        { length: lableItemList.length },
        () => false,
      );

      let checkedIdx = 0;
      if (defaultCheckedLabelIdx) checkedIdx = defaultCheckedLabelIdx;
      itemsCheckedStatus[checkedIdx] = true;

      setCheckedArrayList(itemsCheckedStatus);
    };

    initLabelMap();
    initCheckedBooleanArray();
  }, [lableItemList, defaultCheckedLabelIdx]);

  return (
    <LabeledWrapper>
      {checkedArray.map((status: boolean, key: number) => (
        <LabeledCheckbox
          key={key}
          checkedIdx={key}
          checkedStatus={status}
          handleCheckboxChange={handleCheckboxChange}
          text={labelMap.get(key) || "undefiend"}
        />
      ))}
    </LabeledWrapper>
  );
};

const LabeledWrapper = styled.div`
  display: flex;
`;

const CheckedIcon = styled.span`
  width: 1.4em;
  height: 1.4em;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center; // "✔"을 중앙에 정렬
`;

const StyledInput = styled.input`
  &[type="checkbox"] {
    display: none;
  }

  &[type="checkbox"]:checked + ${CheckedIcon}::before {
    text-align: center;
    content: "✔";
    position: absolute;
    left: 2px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.8em; // 크기 조정
  }
`;

const Label = styled.label`
  display: flex;
  position: relative;
  cursor: pointer;
  margin: 0px 10px;
`;

const Wrapper = styled.div`
  padding-left: 17px;
`;
