import { styled } from "styled-components";
import useCalendar from "@/customHook/useCalendar";

import { JobPostList } from "@api/interface";
import { useDispatch, useSelector } from "react-redux";
import { setHomeDate } from "@redux/dateSlice";
import { AppDispatch, RootState } from "@redux/store";

import { CalenderTypeFor } from "@api/interface";
import { useEffect, useRef } from "react";
import { fetchJobPostByCalender } from "@redux/jobPost/jobPostSlice";
import DayList from "@components/calender/DayList";
import DateSelectorBar from "@components/calender/DateSelectorBar";
import HomeCalenderSingleWeek from "@components/calender/HomeCalenderSingleWeek";
import CalenderContainer from "@components/calender/CalenderContainer";
import string2Int from "@utills/string2Int";
import { DateSelctedType } from "@api/interface";
import Template from "@components/Template";

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
  const DAYLIST_HEIGHT_PERCENT = 8;
  const dispatch = useDispatch<AppDispatch>();

  // 날짜 정보
  const dateYM = useSelector((state: RootState) => state.date.selectedByHome);
  const { year, month } = string2Int(dateYM);
  useEffect(() => {
    dispatch(fetchJobPostByCalender({ year, month }));
  }, [dispatch, year, month]);
  const weeklists = useCalendar(year, month);

  // 데이터
  const gotJob = useSelector(
    (state: RootState) => state.jobPosts.jobPostByCalender,
  );
  const gotJobDataList = gotJob.data;

  // Only Calender
  const dateOnClick = (dateNum: number) => {
    const stringDate = dateNum.toString();
    const jobLength = gotJobDataList[stringDate].length;

    if (!jobLength) return;

    if (jobLength > 0) {
      const dateNum = stringDate;
      dispatch(setHomeDate(dateNum));
      clickedDateEvent();
    }
  };

  return (
    <Template dateSelctedType={DateSelctedType.home}>
      {/* 캘린더 컨테이너의 캘린더(달력) */}
      <Container>
        <DayList
          HeightPercent={DAYLIST_HEIGHT_PERCENT}
          dateSelctedType={DateSelctedType.home}
        />

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
    </Template>
  );
}

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
