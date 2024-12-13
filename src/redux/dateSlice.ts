import { createSlice } from "@reduxjs/toolkit";
import { DateDetailedInfoByString } from "@api/dateInteface";
import { WEEK_DAY_LABELS } from "@components/mocules/WeekdayLabels";

const date = new Date();

const today: DateDetailedInfoByString = {
  year: date.getFullYear().toString(),
  month: date.getMonth().toString(),
  dateNum: date.getDate().toString(), // getDay() 대신 getDate() 사용
  weekDayName: WEEK_DAY_LABELS[date.getDay()],
};

/**
 * 홈 화면, 사용자가 선택한 날짜 state
 */
const initialState = {
  selectedByHome: today,
  selectedBySchedule: today,
};

/**
 * month Data (실제 월) -1
 * month UI (Data.month + 1)로 통일
 */
const dateSlice = createSlice({
  name: "selectedDate",
  initialState,
  reducers: {
    setScheduleDate(state, action) {
      let { year, month, dateNum } = action.payload;

      year = !year ? state.selectedByHome.year : year;
      month = !month ? state.selectedByHome.month : month;
      dateNum = !dateNum ? state.selectedByHome.dateNum : dateNum;

      const dayIdx = new Date(year, month, dateNum).getDay();
      const weekDayName = WEEK_DAY_LABELS[dayIdx];

      state.selectedBySchedule = {
        year,
        month,
        dateNum,
        weekDayName,
      };
    },

    setHomeDate(state, action) {
      console.log(action.payload);
      let { year, month, dateNum } = action.payload;

      year = !year ? state.selectedByHome.year : year;
      month = !month ? state.selectedByHome.month : month;
      dateNum = !dateNum ? state.selectedByHome.dateNum : dateNum;

      const dayIdx = new Date(year, month, dateNum).getDay();
      const weekDayName = WEEK_DAY_LABELS[dayIdx];

      state.selectedByHome = {
        year,
        month,
        dateNum,
        weekDayName,
      };
    },
  },
});

// 액션 이름 수정
export const { setHomeDate, setScheduleDate } = dateSlice.actions;
export default dateSlice.reducer;
