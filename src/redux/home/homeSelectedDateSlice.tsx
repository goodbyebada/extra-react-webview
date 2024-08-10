import { createSlice } from "@reduxjs/toolkit";

// interface StateType {
//   year: string;
//   month: string;
//   dateNum: string;
//   dayOfWeek: string;
// }

/**
 * 홈 화면, 사용자가 선택한 날짜 state
 */
const initialState = {
  year: "",
  month: "",
  dateNum: "",
  dayOfWeek: "",
};

const homeSelectedDateSlice = createSlice({
  name: "homeSelectedDate",
  initialState,
  reducers: {
    setDate(state, action) {
      return {
        ...state,
        ...action.payload, // 새로운 값으로 덮어쓰기
      };
    },
  },
});
export const { setDate } = homeSelectedDateSlice.actions;
export default homeSelectedDateSlice.reducer;
