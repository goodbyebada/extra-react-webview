import DateSelectorItem from "@components/calender/DateSelectorItem";
import { dateYM } from "@api/interface";
import { styled } from "styled-components";

type selectorProps = {
  dateYM: dateYM;
  dateYMHandler: (type: string, value: number) => void;
};

export default function DateSelectorBar({
  dateYM,
  dateYMHandler,
}: selectorProps) {
  // 2024 ~ 2053년(30년)
  const yearItemList = Array.from({ length: 30 }, (_, i) => 2024 + i);
  const monthItemList = Array.from({ length: 12 }, (_, i) => 1 + i);

  return (
    <div className="date-selector-bar">
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
    </div>
  );
}
