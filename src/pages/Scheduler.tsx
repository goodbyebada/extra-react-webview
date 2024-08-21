import { styled } from "styled-components";
import { useState } from "react";
import useCalendar from "@utills/useCalendar";
import DateSelectorItem from "@components/DateSelectorItem";
import ScheduleModal from "@components/Modal/ScheduleModal";
import { useRef } from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { AppDispatch } from "@redux/store";
import returnSchduleItemComponent from "@utills/returnScheduleItemComponent";

import { MemberRoleFront, ScheduleType } from "@api/interface";
import { memberRoleFrontDummyData } from "@api/dummyData";
import Ellipsis from "@components/custom/Ellipsis";
import { GetToken } from "@api/GetToken";
import { getMemberAppliedRoles } from "@redux/memberRoles/memberRolesSlice";

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
  let i = -1;

  /**
   * 임시
   */
  const yearItemList = Array.from({ length: 6 }, (_, i) => 2024 + i);
  const monthItemList = Array.from({ length: 12 }, (_, i) => 1 + i);

  const dateHandler = (type: string, value: number) => {
    setDateYM((prev) => {
      return type === "month"
        ? { ...prev, [type]: value - 1 }
        : { ...prev, [type]: value };
    });
    setClickedCnt((prev) => prev + 1);
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
    return state.appliedRoles.getMemberApplies.data;
  });

  const appliedList =
    appliedListData[0].id <= 0 ? memberRoleFrontDummyData : appliedListData;

  // 날짜 바꿀때마다 get 요청
  useEffect(() => {
    // YEAR , MONTH로 요청 보냈을떄 그에 대한 값만 준다는 가정, 백에 문의해봐야함
    // 임시처리

    /**
     * test 코드 삭제해야함
     */
    if (!localStorage.getItem("token")) {
      GetToken(0);
    }

    dispatch(getMemberAppliedRoles(dateYM));
  }, [clicketCnt]);

  const CheckGotJob = (dateNum: number) => {
    // 계속 순회중 추후 리팩토링 필요
    // 오름차순 정렬이니까

    const ComponentList = [];
    const convertedList: MemberRoleFront[] = appliedList.sort(
      (a: MemberRoleFront, b: MemberRoleFront) =>
        a.calender.startDateNum - b.calender.startDateNum,
    );

    const ShootJobList = convertedList.filter(
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

      <div className="date-selector">
        <DateSelectorItem
          type="year"
          value={dateYM.year}
          modalList={yearItemList}
          dateHandler={dateHandler}
        />
        <DateSelectorItem
          type="month"
          value={dateYM.month + 1}
          modalList={monthItemList}
          dateHandler={dateHandler}
        />
      </div>

      {/* 캘린더 */}
      <CalenderContainer className="calender-container" $daylistHeight={8}>
        <div className="calender-wrapper">
          <div className="day-list">
            {DAY_LIST.map((elem, key) => {
              return (
                <span className="day-item" key={key}>
                  {elem}
                </span>
              );
            })}
          </div>

          <div className="dates">
            {weeklists.map((item, key) => {
              i++;
              return (
                <Week key={key} $weekcnt={weeklists.length} className="week">
                  {item.map((elem, key) => {
                    if (!elem) {
                      return <div key={key + i * 7} className="date"></div>;
                    }

                    return (
                      <div
                        className="date"
                        key={key + i * 7}
                        onClick={() => selectedDateEvent(elem, key)}
                      >
                        <div id="date-num">{!elem ? "" : elem}</div>
                        {CheckGotJob(elem)}
                      </div>
                    );
                  })}
                </Week>
              );
            })}
          </div>
        </div>
      </CalenderContainer>

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

  .date-selector {
    /* 임의로  */
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

  .calender-wrapper {
    background-color: black;
    height: 100%;
    border-radius: 20px;
  }

  .day-list {
    display: flex;
    height: ${(props) => `${props.$daylistHeight}%`};

    .day-item {
      border-right: solid 2px #333;
      width: calc(100% / 7);
      box-sizing: border-box;

      display: flex;
      justify-content: center;
      align-items: center;

      &:first-child {
        color: #ff0000;
      }

      &:last-child {
        border-right: 0;
        color: #0038ff;
      }
    }
  }

  .dates {
    height: ${(props) => `${100 - props.$daylistHeight}%`};
    overflow-y: hidden;
  }
`;

const Week = styled.div<{ $weekcnt: number }>`
  display: flex;
  border-top: solid 2px #333;
  height: ${(props) => `calc(100% / ${props.$weekcnt})`};
  box-sizing: border-box;
  width: 100%;

  .date {
    position: relative;
    /* width: var(--__dateWidth); */
    width: var(--__dateWidth);

    box-sizing: border-box;
    border: none;
    border-right: solid 2px #333;
    background-color: transparent;

    font-weight: 900;
    overflow-y: hidden;
    > * {
      box-sizing: border-box;
    }

    &:last-child {
      border-right: 0;
    }

    #date-num {
      height: 20px;
      /* width: 100%; */
      padding-top: ${(props) => (props.$weekcnt > 5 ? "0em" : "0.3em")};
      padding-left: 0.3em;
      text-align: left;
      color: #fff;
      box-sizing: content-box;
    }
  }
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
