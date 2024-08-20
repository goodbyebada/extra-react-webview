import { styled } from "styled-components";
import useCalendar from "@utills/useCalendar";
import DateSelectorItem from "@components/DateSelectorItem";
import { JobPostList } from "@api/interface";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "@redux/home/homeSelectedDateSlice";
import { RootState } from "@redux/store";

type dateYM = {
  year: number;
  month: number;
};

type CalenderProps = {
  dateYM: dateYM;
  dateYMHandler: (type: string, value: number) => void;
  jobPostList?: JobPostList;
  showRecommand: boolean;
  clickedDateEvent: () => void;
};

/**
 * @param param0 CalenderProps
 * @returns 사용자/ 업체 홈 화면 캘린더 UI
 */

//수정 사항 추후 삭제
// merge 과정에서 오류로 인해 commit이 안되는 문제 발생. error, warning 부분 주석 처리 후 임시 작성.
// jobPostList 주석처리
// let -> const 수정
// Array.from v,i

/**
 * status에 따른 분기처리 yet
 */

export default function Calender({
  dateYM,
  dateYMHandler,
  showRecommand,
  clickedDateEvent,
}: CalenderProps) {
  const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];

  const gotJob = useSelector(
    (state: RootState) => state.jobPosts.jobPostByCalender,
  );
  const gotJobDataList = gotJob.data;

  const weeklists = useCalendar(dateYM.year, dateYM.month);

  let i = -1;

  // 2024 ~ 2053년(30년)
  const yearItemList = Array.from({ length: 30 }, (_, i) => 2024 + i);
  const monthItemList = Array.from({ length: 12 }, (_, i) => 1 + i);

  const dateOnClick = (dateNum: number, key: number) => {
    const stringDate = dateNum.toString();
    const jobLength = gotJobDataList[stringDate].length;

    if (!jobLength) {
      return;
    }
    if (jobLength > 0) {
      const data = {
        year: dateYM.year.toString(),
        month: (dateYM.month + 1).toString(),
        dateNum: dateNum.toString(),
        dayOfWeek: DAY_LIST[key % 7],
      };
      dispatch(setDate(data));
      clickedDateEvent();
    }
  };

  const dispatch = useDispatch();

  return (
    <Container>
      {/* 년도 월일 선택 바 */}
      <DateSelector>
        <DateSelectorItem
          type="year"
          value={dateYM.year}
          modalList={yearItemList}
          dateHandler={dateYMHandler}
        />
        <DateSelectorItem
          type="month"
          value={dateYM.month + 1}
          modalList={monthItemList}
          dateHandler={dateYMHandler}
        />
      </DateSelector>

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
                        className={`date ${!gotJobDataList[elem] ? "" : "got-drama"} ${showRecommand ? "recommand" : ""}`}
                        key={key + i * 7}
                        onClick={() => dateOnClick(elem, key)}
                      >
                        <div id="date-num">{elem}</div>
                        {!gotJobDataList[elem] ||
                        gotJobDataList[elem].length <= 0 ? (
                          ""
                        ) : (
                          <div id="drama-num">
                            {gotJobDataList[elem].length}
                          </div>
                        )}
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
`;

const DateSelector = styled.div`
  margin-bottom: 30px;
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
