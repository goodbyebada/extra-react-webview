import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Color from "@/constants/color";
import Text from "@components/atoms/Text";
import SignWindow from "@components/mocules/SignWindow";
import TermModal from "@components/organisms/TermModal";

interface SelectButtonProps {
  isActive: boolean;
}

const SelectButton = styled.div<SelectButtonProps>`
  width: 48%;
  height: 100px;
  margin-bottom: 20px;

  border-radius: 20px;

  background: ${Color.input};

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isActive }) => (isActive ? `border: 2px solid ${Color.theme}` : "")}
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

const companyList = ["A", "B", "C", "D"];

const CompanyInfoFormPage = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <SignWindow
        title="소속 선택"
        subTitle="소속된 업체를 선택해주세요"
        buttonProps={{
          isActive: currentIndex != -1,
          disabled: currentIndex == -1,
          onClick: () => {
            localStorage.setItem("company", companyList[currentIndex]);
            setIsOpenModal(true);
          },
        }}
      >
        <ListWrapper>
          {companyList.map((v, i) => (
            <SelectButton
              onClick={() => {
                setCurrentIndex(i);
              }}
              isActive={currentIndex == i}
              key={i}
            >
              <Text
                size={20}
                weight={700}
                color={currentIndex == i ? Color.text : Color.subText}
              >
                {v}
              </Text>
            </SelectButton>
          ))}
        </ListWrapper>
      </SignWindow>
      {isOpenModal && (
        <TermModal
          handleClose={() => setIsOpenModal(false)}
          handleSubmit={() => {
            navigate("/");
          }}
        />
      )}
    </>
  );
};

export default CompanyInfoFormPage;
