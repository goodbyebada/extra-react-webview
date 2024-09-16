import DateSelectorItem from "@components/calender/DateSelectorItem";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import string2Int from "@utills/string2Int";
import { useEffect } from "react";
import { DateSelctedType } from "@api/interface";
import { setHomeDate, setScheduleDate } from "@redux/dateSlice";

/**
 * 캘린더의 년 월 선택자
 * @returns
 */
export default function DateSelectorBar({
  dateSelctedType,
}: {
  dateSelctedType: string;
}) {
  // 2024 ~ 2053년(30년)
  const yearItemList = Array.from({ length: 30 }, (_, i) => 2024 + i);
  const monthItemList = Array.from({ length: 12 }, (_, i) => 1 + i);

  const dateYM = useSelector((state: RootState) => {
    if (dateSelctedType === DateSelctedType.home) {
      return state.date.selectedByHome;
    }
    return state.date.selectedBySchedule;
  });

  useEffect(() => {
    console.log("dateYM 변경");
    console.log(dateYM);
  }, [dateYM.year, dateYM.month]);

  const funcForDispatch = (elem: { month: string } | { year: string }) => {
    if (dateSelctedType === DateSelctedType.home) return setHomeDate(elem);
    return setScheduleDate(elem);
  };
  const { year, month } = string2Int(dateYM);

  return (
    <div className="date-selector-bar">
      <DateSelectorItem
        setFun={funcForDispatch}
        type="year"
        value={year}
        modalList={yearItemList}
      />

      <DateSelectorItem
        setFun={funcForDispatch}
        type="month"
        value={month + 1}
        modalList={monthItemList}
      />
    </div>
  );
}
