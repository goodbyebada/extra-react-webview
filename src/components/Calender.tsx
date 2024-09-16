import { styled } from "styled-components";
import useCalendar from "@/customHook/useCalendar";

import { JobPostList } from "@api/interface";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "@redux/home/homeSelectedDateSlice";
import { AppDispatch, RootState } from "@redux/store";
import { dateYM } from "@api/interface";
import { CalenderTypeFor } from "@api/interface";
import { useEffect } from "react";
import { fetchJobPostByCalender } from "@redux/jobPost/jobPostSlice";
import DayList from "@components/calender/DayList";
import DateSelectorBar from "@components/calender/DateSelectorBar";

import HomeCalenderSingleWeek from "@components/calender/HomeCalenderSingleWeek";
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
  const dispatch = useDispatch<AppDispatch>();
  const gotJob = useSelector(
    (state: RootState) => state.jobPosts.jobPostByCalender,
  );
  const gotJobDataList = gotJob.data;
  useEffect(() => {
    dispatch(fetchJobPostByCalender(dateYM));
  }, [dispatch, dateYM]);

  const weeklists = useCalendar(dateYM.year, dateYM.month);

  const dateOnClick = (dateNum: number, key: number) => {
    const stringDate = dateNum.toString();
    const jobLength = gotJobDataList[stringDate].length;

    if (!jobLength) {
      return;
    }
    if (jobLength > 0) {
      /**
       * !DayList 없앴는데 굳이?
       */
      const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];
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

  // 요일 리스트 높이 비율
  const DAYLIST_HEIGHT_PERCENT = 8;

  return (
    <>
      <CalenderContainer>
        {/* 년도 월일 선택 바 */}
        <TopWrapper>
          <DateSelectorBar dateYM={dateYM} dateYMHandler={dateYMHandler} />
        </TopWrapper>

        {/* 캘린더 컨테이너의 캘린더(달력) */}
        <Container>
          <DayList HeightPercent={DAYLIST_HEIGHT_PERCENT} />
          <DatesWrapper $HeightPercent={DAYLIST_HEIGHT_PERCENT}>
            {weeklists.map((item, key) => {
              return (
                <HomeCalenderSingleWeek
                  key={key}
                  height={weeklists.length}
                  item={item}
                  gotJobDataList={gotJobDataList}
                  dateOnClick={dateOnClick}
                  showRecommand={showRecommand}
                />
              );
            })}
          </DatesWrapper>
        </Container>
      </CalenderContainer>
    </>
  );
}

const TopWrapper = styled.div`
  margin-bottom: 10px;

  /* DateSelectorBar fontstyle */
  font-size: 24px;
  font-style: normal;
  font-weight: 900;
  line-height: 20px; /* 83.333% */
  letter-spacing: 0.24px;
`;

const DatesWrapper = styled.div<{ $HeightPercent: number }>`
  height: ${({ $HeightPercent }) => `calc(100% - ${$HeightPercent}%)`};
`;

const Container = styled.div`
  background-color: black;
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
