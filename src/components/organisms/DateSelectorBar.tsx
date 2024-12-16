// import DateSelectorButton from "@components/calender/DateSelectorItem";
import DateSelectorButton from "@components/mocules/DateSelectorButton";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

import { setHomeDate, setScheduleDate } from "@redux/dateSlice";
import { DateDetailedInfo, DateSelctedType } from "@api/dateInteface";
import { styled } from "styled-components";

/**
 *
 * @param dateSelctedType : 스케줄 표 || home calender
 * @param yearsAhead 현재 년도 기준으로 +n년 후 까지 설정
 * @returns
 */
export default function DateSelectorBar({
  dateSelctedType,
  yearsAhead,
}: {
  dateSelctedType: string;
  yearsAhead: number;
}) {
  const yearItemList = Array.from({ length: yearsAhead }, (_, i) => 2024 + i);
  const monthItemList = Array.from({ length: 12 }, (_, i) => 1 + i);

  const dateDetailedInfo: DateDetailedInfo = useSelector((state: RootState) => {
    if (dateSelctedType === DateSelctedType.home) {
      return state.date.selectedByHome;
    }
    return state.date.selectedBySchedule;
  });

  const setDateActionByType = (elem: { month: number } | { year: number }) => {
    if (dateSelctedType === DateSelctedType.home) return setHomeDate(elem);
    return setScheduleDate(elem);
  };

  return (
    <TopWrapper>
      <DateSelectorButton
        setDateActionByType={setDateActionByType}
        type="year"
        value={dateDetailedInfo.year}
        modalList={yearItemList}
      />

      <DateSelectorButton
        setDateActionByType={setDateActionByType}
        type="month"
        value={dateDetailedInfo.month + 1}
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
