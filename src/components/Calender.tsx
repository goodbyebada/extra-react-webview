import { styled } from "styled-components";
import useCalendar from "@/customHook/useCalendar";

import { JobPostList } from "@api/interface";
import { useDispatch, useSelector } from "react-redux";
import { setHomeDate } from "@redux/dateSlice";
import { AppDispatch, RootState } from "@redux/store";

import { CalenderTypeFor } from "@api/interface";
import { useEffect } from "react";
import { fetchJobPostByCalender } from "@redux/jobPost/jobPostSlice";
import DayList from "@components/calender/DayList";
import DateSelectorBar from "@components/calender/DateSelectorBar";
import HomeCalenderSingleWeek from "@components/calender/HomeCalenderSingleWeek";
import CalenderContainer from "@components/calender/CalenderContainer";
import string2Int from "@utills/string2Int";
import { DateSelctedType } from "@api/interface";

type CalenderProps = {
  type?: CalenderTypeFor;
  jobPostList?: JobPostList;
  showRecommand: boolean;
  clickedDateEvent: () => void;
};

/**
 *
 * @param param0 CalenderProps
 * @returns 사용자/ 업체 홈 화면 캘린더 UI
 */

export default function Calender({
  showRecommand,
  clickedDateEvent,
}: CalenderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const gotJob = useSelector(
    (state: RootState) => state.jobPosts.jobPostByCalender,
  );

  const dateYM = useSelector((state: RootState) => state.date.selectedByHome);
  const { year, month } = string2Int(dateYM);
  const gotJobDataList = gotJob.data;

  useEffect(() => {
    console.log(dateYM);
    console.log(dateYM);
  }, []);

  useEffect(() => {
    dispatch(
      fetchJobPostByCalender({
        year,
        month,
      }),
    );
  }, [dispatch, year, month]);

  const weeklists = useCalendar(year, month);

  const dateOnClick = (dateNum: number) => {
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
      };
      dispatch(setHomeDate(data));
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
          <DateSelectorBar dateSelctedType={DateSelctedType.home} />
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
