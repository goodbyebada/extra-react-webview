import React from "react";
import styled from "styled-components";
import multiply from "../../assets/Multiply.png";

function ScheduleEditModal() {
  return (
    <ModalContainer>
      <MultiplyIcon src={multiply} />
      <ModalText>Date</ModalText>
      <ButtonContainer>
        <Btn>일정 직접 추가하기</Btn>
        <Edit>편집</Edit>
      </ButtonContainer>
    </ModalContainer>
  );
}

export default ScheduleEditModal;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 345px;
  height: 537px;
  flex-shrink: 0;
  border-radius: 18px;
  z-index: 10;
  background:
    linear-gradient(#000, #000) padding-box,
    linear-gradient(180deg, #666666 0%, #f5c001 100%) border-box;
  border: 4px solid transparent;
`;

const MultiplyIcon = styled.img`
  position: absolute;
  top: 18px;
  right: 23px;
`;

const ModalText = styled.div`
  color: #fff;
  font-variant-numeric: lining-nums proportional-nums;
  font-feature-settings: "dlig" on;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: 20px; /* 100% */
  letter-spacing: 0.2px;
  padding-top: 27px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 31px;
  justify-content: center;
  position: absolute;
  bottom: 31px;
  width: 100%;
  left: 0;
`;

const Btn = styled.button`
  width: 203px;
  height: 41px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 2px solid #5c5c5c;
  background: #1f1f1f;
  color: #a1a1a1;
  font-variant-numeric: lining-nums proportional-nums;
  font-feature-settings: "dlig" on;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 900;
  line-height: 20px; /* 133.333% */
  letter-spacing: 0.15px;
`;

const Edit = styled.div`
  color: #a1a1a1;
  font-variant-numeric: lining-nums proportional-nums;
  font-feature-settings: "dlig" on;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 900;
  line-height: 20px; /* 133.333% */
  letter-spacing: 0.15px;
  text-decoration-line: underline;
`;
