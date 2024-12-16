import { createSlice } from "@reduxjs/toolkit";
import { DateDetailedInfo } from "@api/dateInteface";
import { WEEK_DAY_LABELS } from "@components/mocules/WeekdayLabels";

const date = new Date();

const today: DateDetailedInfo = {
  year: date.getFullYear(),
  month: date.getMonth(),
  dateNum: date.getDate(),
  weekDayLabel: WEEK_DAY_LABELS[date.getDay()],
};

/**
 * 홈 화면, 사용자가 선택한 날짜 state
 */
const initialState = {
  selectedByHome: today,
  selectedBySchedule: today,
};

function setDetailedInfoBySelectedInfo(
  dateDetailedInfoByType: DateDetailedInfo,
  payload: any,
) {
  const { year, month, dateNum }: DateDetailedInfo = {
    ...dateDetailedInfoByType,
    ...payload,
  };

  const dayIdx = new Date(year, month, dateNum).getDay();
  const weekDayLabel = WEEK_DAY_LABELS[dayIdx];

  return { year, month, dateNum, weekDayLabel };
}

/**
 * month Data (실제 월) -1
 * month UI (Data.month + 1)로 통일
 */
const dateSlice = createSlice({
  name: "selectedDate",
  initialState,
  reducers: {
    setScheduleDate(state, action) {
      state.selectedBySchedule = setDetailedInfoBySelectedInfo(
        state.selectedBySchedule,
        action.payload,
      );
    },

    setHomeDate(state, action) {
      state.selectedByHome = setDetailedInfoBySelectedInfo(
        state.selectedByHome,
        action.payload,
      );
    },
  },
});

export const { setHomeDate, setScheduleDate } = dateSlice.actions;
export default dateSlice.reducer;
