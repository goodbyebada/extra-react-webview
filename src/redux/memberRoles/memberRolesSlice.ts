// appliedRoleSlice.ts (또는 js 파일)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseStatus } from "@api/interface";
import { MemberRole } from "@api/interface";
import memberRolesAPI from "@api/memberRolesAPI";

// 초기 상태
const initialState = { status: "", data: [{}], error: "" };

// [회원]: 역할 전체 조회
export const getMemberAppliedRoles = createAsyncThunk<MemberRole[]>(
  "member/getMyAppliedRoles",
  async () => {
    const data = await memberRolesAPI.getAllmemberRoles();
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
        state.data = action.payload;
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
