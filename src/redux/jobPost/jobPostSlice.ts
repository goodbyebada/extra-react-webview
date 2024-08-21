import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jobPostAPI from "@api/jobPostAPI";
import { JobPost, JobPostList } from "@api/interface";
import { ResponseStatus } from "@api/interface";
import { QueryType } from "@api/interface";

// 상태의 타입 정의

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
  costumeList: [], // 빈 배열을 감싼 배열로 초기화
  sexList: [],
  roleAgeList: [], // 빈 배열을 감싼 배열로 초기화
  limitPersonnelList: [],
  currentPersonnelList: [],
  seasonList: [],
  checkTattooList: [],
};

type ObjectType = {
  [key: string]: number[];
};

function transformAndSortDates(input: ObjectType): ObjectType {
  const transformedObject: ObjectType = {};

  for (const date in input) {
    const day = date.split("-")[2]; // "YYYY-MM-DD"에서 "DD" 추출
    transformedObject[day] = input[date];
  }

  const sortedKeys = Object.keys(transformedObject).sort(
    (a, b) => Number(a) - Number(b),
  );

  const sortedObject: ObjectType = {};
  for (const key of sortedKeys) {
    sortedObject[key] = transformedObject[key];
  }

  return sortedObject;
}

export interface JobPostState {
  jobPostByCalender: {
    status: string;
    data: ObjectType;
    error: string;
  };
  jobPostItem: {
    status: string;
    data: JobPost;
    error: string;
  };
}

const initdata: ObjectType = {
  "-1": [],
};

// 초기 상태
const initialState: JobPostState = {
  jobPostByCalender: { status: "", data: initdata, error: "" },
  jobPostItem: { status: "", data: defaultJobPost, error: "" },
};

/**
 * 캘린더에서 JobPost를 가져온다.
 */
export const fetchJobPostByCalender = createAsyncThunk(
  "jobPosts/fetchAll",
  async ({ year, month }: QueryType) => {
    const data = await jobPostAPI.getAllJobPostByCalender(year, month);
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
      .addCase(fetchJobPostByCalender.pending, (state) => {
        state.jobPostByCalender.status = ResponseStatus.loading;
        state.jobPostByCalender.error = "";
      })
      .addCase(fetchJobPostByCalender.fulfilled, (state, action) => {
        state.jobPostByCalender.status = ResponseStatus.fullfilled;
        state.jobPostByCalender.data = transformAndSortDates(action.payload);

        state.jobPostByCalender.error = "";
      })
      .addCase(fetchJobPostByCalender.rejected, (state, action) => {
        state.jobPostByCalender.status = ResponseStatus.rejected;

        // action.error.message는 API에서 전달된 에러 메시지를 포함
        state.jobPostByCalender.error =
          action.error.message || "Failed to fetch all job posts";
      });

    builder
      .addCase(fetchJobPostById.pending, (state) => {
        state.jobPostItem.status = ResponseStatus.loading;

        // 초기화
        state.jobPostItem.data = defaultJobPost;
      })
      .addCase(fetchJobPostById.fulfilled, (state, action) => {
        state.jobPostItem.status = ResponseStatus.fullfilled;

        state.jobPostItem.data = action.payload;
      })
      .addCase(fetchJobPostById.rejected, (state, action) => {
        state.jobPostItem.status = ResponseStatus.rejected;
        // 초기화
        state.jobPostItem.data = defaultJobPost;

        state.jobPostItem.error =
          action.error.message ||
          `Failed to fetch job post with id ${action.meta.arg}`;
      });
  },
});

export default jobPostSlice.reducer;
