import { styled } from "styled-components";

import useCalendar from "../utills/useCalendar";

import { useState } from "react";
import DateSelector from "./DateSelector";

/**
 * 보조출연자 달력
 */

export default function Calender() {
  const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];

  /**임시변수  */
  const num = 3;
  const gotDrama = true;

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

  const dateHandler = (type: string, value: number) => {
    setDateYM((prev) => {
      return type === "month"
        ? { ...prev, [type]: value - 1 }
        : { ...prev, [type]: value };
    });
  };

  return (
    <Container>
      {/* 년도 월일 선택 바 */}

      <div className="date-selector">
        <DateSelector
          type="year"
          value={dateYM.year}
          modalList={yearItemList}
          dateHandler={dateHandler}
        />
        <DateSelector
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
                      return (
                        <div
                          key={key + i * 7}
                          className="date"
                          style={{ visibility: "hidden" }}
                        ></div>
                      );
                    }
                    return (
                      <div
                        className="date got-drama recommand"
                        key={key + i * 7}
                        onClick={() => {
                          console.log("moved");
                        }}
                      >
                        <div id="date-num">{elem}</div>
                        {gotDrama ? <div id="drama-num">{num}</div> : ""}
                      </div>
                    );
                  })}
                </Week>
              );
            })}
          </div>
        </div>
      </CalenderContainer>
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
    margin-bottom: 30px;
  }
`;

const CalenderContainer = styled.div<{ $daylistHeight: number }>`
  width: 372px;
  height: 412px;

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
      width: calc(100% / 7);
      box-sizing: border-box;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .dates {
    height: ${(props) => `${100 - props.$daylistHeight}%`};
  }
`;

const Week = styled.div<{ $weekcnt: number }>`
  display: flex;
  height: ${(props) => `calc(100% / ${props.$weekcnt})`};
  box-sizing: border-box;
  width: 100%;
  color: white;
  justify-content: space-between;
  gap: 7px;

  .date {
    position: relative;
    /* width: calc(100% / 7); */
    justify-content: center;
    display: flex;
    align-self: center;
    align-items: center;

    width: 47px;
    height: 47px;
    box-sizing: border-box;

    /* 추천 X, 일정 X일때의 기본 set */

    color: #3d3d3d;
    border-radius: 50%;
    border: 2px solid #3d3d3d;
    background-color: #212121;

    border-image-slice: 1;
    background-origin: border-box;
    background-clip: content-box, border-box;

    &.got-drama {
      color: #fff;
      border: 2px solid transparent;
      background-image: linear-gradient(
          rgba(33, 33, 33, 1),
          rgba(33, 33, 33, 1)
        ),
        linear-gradient(rgba(61, 61, 61, 1), rgba(163, 163, 163, 1));

      &.recommand {
        background-image: linear-gradient(
            rgba(33, 33, 33, 1),
            rgba(33, 33, 33, 1)
          ),
          linear-gradient(rgba(61, 61, 61, 1), rgba(245, 192, 1, 1));
      }
    }

    #drama-num {
      position: absolute;
      left: 29px;
      bottom: 32px;
      border-radius: 50%;
      background-color: #f00;
      width: 24px;
      height: 24px;

      text-align: center;

      font-size: 16px;
      line-height: 125%;
      letter-spacing: 0.16px;
    }

    #date-num {
      text-align: center;
      font-size: 24px;
      font-weight: 900;
      line-height: 20px;
      letter-spacing: 0.01em;
    }

    > * {
      box-sizing: border-box;
    }
  }
`;
