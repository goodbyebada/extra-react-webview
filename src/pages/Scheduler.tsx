import { styled } from "styled-components";
import { useState } from "react";
import useCalendar from "@/customHook/useCalendar";

import ScheduleModal from "@components/Modal/ScheduleModal";
import { useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@redux/store";
import returnSchduleItemComponent from "@utills/returnScheduleItemComponent";
import SchedulerSingleWeek from "@components/Calender/SchedulerSingleWeek";

import Template from "@components/Template";

import { ScheduleType } from "@api/interface";
import Ellipsis from "@components/custom/Ellipsis";
import { getMemberAppliedRoles } from "@redux/memberRoles/memberRolesSlice";
import DayList from "@components/Calender/DayList";
import string2Int from "@utills/string2Int";
import { setScheduleDate } from "@redux/dateSlice";
import { DateSelctedType } from "@api/interface";

export default function SchedulerPage() {
  const DAYLIST_HEIGHT_PERCENT = 8;
  const dispatch = useDispatch<AppDispatch>();

  //모달창 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const selectedDateEvent = (elem: number) => {
    const dateNum = elem.toString();
    dispatch(setScheduleDate({ ...dateYM, dateNum }));
    openModal();
  };

  // 날짜 정보
  const dateYM = useSelector(
    (state: RootState) => state.date.selectedBySchedule,
  );
  const { year, month } = string2Int(dateYM);
  const weeklists = useCalendar(year, month);

  // 데이터
  const appliedListData = useSelector((state: RootState) => {
    return state.appliedRoles.getMemberApplies;
  });
  const appliedList = appliedListData.data;
  useEffect(() => {
    dispatch(getMemberAppliedRoles({ year, month }));
  }, [dispatch, year, month]);

  // OnlyScheduler
  // ! 최적화 필요
  const CheckGotJob = (dateNum: number) => {
    const ComponentList = [];

    const ShootJobList = appliedList.filter(
      (elem) =>
        elem.calender.startDateNum === dateNum ||
        (elem.calender.endDateNum >= dateNum &&
          elem.calender.startDateNum <= dateNum),
    );

    // 들어갈 수 있는 컴포넌트 수 2로 고정 추후 리팩토링
    for (let i = 0; i < ShootJobList.length; i++) {
      if (i == 2) {
        ComponentList.push(<Ellipsis />);
        break;
      }
      ComponentList.push(
        returnSchduleItemComponent(ScheduleType.SINGLE, ShootJobList[i]),
      );
    }

    return (
      <>
        {ComponentList.map((elem, idx) => {
          return <div key={idx}>{elem}</div>;
        })}
      </>
    );
  };

  return (
    <Template dateSelctedType={DateSelctedType.scheduler}>
      <Container $daylistHeight={DAYLIST_HEIGHT_PERCENT}>
        <Wrapper>
          <DayList
            HeightPercent={DAYLIST_HEIGHT_PERCENT}
            dateSelctedType={DateSelctedType.scheduler}
          />
          <DatesWrapper>
            {weeklists.map((item, key) => {
              return (
                <SchedulerSingleWeek
                  week={weeklists.length}
                  key={key}
                  item={item}
                  selectedDateEvent={selectedDateEvent}
                  CheckGotJob={CheckGotJob}
                />
              );
            })}
          </DatesWrapper>
        </Wrapper>
      </Container>

      {isModalOpen ? (
        <>
          <ModalOverlay
            ref={modalRef}
            onClick={(e) => {
              if (modalRef !== null && e.target === modalRef.current) {
                closeModal();
              }
            }}
          >
            <ScheduleModal selectedDateInfo={dateYM} closeModal={closeModal} />
          </ModalOverlay>
        </>
      ) : (
        <></>
      )}
    </Template>
  );
}

const DatesWrapper = styled.div``;

const Container = styled.div<{ $daylistHeight: number }>`
  width: 372px;
  height: 412px;
  border: 3px solid transparent;
  background-image: linear-gradient(#5d4900, #333333);
  background-origin: border-box;
  border-radius: 20px;

  font-size: 16px;
  font-weight: 900;
  line-height: 125%;
  letter-spacing: 0.16px;

  ${DatesWrapper} {
    height: ${(props) => `${100 - props.$daylistHeight}%`};
  }

  @media all and (max-width: 375px) {
    width: 300px;
    //스타일 설정
  }
`;

const Wrapper = styled.div`
  background-color: black;
  height: 100%;
  border-radius: 20px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

// // 추후
// const TestScheduleItem = styled.div<{ $dateCnt: number }>`
//   /* 스케줄표 border width 만큼 늘림 */
//   position: relative;
//   z-index: 2;
//   height: 20px;

//   width: ${(props) => `calc( 100% * ${props.$dateCnt})`};

//   justify-content: center;
//   justify-items: center;

//   background: #4f4f4f;
//   text-overflow: ellipsis;
//   overflow-y: hidden;
//   overflow-x: hidden;
//   text-overflow: ellipsis;

//   color: #a7a7a7;

//   font-size: 13px;
//   font-style: normal;
//   font-weight: 900;

//   &.approve {
//     background: #49e300;
//     color: #fff;
//   }
//   span {
//     width: 100%;
//   }
// `;
