import styled from "styled-components";

import { FaCheck } from "react-icons/fa6";
import Text from "@components/atoms/Text";
import { useEffect, useState } from "react";
import { MainButton } from "@components/atoms/Button";
import Margin from "@components/atoms/Margin";
import { BACKGROUND_COLORS, COMMON_COLORS, FONT_COLORS } from "@/styled/colors";

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

const ModalWrapper = styled.div`
  width: 100%;

  background: #2b2b2b;

  padding: 40px 50px;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

const TermItemWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
`;

const TermDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${BACKGROUND_COLORS.disabled};

  margin: 20px 0;
`;

interface CheckButtonProps {
  checked: boolean;
}

const CheckButtonWrapper = styled.div<CheckButtonProps>`
  width: 30px;
  height: 30px;
  margin-right: 20px;

  border-radius: 5px;
  ${({ checked }) =>
    checked
      ? `background: ${COMMON_COLORS.main};`
      : `border: 1px solid ${BACKGROUND_COLORS.disabled};`}

  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckButton = ({ checked }: CheckButtonProps) => {
  return (
    <CheckButtonWrapper checked={checked}>
      <FaCheck
        color={checked ? BACKGROUND_COLORS.default : BACKGROUND_COLORS.disabled}
        size={15}
      />
    </CheckButtonWrapper>
  );
};

interface TermItemProps extends CheckButtonProps {
  text: string;
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const TermItem = ({ checked, text, onClick }: TermItemProps) => {
  return (
    <TermItemWrapper onClick={onClick}>
      <CheckButton checked={checked} />
      <button onClick={onClick}>
        <Text
          size={14}
          weight={500}
          color={checked ? FONT_COLORS.white : BACKGROUND_COLORS.disabled}
        >
          {text}
        </Text>
      </button>
    </TermItemWrapper>
  );
};

interface TermItem {
  text: string;
  callback?: () => void;
  required?: boolean;
}

interface TermModalProps {
  handleClose: () => void;
  handleSubmit: () => void;
}

const termItems: TermItem[] = [
  {
    text: "이용약관 동의",
    required: true,
  },
  {
    text: "개인정보 수집 및 이용 동의",
    required: true,
  },
  {
    text: "위치정보 이용 동의",
    required: true,
    callback: () => {
      console.log("위치 동의");
    },
  },
  {
    text: "개인정보 유효기간 탈퇴 시로 지정",
    required: false,
  },
  {
    text: "홍보성 정보 메일, SMS 수신 동의",
    required: false,
    callback: () => {
      console.log("마케팅 수신 동의");
    },
  },
];

const TermModal = ({ handleClose, handleSubmit }: TermModalProps) => {
  const [checkList, setCheckList] = useState<boolean[]>([]);
  const [allChecked, setAllChecked] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [items, setItems] = useState<TermItem[]>([]);

  useEffect(() => {
    setItems(termItems);
    setCheckList([...Array(termItems.length)].map(() => false));
  }, []);

  useEffect(() => {
    let newAllChecked = true;
    let valid = true;
    items.forEach((v, i) => {
      if (v.required && !checkList[i]) valid = false;
      if (!checkList[i]) newAllChecked = false;
    });
    setIsValid(valid);
    setAllChecked(newAllChecked);
  }, [checkList, items]);

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <TermItem
          checked={allChecked}
          text="약관 전체동의"
          onClick={(e) => {
            e.stopPropagation();
            setCheckList(checkList.map(() => !allChecked));
            setAllChecked(!allChecked);
          }}
        />
        <TermDivider />
        {items.map((v, i) => (
          <>
            <TermItem
              key={i}
              checked={checkList[i]}
              text={v.text}
              onClick={(e) => {
                e.stopPropagation();
                const newCheckList = [...checkList];
                newCheckList[i] = !checkList[i];
                setCheckList(newCheckList);
              }}
            />
            <Margin size={24} />
          </>
        ))}
        <Margin size={30} />
        <MainButton
          isActive={isValid}
          disabled={!isValid}
          onClick={(e) => {
            e.stopPropagation();
            items.forEach((v, i) => {
              if (checkList[i] && v.callback != undefined) v.callback();
            });
            handleClose();
            handleSubmit();
          }}
        >
          다음
        </MainButton>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default TermModal;
