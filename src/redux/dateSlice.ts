import { createSlice } from "@reduxjs/toolkit";

const date = new Date();
const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];

/**
 * 홈 화면, 사용자가 선택한 날짜 state
 */
const initialState = {
  year: date.getFullYear().toString(),
  month: date.getMonth().toString(),
  dateNum: date.getDay().toString(),
  dayOfWeek: DAY_LIST[date.getDay()],
};

/**
 * month Data (실제 월) -1
 * month UI (Data.month + 1)로 통일
 */
const dateSlice = createSlice({
  name: "selectedDate",
  initialState,
  reducers: {
    setDate(state, action) {
      const { year, month, dateNum } = action.payload;
      const dayIdx = new Date(year, month, dateNum).getDay();
      const dayOfWeek = DAY_LIST[dayIdx];

      return {
        ...state,
        ...action.payload,
        dayOfWeek, // 새로운 값으로 덮어쓰기
      };
    },
  },
});
export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;
