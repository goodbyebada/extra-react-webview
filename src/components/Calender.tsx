import { styled } from "styled-components";
import useCalendar from "@utills/useCalendar";

import DateSelectorItem from "@components/calender/DateSelectorItem";
import { JobPostList } from "@api/interface";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "@redux/home/homeSelectedDateSlice";
import { AppDispatch, RootState } from "@redux/store";
import { dateYM } from "@api/interface";
import { CalenderTypeFor } from "@api/interface";
import { useEffect } from "react";
import { fetchJobPostByCalender } from "@redux/jobPost/jobPostSlice";
import { ResponseStatus } from "@api/interface";
import Loading from "@components/Loading";
import NotFoundPage from "@pages/Error/NotFound";

import SingleWeek from "@components/calender/SingleWeek";
import CalenderContainer from "@components/calender/CalenderContainer";

type CalenderProps = {
  type?: CalenderTypeFor;
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

export default function Calender({
  dateYM,
  dateYMHandler,
  showRecommand,
  clickedDateEvent,
}: CalenderProps) {
  const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];

  const dispatch = useDispatch<AppDispatch>();
  const gotJob = useSelector(
    (state: RootState) => state.jobPosts.jobPostByCalender,
  );
  const gotJobDataList = gotJob.data;
  useEffect(() => {
    dispatch(fetchJobPostByCalender(dateYM));
  }, [dispatch, dateYM]);

  const weeklists = useCalendar(dateYM.year, dateYM.month);

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

  /**
   * Response Status에 따른 분기 처리
   * @returns
   */
  const Component = () => {
    switch (gotJob.status) {
      case ResponseStatus.loading:
        return <Loading loading={true} />;

      case ResponseStatus.rejected:
        return <NotFoundPage />;

      case ResponseStatus.fullfilled:
        return (
          <>
            <CalenderContainer>
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
              <ContentContainer className="calender-container">
                <ContentWrapper>
                  <DayList $daylistHeight={8}>
                    {DAY_LIST.map((elem, key) => {
                      return (
                        <span className="item" key={key}>
                          {elem}
                        </span>
                      );
                    })}
                  </DayList>

                  <Dates>
                    {weeklists.map((item, key) => {
                      return (
                        <SingleWeek
                          key={key}
                          height={weeklists.length}
                          item={item}
                          gotJobDataList={gotJobDataList}
                          dateOnClick={dateOnClick}
                          showRecommand={showRecommand}
                        />
                      );
                    })}
                  </Dates>
                </ContentWrapper>
              </ContentContainer>
            </CalenderContainer>
          </>
        );

      default:
        return;
    }
  };

  return <>{Component()}</>;
}

const DateSelector = styled.div`
  margin-bottom: 10px;
`;

const ContentContainer = styled.div`
  width: 372px;
  height: 430px;

  font-size: 16px;
  font-weight: 900;
  line-height: 125%;
  letter-spacing: 0.16px;

  @media all and (max-width: 375px) {
    width: 300px;
    //스타일 설정
  }
`;

const ContentWrapper = styled.div`
  background-color: black;
  height: 100%;
  border-radius: 20px;
`;

const DayList = styled.div<{ $daylistHeight: number }>`
  display: flex;
  height: ${(props) => `${props.$daylistHeight}%`};

  .item {
    width: calc(100% / 7);
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Dates = styled.div`
  height: 92%;
`;
