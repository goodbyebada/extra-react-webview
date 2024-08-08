import styled from "styled-components";
import multiply from "@assets/Multiply.png";
import SmallRecruitBox from "@components/SmallRecruitBox";
import { JobPost } from "@api/interface";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

/**
 * 추후 props 추가 통해,
 * 모달 창 props 추가 통해 데이터 연결 예정
 *
 *
 * @param param0s
 * @returns
 */

// dayOfJobList 해당 날짜의 공고일정들 추후 ? 삭제 예정
interface ScheduleModalProps {
  dayOfJobList?: JobPost;
  closeModal: () => void;
}

function ScheduleModal({ closeModal }: ScheduleModalProps) {
  const selectedDate = useSelector(
    (state: RootState) => state.homeSelectedDate,
  );

  const { year, month, dateNum, dayOfWeek } = selectedDate;
  const dateString = `${year}/${month}/${dateNum}  (${dayOfWeek})`;

  return (
    <ModalContainer>
      <button
        onClick={() => {
          closeModal();
        }}
      >
        <MultiplyIcon src={multiply} />
      </button>
      <ModalText>{dateString}</ModalText>
      <SmallRecruitBoxWrapper>
        <SmallRecruitBox />
        <SmallRecruitBox />
      </SmallRecruitBoxWrapper>
      <Edit>편집</Edit>
    </ModalContainer>
  );
}

export default ScheduleModal;

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
  line-height: 20px;
  letter-spacing: 0.2px;
  padding-top: 27px;
  padding-bottom: 38px;
  text-align: center;
`;

const SmallRecruitBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;

const Edit = styled.div`
  color: #a1a1a1;
  font-variant-numeric: lining-nums proportional-nums;
  font-feature-settings: "dlig" on;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 900;
  line-height: 20px;
  letter-spacing: 0.15px;
  text-decoration-line: underline;
  position: absolute;
  right: 47px;
  bottom: 42px;
`;
