import { styled } from "styled-components";
import useCalendar from "@/customHook/useCalendar";

import { JobPostList } from "@api/interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";

import { useEffect, useState } from "react";
import { fetchJobPostByCalender } from "@redux/jobPost/jobPostSlice";
import { CalendarWeekdayLabels } from "@components/mocules/WeekdayLabels";
import HomeCalendarWeek from "@components/mocules/calender/HomeCalendarWeek";
import convertYearMonthStringToInt from "@utills/parsedDateInfoToInt";
import { CalenderTypeFor, DateSelctedType } from "@api/dateInteface";
import CalenderWrapper from "@components/CalenderWrapper";
import { CALENDER_SIZE } from "@/styled/size";
import { ObjectType } from "@api/dateInteface";
import { DateDetailedInfoByString } from "@api/dateInteface";
import { fetchJobPostByCalenderForCom } from "@redux/company/companyJobPostSlice";

type CalenderProps = {
  type: CalenderTypeFor;
  jobPostList?: JobPostList;
  showRecommand: boolean;
  clickedDateEvent: (dateNum: number, key: number) => void;
  gotJobDataList: ObjectType;
};

/**
 *
 * @param param0 CalenderProps
 * @returns 사용자/ 업체 홈에서 쓰이는  dateSelector을 포함한 화면 캘린더 UI
 *
 * - UI로서의 역할
 * - 나머지 데이터는 부모 컴포넌트로부터 넘겨받는다.
 */

export default function HomeCalendar({
  type,
  showRecommand,
  clickedDateEvent,
  gotJobDataList,
}: CalenderProps) {
  const [weekLists, setWeekList] = useState<number[][]>([[]]);
  const { daylistHeigtPersent: daylist_heigth_persent } = CALENDER_SIZE;

  const dispatch = useDispatch<AppDispatch>();

  // 날짜 정보
  const dateDetailedInfoByString: DateDetailedInfoByString = useSelector(
    (state: RootState) => state.date.selectedByHome,
  );

  const { year, month } = convertYearMonthStringToInt(
    dateDetailedInfoByString.year,
    dateDetailedInfoByString.month,
  );

  // 데이터 요청
  useEffect(() => {
    if (type === CalenderTypeFor.user) {
      dispatch(fetchJobPostByCalender({ year, month }));
    }

    if (type === CalenderTypeFor.company) {
      console.log("호출");
      dispatch(fetchJobPostByCalenderForCom({ year, month }));
    }
  }, [dispatch, year, month]);

  // TODO 그냥 상수 사용했을때랑 차이가 있는가?
  useEffect(() => {
    setWeekList(useCalendar(year, month));
  }, [year, month]);

  return (
    <CalenderWrapper dateSelctedType={DateSelctedType.home}>
      <Container>
        <CalendarWeekdayLabels HeightPercent={daylist_heigth_persent} />
        <DatesWrapper $HeightPercent={daylist_heigth_persent}>
          {weekLists.map((item, key) => {
            return (
              <HomeCalendarWeek
                key={key}
                height={weekLists.length}
                item={item}
                gotJobDataList={gotJobDataList}
                dateOnClick={clickedDateEvent}
                showRecommand={showRecommand}
              />
            );
          })}
        </DatesWrapper>
      </Container>
    </CalenderWrapper>
  );
}

const DatesWrapper = styled.div<{ $HeightPercent: number }>`
  height: ${({ $HeightPercent }) => `calc(100% - ${$HeightPercent}%)`};
`;

// TODO 어디에 분리해야하는가?
const Container = styled.div`
  background-color: black;
  width: 372px;
  height: 430px;

  font-size: 16px;
  font-weight: 900;
  line-height: 125%;
  letter-spacing: 0.16px;
`;
