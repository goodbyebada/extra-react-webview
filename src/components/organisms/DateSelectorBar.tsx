// import DateSelectorButton from "@components/calender/DateSelectorItem";
import DateSelectorButton from "@components/mocules/DateSelectorButton";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import convertYearMonthStringToInt from "@utills/parsedDateInfoToInt";

import { setHomeDate, setScheduleDate } from "@redux/dateSlice";
import {
  DateDetailedInfoByString,
  DateSelctedType,
  YearMonthAsNumber,
} from "@api/dateInteface";
import { styled } from "styled-components";

/**
 * 캘린더의 년 월 선택자
 * @returns
 *
 * HomeCalender, Scheduler 같이 사용하고 있음
 * 둘 다 CalenderWrapper 컴포넌트 (HomeCalender, Scheduler) childeren으로 컴포넌트가 들어가고
 * type을 주입 받아, type에 따라 전에 선택했던 날짜를 불러온다 인줄 알앗는데 아님
 * TODO redux 다시 확인할 것
 */

// TODO dispatch
export default function DateSelectorBar({
  dateSelctedType,
}: {
  dateSelctedType: string;
}) {
  // 2024 ~ 2053년(30년)
  const yearItemList = Array.from({ length: 30 }, (_, i) => 2024 + i);
  const monthItemList = Array.from({ length: 12 }, (_, i) => 1 + i);

  const dateDetailedInfoByString: DateDetailedInfoByString = useSelector(
    (state: RootState) => {
      if (dateSelctedType === DateSelctedType.home) {
        return state.date.selectedByHome;
      }
      return state.date.selectedBySchedule;
    },
  );

  const setDateActionByType = (elem: { month: string } | { year: string }) => {
    if (dateSelctedType === DateSelctedType.home) return setHomeDate(elem);
    return setScheduleDate(elem);
  };

  const yearMonthAsNumber: YearMonthAsNumber = convertYearMonthStringToInt(
    dateDetailedInfoByString.year,
    dateDetailedInfoByString.month,
  );

  return (
    <TopWrapper>
      <DateSelectorButton
        setDateActionByType={setDateActionByType}
        type="year"
        value={yearMonthAsNumber.year}
        modalList={yearItemList}
      />

      <DateSelectorButton
        setDateActionByType={setDateActionByType}
        type="month"
        value={yearMonthAsNumber.month + 1}
        modalList={monthItemList}
      />
    </TopWrapper>
  );
}

const TopWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  line-height: 142.857%;
`;
