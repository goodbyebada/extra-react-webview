import React from "react";
import styled from "styled-components";
import multiply from "../../assets/Multiply.png";
import RoleBox from "../RoleBox";

function RuleModal() {
  return (
    <ModalContainer>
      <MultiplyIcon src={multiply} />
      <RoleBoxWrapper>
        <RoleBox borderColor="#fff" backgroundColor="#000" color="#fff" />
        <RoleBox
          borderColor="transparent"
          backgroundColor="linear-gradient(#000, #000) padding-box,
              linear-gradient(180deg, #FFFFFF 0%, #F5C001 100%) border-box;"
          color="#fff"
        />
        <RoleBox borderColor="#666666" backgroundColor="#000" color="#666666" />
      </RoleBoxWrapper>
      <Btn>지원하기</Btn>
    </ModalContainer>
  );
}

export default RuleModal;

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

const RoleBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 70px;
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
  position: absolute;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
`;
