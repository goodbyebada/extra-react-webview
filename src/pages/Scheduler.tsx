import { styled } from "styled-components";
import { useState } from "react";
import useCalendar from "@utills/useCalendar";
import DateSelectorItem from "@components/DateSelectorItem";
import ScheduleModal from "@components/modal/ScheduleModal";

/**
 *
 * 보조출연자 달력
 *
 * 추후 수정 예정
 * 1. 스케줄러(일정)이 주가 다르게 연속으로 이어져있을때 UI fix
 * 2. 스케줄러 일정 map으로 컴포넌트 반환 로직 fix
 */

export default function Scheduler() {
  const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
  let i = -1;

  /**
   * 임시
   */
  const yearItemList = Array.from({ length: 6 }, (v, i) => 2024 + i);
  const monthItemList = Array.from({ length: 12 }, (v, i) => 1 + i);

  // test 위해 임시 구현 11일 ~ 14일동안 진행되는 드라마 공고
  const dummyCalender = [
    { startDay: 11, endDay: 14, approve: true },
    { startDay: 15, endDay: 15, aprrove: false },
  ];

  const dateHandler = (type: string, value: number) => {
    setDateYM((prev) => {
      return type === "month"
        ? { ...prev, [type]: value - 1 }
        : { ...prev, [type]: value };
    });
  };

  /**
   *
   * 미완성 임시 구현
   *
   * @param date 일
   * @param title 드라마 제목
   * @returns 스케줄 표시 item
   */
  const returnSchduleItemComponent = (date: number, title: string) => {
    for (const obj of dummyCalender) {
      const approve = obj.approve;

      if (date == obj.startDay && date === obj.endDay) {
        return (
          <SingleScheduleItem className={`${approve ? "approve" : ""} `}>
            {title}
          </SingleScheduleItem>
        );
      }
      if (date == obj.startDay) {
        return <StartScheduleItem className={`${approve ? "approve" : ""} `} />;
      }
      if (date === obj.endDay) {
        return <EndScheduleItem className={`${approve ? "approve" : ""} `} />;
      }
      if (Math.ceil((obj.startDay + obj.endDay) / 2) === date) {
        return (
          <ScheduleItem className={`${approve ? "approve" : ""} `}>
            {title}
          </ScheduleItem>
        );
      }
      if (obj.startDay < date && date < obj.endDay) {
        return <ScheduleItem className={`${approve ? "approve" : ""} `} />;
      }
    }
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
                <Week $weekcnt={weeklists.length} className="week" key={key}>
                  {item.map((elem, key) => {
                    if (!elem) {
                      return <div key={key + i * 7} className="date"></div>;
                    }

                    return (
                      <div
                        className="date"
                        key={key + i * 7}
                        onClick={openModal}
                      >
                        <div id="date-num">{!elem ? "" : elem}</div>
                        {returnSchduleItemComponent(elem, "title")}
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
          <ScheduleModal closeModal={closeModal} />
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
  }
`;

const Week = styled.div<{ $weekcnt: number }>`
  display: flex;
  border-top: solid 2px #333;
  height: ${(props) => `calc(100% / ${props.$weekcnt})`};
  box-sizing: border-box;
  width: 100%;

  .date {
    width: calc(100% / 7);
    box-sizing: border-box;
    border: none;
    border-right: solid 2px #333;
    background-color: transparent;

    font-weight: 900;

    > * {
      box-sizing: border-box;
    }

    &:last-child {
      border-right: 0;
    }

    #date-num {
      width: 100%;
      padding-top: ${(props) => (props.$weekcnt > 5 ? "0em" : "0.3em")};
      padding-left: 0.3em;
      text-align: left;
      color: #fff;
    }
  }
`;

const ScheduleItem = styled.div`
  /* 스케줄표 border width 만큼 늘림 */
  z-index: 2;
  width: calc(100% + 2px);
  height: 17px;

  display: flex;
  justify-content: center;
  justify-items: center;
  text-align: center;

  background: #4f4f4f;

  /* margin: 3px; */

  color: #a7a7a7;
  text-align: center;

  font-size: 13px;
  font-style: normal;
  font-weight: 900;
  line-height: 153.846%;
  letter-spacing: 0.13px;

  position: relative;

  #drama-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    text-align: center;
  }

  &.approve {
    background: #49e300;
    color: #fff;
  }

  /* 시작하는 날 css */
  .start {
  }

  /* 끝나는 날 css */
  .end {
  }
`;

const StartScheduleItem = styled(ScheduleItem)`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const EndScheduleItem = styled(ScheduleItem)`
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const SingleScheduleItem = styled(ScheduleItem)`
  border-radius: 20px;
`;
