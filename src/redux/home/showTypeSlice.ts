import { createSlice } from "@reduxjs/toolkit";

// init set 전체, 캘린더로 보기
const initialState = {
  showRecommand: false,
  showAsCalender: true,
};

const showTypeSlice = createSlice({
  name: "showType",
  initialState,
  reducers: {
    setTypetoggle: (state) => {
      state.showRecommand = !state.showRecommand;
    },
    setTypeShow: (state) => {
      state.showAsCalender = !state.showAsCalender;
    },
  },
});

export const { setTypetoggle, setTypeShow } = showTypeSlice.actions;

export default showTypeSlice.reducer;
