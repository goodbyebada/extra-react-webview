import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jobPostAPI from "@api/jobPostAPI";
import { JobPost, JobPostList } from "@api/interface";
import { ResponseStatus } from "@api/interface";

// 상태의 타입 정의
export interface JobPostState {
  jobPostAll: {
    status: string;
    data: JobPostList;
    error: string;
  };
  jobPostItem: {
    status: string;
    data: JobPost;
    error: string;
  };
}

const defaultJobPost: JobPost = {
  id: -1,
  title: "",
  gatheringLocation: "",
  gatheringTime: "",
  imageUrl: "",
  status: false,
  hourPay: -1,
  category: "",
  companyName: "",
  scheduleIdList: [],
  calenderList: [],
  roleIdList: [],
  roleNameList: [],
  costumeList: [[]], // 빈 배열을 감싼 배열로 초기화
  sexList: [],
  roleAgeList: [[]], // 빈 배열을 감싼 배열로 초기화
  limitPersonnelList: [],
  currentPersonnelList: [],
  seasonList: [],
  checkTattooList: [],
};

// 초기 상태
const initialState: JobPostState = {
  jobPostAll: { status: "", data: [], error: "" },
  jobPostItem: { status: "", data: defaultJobPost, error: "" },
};

// 모든 공고를 가져오는 GET 요청
export const fetchAllJobPosts = createAsyncThunk<JobPostList>(
  "jobPosts/fetchAll",
  async () => {
    const data = await jobPostAPI.getAllJobPost();
    return data;
  },
);

// 특정 공고를 가져오는 GET 요청 (id 필요)
export const fetchJobPostById = createAsyncThunk<JobPost, number>(
  "jobPosts/fetchById",
  async (id: number) => {
    const data = await jobPostAPI.getJobPostById(id);
    return data;
  },
);

const jobPostSlice = createSlice({
  name: "jobPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobPosts.pending, (state) => {
        state.jobPostAll.status = ResponseStatus.loading;
        state.jobPostAll.error = "";
      })
      .addCase(fetchAllJobPosts.fulfilled, (state, action) => {
        state.jobPostAll.status = ResponseStatus.fullfilled;
        state.jobPostAll.data = action.payload;
        state.jobPostAll.error = "";
      })
      .addCase(fetchAllJobPosts.rejected, (state, action) => {
        state.jobPostAll.status = ResponseStatus.rejected;

        // action.error.message는 API에서 전달된 에러 메시지를 포함
        state.jobPostAll.error =
          action.error.message || "Failed to fetch all job posts";
      });

    builder
      .addCase(fetchJobPostById.pending, (state) => {
        state.jobPostItem.status = ResponseStatus.loading;
      })
      .addCase(fetchJobPostById.fulfilled, (state, action) => {
        state.jobPostItem.status = ResponseStatus.fullfilled;
        state.jobPostItem.data = action.payload;
      })
      .addCase(fetchJobPostById.rejected, (state, action) => {
        state.jobPostItem.status = ResponseStatus.rejected;
        state.jobPostItem.error =
          action.error.message ||
          `Failed to fetch job post with id ${action.meta.arg}`;
      });
  },
});

export default jobPostSlice.reducer;
