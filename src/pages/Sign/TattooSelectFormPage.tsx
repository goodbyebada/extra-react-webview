import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Text from "@components/atoms/Text";
import SignWindow from "@components/mocules/SignWindow";
import { BACKGROUND_COLORS, COMMON_COLORS, FONT_COLORS } from "@/styled/colors";

interface SelectButtonProps {
  isActive: boolean;
}

const SelectButton = styled.div<SelectButtonProps>`
  width: 48%;
  height: 100px;
  margin-bottom: 20px;

  border-radius: 20px;

  background: ${BACKGROUND_COLORS.input};

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isActive }) =>
    isActive ? `border: 2px solid ${COMMON_COLORS.main}` : ""}
`;

const ListWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const tattooNames = [
  "왼쪽 팔",
  "오른쪽 팔",
  "왼쪽 다리",
  "오른쪽 다리",
  "왼쪽 손",
  "오른쪽 손",
  "가슴",
  "배",
  "등",
  "어깨",
  "얼굴",
  "발",
];

const TattoSelectFormPage = () => {
  const [checkList, setCheckList] = useState(tattooNames.map(() => false));

  const checkValid = useCallback(() => {
    let valid = false;
    checkList.forEach((v) => {
      valid = valid || v;
    });
    return valid;
  }, [checkList]);

  const navigate = useNavigate();

  return (
    <SignWindow
      title="타투 부위"
      subTitle="타투하신 부위를 모두 선택해주세요"
      buttonProps={{
        isActive: checkValid(),
        disabled: !checkValid(),
        onClick: () => {
          let tattoo = "";
          checkList.forEach((v, i) => {
            if (v) {
              if (tattoo.length > 0) tattoo += ", ";
              tattoo += tattooNames[i];
            }
          });
          localStorage.setItem("tattoo", tattoo);
          navigate("/account-form");
        },
      }}
    >
      <ListWrapper>
        {checkList.map((v, i) => (
          <SelectButton
            onClick={() => {
              const newCheckList = [...checkList];
              newCheckList[i] = !v;
              setCheckList(newCheckList);
            }}
            isActive={v}
            key={i}
          >
            <Text
              size={20}
              weight={700}
              color={v ? FONT_COLORS.white : FONT_COLORS.gray}
            >
              {tattooNames[i]}
            </Text>
          </SelectButton>
        ))}
      </ListWrapper>
    </SignWindow>
  );
};

export default TattoSelectFormPage;
