import React from "react";
import styled from "styled-components";
import multiply from "@assets/Multiply.png";
import { useNavigate } from "react-router-dom";

interface CompleteModalProps {
  closeModal: () => void;
}

const CompleteModal: React.FC<CompleteModalProps> = ({ closeModal }) => {
  const navigate = useNavigate();
  const homePath = "/";
  const mySupportStatusPath = "/";
  // 지원현황 라우팅 주소 임시

  return (
    <ModalContainer>
      <MultiplyIcon src={multiply} onClick={closeModal} />
      <ModalText>
        지원이 <br /> 마감되었어요!
      </ModalText>
      <ButtonContainer>
        <Btn
          onClick={() => {
            navigate(homePath);
          }}
        >
          홈 화면 가기
        </Btn>
        <Btn
          onClick={() => {
            navigate(mySupportStatusPath);
          }}
        >
          내 지원 현황 보기
        </Btn>
      </ButtonContainer>
    </ModalContainer>
  );
};

export default CompleteModal;

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
  text-align: center;
  font-family: Inter;
  font-size: 33px;
  font-style: normal;
  font-weight: 700;
  line-height: 45px;
  margin-top: 105px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: absolute;
  bottom: 47px;
`;

const Btn = styled.button`
  width: 299px;
  height: 53px;
  flex-shrink: 0;
  border-radius: 18px;
  background: #f5c001;
  color: #000;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  display: block;
  margin: 0px auto;
`;
