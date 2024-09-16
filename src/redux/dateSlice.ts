import { createSlice } from "@reduxjs/toolkit";

const date = new Date();
const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];

const today = {
  year: date.getFullYear().toString(),
  month: date.getMonth().toString(),
  dateNum: date.getDate().toString(), // getDay() 대신 getDate() 사용
  dayOfWeek: DAY_LIST[date.getDay()],
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
      const dayOfWeek = DAY_LIST[dayIdx];

      console.log(action.payload);

      state.selectedBySchedule = {
        year,
        month,
        dateNum,
        dayOfWeek,
      };
    },
    setHomeDate(state, action) {
      let { year, month, dateNum } = action.payload;

      year = !year ? state.selectedByHome.year : year;
      month = !month ? state.selectedByHome.month : month;
      dateNum = !dateNum ? state.selectedByHome.dateNum : dateNum;

      const dayIdx = new Date(year, month, dateNum).getDay();
      const dayOfWeek = DAY_LIST[dayIdx];

      state.selectedByHome = {
        year,
        month,
        dateNum,
        dayOfWeek,
      };
    },
  },
});

// 액션 이름 수정
export const { setHomeDate, setScheduleDate } = dateSlice.actions;
export default dateSlice.reducer;
