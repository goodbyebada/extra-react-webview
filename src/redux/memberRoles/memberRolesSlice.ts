import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  MemberRoleFront,
  ResponseStatus,
  ScheduleTypeStatusLabel,
} from "@api/interface";
import { MemberRoleServer } from "@api/interface";
import memberRolesAPI from "@api/memberRolesAPI";
import gatheringTimeString from "@utills/returnGaterInfo";

const initDate: MemberRoleFront = {
  id: -1,
  jobPostId: -1,
  category: "",
  title: "",
  gatheringTime: "", //시간
  gatheringLocation: "",
  companyName: "",
  status: ScheduleTypeStatusLabel.DEFAULT,
  calender: {
    startDateNum: -1,
    endDateNum: -1,
  },
};

const Convert = (arr: MemberRoleServer[]): MemberRoleFront[] => {
  const myScheduledList = arr.map((elem: MemberRoleServer) => {
    const newElem: MemberRoleFront = {
      id: elem.id,
      jobPostId: elem.jobPostId,
      category: elem.category,
      title: elem.title,
      gatheringTime: gatheringTimeString(elem.gatheringTime),
      calender: {
        startDateNum: elem.calenderList[0],
        endDateNum: elem.calenderList[elem.calenderList.length - 1],
      },
      gatheringLocation: elem.gatheringLocation,
      companyName: elem.name,
      status: elem.applyStatus,
    };
    return newElem;
  });

  // dateNum 기준으로 오름차순 정렬
  myScheduledList.sort(
    (a: MemberRoleFront, b: MemberRoleFront) =>
      a.calender.startDateNum - b.calender.startDateNum,
  );

  return myScheduledList;
};

// 초기 상태
const initialState = { status: "", data: [initDate], error: "" };

// [회원]: 역할 전체 조회
export const getMemberAppliedRoles = createAsyncThunk(
  "member/getMyAppliedRoles",
  async ({ year, month }: { year: number; month: number }) => {
    const data = await memberRolesAPI.getAllmemberRoles(year, month);
    console.log(`data 반환 : ${data}`);
    return data;
  },
);

const appliedRoleSlice = createSlice({
  name: "appliedRoles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMemberAppliedRoles.pending, (state) => {
        state.status = ResponseStatus.loading;
        state.error = "";
      })
      .addCase(getMemberAppliedRoles.fulfilled, (state, action) => {
        state.status = ResponseStatus.fullfilled;
        console.log(action.payload.data);
        state.data = Convert(action.payload.data);
        state.error = "";
      })
      .addCase(getMemberAppliedRoles.rejected, (state, action) => {
        state.status = ResponseStatus.rejected;
        state.error = action.error.message || "Failed to fetch all job posts";
      });
  },
});

// `appliedRoleSlice.reducer`를 export
export default appliedRoleSlice.reducer;
