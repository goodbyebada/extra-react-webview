import { createSlice } from "@reduxjs/toolkit";

// interface StateType {
//   year: string;
//   month: string;
//   dateNum: string;
//   weekOfDay: string;
// }

const initialState = {
  year: "",
  month: "",
  dateNum: "",
  weekOfDay: "",
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
