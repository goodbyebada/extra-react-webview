import DateSelectorItem from "@components/calender/DateSelectorItem";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import string2Int from "@utills/string2Int";
import { useEffect } from "react";

export default function DateSelectorBar() {
  // 2024 ~ 2053년(30년)
  const yearItemList = Array.from({ length: 30 }, (_, i) => 2024 + i);
  const monthItemList = Array.from({ length: 12 }, (_, i) => 1 + i);

  const dateYM = useSelector((state: RootState) => state.date);
  const { year, month } = string2Int(dateYM);

  return (
    <div className="date-selector-bar">
      <DateSelectorItem type="year" value={year} modalList={yearItemList} />

      <DateSelectorItem
        type="month"
        value={month + 1}
        modalList={monthItemList}
      />
    </div>
  );
}
