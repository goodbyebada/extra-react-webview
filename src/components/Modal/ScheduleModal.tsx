import styled from "styled-components";
import multiply from "@assets/Multiply.png";
import { JobPost, MemberRoleFront } from "@/type/shared";
import { DateDetailedInfo } from "@/type/dateInteface";
import Item from "@components/mocules/Item";
import Modal from "@components/atoms/Modal";
import { ContentWrapper } from "@components/atoms/Wrapper";

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
  selectedDateInfo: DateDetailedInfo;
  scheduledJobsByDate: MemberRoleFront[][];
  closeModal: () => void;
  isVisible: boolean;
}

function ScheduleModal({
  selectedDateInfo,
  closeModal,
  scheduledJobsByDate,
  isVisible,
}: ScheduleModalProps) {
  const { year, month, dateNum, weekDayLabel } = selectedDateInfo;
  const dateString = `${year}/${month + 1}/${dateNum}  (${weekDayLabel})`;
  const todayJobList = scheduledJobsByDate[dateNum + 1];

  const dateYMstr = `${year}/${month + 1}/`;

  return (
    <Modal isVisible={isVisible} onClose={closeModal}>
      <MultiplyIcon
        src={multiply}
        onClick={() => {
          closeModal();
        }}
      />

      <ModalText>{dateString}</ModalText>
      <ListContainer>
        <ContentWrapper>
          {todayJobList &&
            todayJobList.length > 0 &&
            todayJobList.map((jobPost, key) => {
              const {
                title,
                category,
                gatheringTime,
                gatheringLocation,
                companyName,
                status,
                calender,
              } = jobPost;

              const startDate = dateYMstr + calender.startDateNum.toString();
              const endDate = dateYMstr + calender.endDateNum.toString();
              return (
                <ItemWrapper>
                  <Item
                    key={key}
                    title={title}
                    category={category}
                    time={gatheringTime}
                    location={gatheringLocation}
                    company={companyName}
                    status={status}
                    dDay=""
                    date={[startDate, endDate]}
                    onClick={() => {}}
                  />
                </ItemWrapper>
              );
            })}
        </ContentWrapper>
      </ListContainer>
      <Edit>편집</Edit>
    </Modal>
  );
}

export default ScheduleModal;

const ListContainer = styled.div`
  height: 60vh;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 430px) {
    transform: scale(0.7);
  }
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
