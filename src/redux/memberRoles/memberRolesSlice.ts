import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  MemberRoleFront,
  ResponseStatus,
  ScheduleTypeStatusLabel,
} from "@api/interface";
import { MemberRoleServer } from "@api/interface";
import memberRolesAPI from "@api/memberRolesAPI";
import convertToDateNum from "@utills/convertToDateNum";
import { dateYM } from "@api/interface";

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
    console.log(elem.calenderList[0]);
    const newElem: MemberRoleFront = {
      id: elem.id,
      jobPostId: elem.jobPostId,
      category: elem.category,
      title: elem.title,
      gatheringTime: elem.gatheringTime,
      calender: {
        startDateNum: convertToDateNum(elem.calenderList[0].toString()),
        endDateNum: convertToDateNum(
          elem.calenderList[elem.calenderList.length - 1].toString(),
        ),
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
const initialState = {
  getMemberApplies: { status: "", data: [initDate], error: "" },
  appliedRole: { status: "", error: "" },
};

// [회원]: 역할 전체 조회
export const getMemberAppliedRoles = createAsyncThunk(
  "member/getMyAppliedRoles",
  async ({ year, month }: dateYM) => {
    const data = await memberRolesAPI.getAllmemberRoles(year, month);

    return data;
  },
);

export const appliedRole = createAsyncThunk(
  "member/postMyAppliedRoles",
  async (roleId: number) => {
    const data = await memberRolesAPI.postMemberRoles(roleId);

    return data;
  },
);

export const appliedRoleSlice = createSlice({
  name: "appliedRoles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMemberAppliedRoles.pending, (state) => {
        state.getMemberApplies.status = ResponseStatus.loading;
        state.getMemberApplies.error = "";
      })
      .addCase(getMemberAppliedRoles.fulfilled, (state, action) => {
        state.getMemberApplies.status = ResponseStatus.fullfilled;
        console.log(action.payload);
        state.getMemberApplies.data = Convert(action.payload);
        state.getMemberApplies.error = "";
      })
      .addCase(getMemberAppliedRoles.rejected, (state, action) => {
        state.getMemberApplies.status = ResponseStatus.rejected;
        state.getMemberApplies.error =
          action.error.message || "Failed to fetch all job posts";
      });

    builder
      .addCase(appliedRole.pending, (state) => {
        state.appliedRole.status = ResponseStatus.loading;
      })
      .addCase(appliedRole.fulfilled, (state) => {
        state.appliedRole.status = ResponseStatus.fullfilled;
      })
      .addCase(appliedRole.rejected, (state, action) => {
        state.appliedRole.status = ResponseStatus.rejected;

        // 초기화
        state.appliedRole.error =
          action.error.message ||
          `Failed to fetch job post with id ${action.meta.arg}`;
      });
  },
});

// `appliedRoleSlice.reducer`를 export
export default appliedRoleSlice.reducer;
