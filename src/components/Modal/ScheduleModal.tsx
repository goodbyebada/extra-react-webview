import styled from "styled-components";
import multiply from "@assets/Multiply.png";
import SmallRecruitBox from "@components/SmallRecruitBox";
import { JobPost } from "@api/interface";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { memberRoleFrontDummyData } from "@api/dummyData";

/**
 * 추후 props 추가 통해,
 * 모달 창 props 추가 통해 데이터 연결 예정
 *
 *
 * @param param0
 * @returns
 */

// dayOfJobList 해당 날짜의 공고일정들 추후 ? 삭제 예정
interface ScheduleModalProps {
  dayOfJobList?: JobPost;
  selectedDateInfo: {
    year: number;
    month: number;
    dateNum: number;
    dayOfWeek: string;
  };
  closeModal: () => void;
}

/**
 * 현재 서버 문제로,더미데이터로 적용되어있음
 * @param param0
 * @returns
 */
function ScheduleModal({ selectedDateInfo, closeModal }: ScheduleModalProps) {
  const appliedListData = useSelector((state: RootState) => {
    return state.appliedRoles.getMemberApplies.data;
  });
  //  더미데이터 적용되어있음 -> 연도 & 월의 일정 store에서 탐색한다.
  //  initData id가 -1,0이라면 불러온 데이터가없다.
  const appliedList =
    appliedListData[0].id <= 0 ? memberRoleFrontDummyData : appliedListData;

  const { year, month, dateNum, dayOfWeek } = selectedDateInfo;
  const dateString = `${year}/${month + 1}/${dateNum}  (${dayOfWeek})`;

  const dateNumber = dateNum;

  const todayJobList = appliedList.filter(
    (elem) =>
      elem.calender.startDateNum === dateNumber ||
      (elem.calender.startDateNum <= dateNumber &&
        dateNumber <= elem.calender.endDateNum),
  );

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
        {todayJobList.map((elem, key) => {
          console.log(elem);
          return <SmallRecruitBox key={key} elem={elem} />;
        })}
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
