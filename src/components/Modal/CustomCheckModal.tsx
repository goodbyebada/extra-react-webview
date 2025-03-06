import styled from "styled-components";
import multiply from "@assets/Multiply.png";
import approval from "@assets/Approval.png";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { ResponseStatus } from "@type/shared";
import { useState } from "react";
import Loading from "@components/Loading";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@components/atoms/Modal";

interface customProps {
  closeModal: () => void;
}

//TODO ATOMIC 디자인 시스템에 맞게 리팩토링 필요
const CustomCheckModal = ({ closeModal }: customProps) => {
  const navigate = useNavigate();
  const appliedData = useSelector(
    (state: RootState) => state.appliedRoles.appliedRole,
  );
  const [fullfilled, setFullFilled] = useState(false);

  useEffect(() => {
    if (appliedData.status === ResponseStatus.fullfilled) {
      setFullFilled(true);
    }
  }, [appliedData.status]);

  function ReturnMessage() {
    switch (appliedData.status) {
      case ResponseStatus.fullfilled:
        return (
          <>
            지원이 <br /> 완료되었습니다!
          </>
        );
      case ResponseStatus.rejected:
        return <>{appliedData.error}</>;
      default:
        <></>;
      // return <Loading loading={true} />;
    }
  }

  return (
    <>
      {appliedData.status === ResponseStatus.loading ? (
        <Loading loading={true} />
      ) : (
        <Modal isVisible={true} onClose={closeModal}>
          <MultiplyIcon src={multiply} onClick={closeModal} />
          <ModalText> {ReturnMessage()}</ModalText>
          {fullfilled ? <ApprovalIcon src={approval} /> : <Default />}

          <ButtonContainer>
            <Btn
              onClick={() => {
                navigate("/member/home");
              }}
            >
              홈 화면 가기
            </Btn>
            <Btn
              onClick={() => {
                navigate("/member/manage");
              }}
            >
              내 지원 현황 보기
            </Btn>
          </ButtonContainer>
        </Modal>
      )}
    </>
  );
};

export default CustomCheckModal;

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
  padding: 0px 20px;
`;

const ApprovalIcon = styled.img`
  display: block;
  margin: 0px auto;
  padding-top: 24px;
  padding-bottom: 68px;
`;

const Default = styled.div`
  display: block;
  margin: 0px auto;
  padding-top: 24px;
  padding-bottom: 98px;
`;

const ButtonContainer = styled.div`
  min-width: 289px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Btn = styled.button`
  width: 259px;
  /* margin: 0px 10px; */
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
