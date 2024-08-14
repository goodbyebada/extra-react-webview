import styled from "styled-components";

function CancelCheckModal() {
  return (
    <ModalContainer>
      <ModalText>
        해당 공고의 지원을 <br /> 취소하시겠어요?
      </ModalText>
      <HomeBox>
        <Img />
        <InfoContainer>
          <TitleTxt>title</TitleTxt>
          <DateAndDeadlineContainer>
            <DateTxt>date</DateTxt>
            <DeadlineBox>D-0</DeadlineBox>
          </DateAndDeadlineContainer>
        </InfoContainer>
      </HomeBox>
      <ButtonContainer>
        <BtnY>예</BtnY>
        <BtnN>아니요</BtnN>
      </ButtonContainer>
    </ModalContainer>
  );
}

export default CancelCheckModal;

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

const ModalText = styled.div`
  color: #fff;
  text-align: center;
  font-variant-numeric: lining-nums proportional-nums;
  font-feature-settings: "dlig" on;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 37px;
  letter-spacing: 0.24px;
  margin-top: 75px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  font-variant-numeric: lining-nums proportional-nums;
  font-feature-settings: "dlig" on;
  font-family: Inter;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.2px;
  gap: 11px;
`;

const BtnY = styled.button`
  width: 134px;
  height: 53px;
  flex-shrink: 0;
  border-radius: 18px;
  background: #f5c001;
  color: #000;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BtnN = styled.button`
  width: 134px;
  height: 53px;
  flex-shrink: 0;
  border-radius: 18px;
  background: #3a3a3a;
  color: #fff;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomeBox = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  align-items: center;
  border-radius: 20px;
  margin-left: 33px;
  margin-top: 55px;
  margin-bottom: 115px;
`;

const Img = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  border: 3px solid #b9b9b9;
  background: #e8e8e8;
  margin-right: 17px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const TitleTxt = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 0.16px;
  margin-bottom: 5px;
`;

const DateAndDeadlineContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const DateTxt = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.14px;
  margin-right: 10px;
`;

const DeadlineBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 18px;
  border-radius: 20px;
  background: #d9d9d9;
  color: #888;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.11px;
`;
