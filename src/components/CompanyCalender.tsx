import { styled } from "styled-components";
import useCalendar from "@/customHook/useCalendar";
import DateSelectorItem from "@components/calender/DateSelectorItem";

import { useDispatch, useSelector } from "react-redux";
import { setHomeDate } from "@redux/dateSlice";
import { AppDispatch, RootState } from "@redux/store";
import { dateYM } from "@api/interface";
import { CalenderTypeFor } from "@api/interface";
import { useEffect } from "react";

import { ResponseStatus } from "@api/interface";
import Loading from "@components/Loading";
import NotFoundPage from "@pages/Error/NotFound";
import { fetchJobPostByCalenderForCom } from "@redux/company/companyJobPostSlice";

type CalenderProps = {
  type?: CalenderTypeFor;
  dateYM: dateYM;
  dateYMHandler: (type: string, value: number) => void;
  showRecommand: boolean;
  clickedDateEvent: () => void;
};

/**
 * @param param0 CalenderProps
 * @returns 사용자/ 업체 홈 화면 캘린더 UI
 */

/**
 * status에 따른 분기처리 yet
 */

export default function CompanyCalender({
  dateYM,
  dateYMHandler,
  showRecommand,
  clickedDateEvent,
}: CalenderProps) {
  const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];

  const dispatch = useDispatch<AppDispatch>();
  const gotJob = useSelector(
    (state: RootState) => state.companyJobpost.jobPostByCalenderForCom,
  );
  const gotJobDataList = gotJob.data;

  useEffect(() => {
    dispatch(fetchJobPostByCalenderForCom(dateYM));
  }, [dispatch, dateYM]);

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
      dispatch(setHomeDate(data));
      clickedDateEvent();
    }
  };

  // 인피니트 스크롤링 관련

  const Component = () => {
    switch (gotJob.status) {
      case ResponseStatus.loading:
        return <Loading loading={true} />;

      case ResponseStatus.rejected:
        return <NotFoundPage />;

      case ResponseStatus.fullfilled:
        return (
          <>
            <Container>
              {/* 년도 월일 선택 바 */}
              <DateSelector>
                <DateSelectorItem
                  type="year"
                  value={dateYM.year}
                  modalList={yearItemList}
                />
                <DateSelectorItem
                  type="month"
                  value={dateYM.month + 1}
                  modalList={monthItemList}
                />
              </DateSelector>

              {/* 캘린더 */}
              <CalenderContainer
                className="calender-container"
                $daylistHeight={8}
              >
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
                        <Week
                          $weekcnt={weeklists.length}
                          className="week"
                          key={key}
                        >
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
          </>
        );

      default:
        return;
    }
  };

  return <>{Component()}</>;
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
  @media all and (max-width: 375px) {
    width: 300px;
    //스타일 설정
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

  @media all and (max-width: 375px) {
    .date {
      width: 40px;
      height: 40px;
    }
    #drama-num {
      left: 20px !important;
      bottom: 25px !important;
      width: 20px !important;
      height: 20px !important;
      font-size: 13px !important;
    }
    #date-num {
      font-size: 16px !important;
    }
  }
`;
