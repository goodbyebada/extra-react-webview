import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  MemberRoleFront,
  ResponseStatus,
  ScheduleTypeStatusLabel,
  MemberRoleServer,
} from "@api/interface";
import { DateYearMonth } from "@api/dateInteface";
import memberRolesAPI from "@api/memberRolesAPI";
import converToDateObject from "@utills/convertToDateNum";
import { TEST_FLAG } from "@/testFlag";
import { memberRoleServerDummyList } from "@api/dummyData";

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

const convertServerInterfaceToFrontInterface = (
  arr: MemberRoleServer[],
): MemberRoleFront[] => {
  const myScheduledList = arr.map((elem: MemberRoleServer) => {
    const newElem: MemberRoleFront = {
      id: elem.id,
      jobPostId: elem.jobPostId,
      category: elem.category,
      title: elem.title,
      gatheringTime: elem.gatheringTime,
      calender: {
        startDateNum: converToDateObject(elem.calenderList[0].toString()),
        endDateNum: converToDateObject(
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
      a.calender.startDateNum - b.calender.startDateNum ||
      a.calender.endDateNum - b.calender.endDateNum,
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
  async ({ year, month }: DateYearMonth) => {
    let data: Promise<MemberRoleServer[]>;

    if (TEST_FLAG) {
      data = new Promise<MemberRoleServer[]>((resolve) =>
        setTimeout(() => {
          resolve(memberRoleServerDummyList);
        }, 2000),
      );
      return data;
    }

    data = await memberRolesAPI.getAllmemberRoles(year, month);
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
        state.getMemberApplies.data = [initDate];
        state.getMemberApplies.error = "";
      })
      .addCase(getMemberAppliedRoles.fulfilled, (state, action) => {
        state.getMemberApplies.status = ResponseStatus.fullfilled;
        state.getMemberApplies.data = convertServerInterfaceToFrontInterface(
          action.payload,
        );
        state.getMemberApplies.error = "";
      })
      .addCase(getMemberAppliedRoles.rejected, (state, action) => {
        state.getMemberApplies.status = ResponseStatus.rejected;
        state.getMemberApplies.data = [initDate];
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
