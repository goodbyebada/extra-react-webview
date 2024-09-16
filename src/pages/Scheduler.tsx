import { styled } from "styled-components";
import { useState } from "react";
import useCalendar from "@/customHook/useCalendar";
import DateSelectorBar from "@components/calender/DateSelectorBar";
import ScheduleModal from "@components/Modal/ScheduleModal";
import { useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@redux/store";
import returnSchduleItemComponent from "@utills/returnScheduleItemComponent";
import SchedulerSingleWeek from "@components/calender/SchedulerSingleWeek";

import {
  MemberRoleFront,
  ScheduleType,
  ScheduleTypeStatusLabel,
} from "@api/interface";
import Ellipsis from "@components/custom/Ellipsis";
import { getMemberAppliedRoles } from "@redux/memberRoles/memberRolesSlice";
import DayList from "@components/calender/DayList";

/**
 *
 * 보조출연자 달력
 *
 * 추후 수정 예정
 * 1. 스케줄러(일정)이 주가 다르게 연속으로 이어져있을때 UI fix
 * 2. 스케줄러 일정 map으로 컴포넌트 반환 로직 fix
 * status  에따라 에러 로딩 로직 추가
 *
 *
 *
 * 보조 출연자는 setData 접근하지 않는다 -> home이랑 날짜 분리 위해서
 * props로 전달한다
 */

export default function Scheduler() {
  const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];
  const dispatch = useDispatch<AppDispatch>();

  //모달창 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 모달창에 전달할 정보
  const [clicketCnt, setClickedCnt] = useState<number>(1);

  const date = new Date();
  const today = {
    year: date.getFullYear(),
    month: date.getMonth(),
  };

  /**
   * date.getMonth는 항상 원래 월보다 -1이다.
   * useCaleder에 들어가는 값도 원래  month보다 -1 이어야한다.
   */
  const [dateYM, setDateYM] = useState(today);
  const weeklists = useCalendar(dateYM.year, dateYM.month);
  const INIT_DATA = {
    year: today.year,
    month: today.month,
    dateNum: 0,
    dayOfWeek: "",
  };
  const [selectedDateInfo, setSelectedDateInfo] = useState(INIT_DATA);

  const dateHandler = (type: string, value: number) => {
    setDateYM((prev) => {
      return type === "month"
        ? { ...prev, [type]: value - 1 }
        : { ...prev, [type]: value };
    });
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const selectedDateEvent = (elem: number, idx: number) => {
    const selectedDateInfo = {
      year: dateYM.year,
      month: dateYM.month,
      dateNum: elem,
      dayOfWeek: DAY_LIST[idx % 7],
    };
    setSelectedDateInfo(selectedDateInfo);
    openModal();
  };

  const appliedListData = useSelector((state: RootState) => {
    return state.appliedRoles.getMemberApplies;
  });
  const appliedList = appliedListData.data;

  useEffect(() => {
    dispatch(getMemberAppliedRoles(dateYM));
  }, [dispatch, dateYM]);

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
    <Container>
      {/* 년도 월일 선택 바 */}
      <DateSelectorBar dateYM={dateYM} dateYMHandler={dateHandler} />
      {/* 캘린더 */}

      {appliedList[0].id > 0 ? (
        <CalenderContainer $daylistHeight={8}>
          <Wrapper>
            <DayList HeightPercent={8} />
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
        </CalenderContainer>
      ) : (
        "loading"
      )}

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
            <ScheduleModal
              selectedDateInfo={selectedDateInfo}
              closeModal={closeModal}
            />
          </ModalOverlay>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}

const DatesWrapper = styled.div``;

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  color: #fff;
  line-height: 142.857%;

  /* 드래그 방지  */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .date-selector-bar {
    /* 임의로  */
    font-size: 32px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

const CalenderContainer = styled.div<{ $daylistHeight: number }>`
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
