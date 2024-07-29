import { createSlice } from "@reduxjs/toolkit";
import star_g from "../assets/Star_g.png";
import star_y from "../assets/Star_y.png";

const recruitSlice = createSlice({
  name: "recruit",
  initialState: {
    star: star_g,
    swiped: false,
    recruitStatus: {
      pending: true, //추후 false로 수정
      rejected: false,
      approved: false,
    },
  },
  reducers: {
    toggleStar(state) {
      state.star = state.star === star_g ? star_y : star_g;
    },
    toggleSwipe(state) {
      state.swiped = !state.swiped;
    },
    setRecruitStatus(state, action) {
      const { status, visible } = action.payload;
      state.recruitStatus[status] = visible;
    },
  },
});

export const { toggleStar, toggleSwipe, setRecruitStatus } =
  recruitSlice.actions;
export default recruitSlice.reducer;
