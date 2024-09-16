import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jobPostAPI from "@api/jobPostAPI";
import { JobPost } from "@api/interface";
import { ResponseStatus } from "@api/interface";
import { dateYM, QuryTypesWithPage } from "@api/interface";
import { ObjectType } from "@api/interface";
import { dummyCalenderData } from "@api/dummyData";
import { TEST_FLAG } from "@/testFlag";

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
  tattooList: [],
};

function transformAndSortDates(input: ObjectType): ObjectType {
  const transformedObject: ObjectType = {};

  for (const date in input) {
    const day = parseInt(date.split("-")[2]); // "YYYY-MM-DD"에서 "DD" 추출
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
  jobPostByList: {
    status: string;
    data: JobPost[];
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
  jobPostByList: { status: "", data: [defaultJobPost], error: "" },
  jobPostItem: { status: "", data: defaultJobPost, error: "" },
};

/**
 * 캘린더에서 보여줄 JobPost(공고 리스트)를 data를 가져온다.
 */
export const fetchJobPostByCalender = createAsyncThunk<
  ObjectType,
  { year: number; month: number }
>("jobPosts/fetchAllbyCalender", async ({ year, month }: dateYM) => {
  let data: Promise<ObjectType>;

  if (TEST_FLAG) {
    console.log(`${year} ${month + 1}의 TEST용입니다`);
    data = new Promise<ObjectType>((resolve) =>
      setTimeout(() => {
        resolve(dummyCalenderData);
      }, 2000),
    );
    return data;
  }

  data = await jobPostAPI.getAllJobPostByCalender(year, month);
  return data;
});

/**
 * 리스트로보기용 JobPost를 가져온다.
 */
export const fetchJobPostByList = createAsyncThunk(
  "jobPosts/fetchAllbyList",
  async ({ year, month, pageNum }: QuryTypesWithPage) => {
    const data = await jobPostAPI.getAllJobPostByList(year, month, pageNum);
    console.log(`pageNum:${pageNum}`);
    console.log(`data`);

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
        state.jobPostByCalender.data = initdata;
        state.jobPostByCalender.error = "";
      })
      .addCase(fetchJobPostByCalender.fulfilled, (state, action) => {
        state.jobPostByCalender.status = ResponseStatus.fullfilled;

        state.jobPostByCalender.data = transformAndSortDates(action.payload);
        state.jobPostByCalender.error = "";
      })
      .addCase(fetchJobPostByCalender.rejected, (state, action) => {
        state.jobPostByCalender.status = ResponseStatus.rejected;
        state.jobPostByCalender.data = initdata;
        // action.error.message는 API에서 전달된 에러 메시지를 포함
        state.jobPostByCalender.error =
          action.error.message || "Failed to fetch all job posts";
      });

    /**
     * [{}]값이 하나만 오고 있다.
     */
    builder
      .addCase(fetchJobPostByList.pending, (state) => {
        state.jobPostByList.status = ResponseStatus.loading;
        state.jobPostByList.error = "";
      })
      .addCase(fetchJobPostByList.fulfilled, (state, action) => {
        state.jobPostByList.status = ResponseStatus.fullfilled;
        state.jobPostByList.data = action.payload;
        state.jobPostByList.error = "";
      })
      .addCase(fetchJobPostByList.rejected, (state, action) => {
        state.jobPostByList.status = ResponseStatus.rejected;

        // action.error.message는 API에서 전달된 에러 메시지를 포함
        state.jobPostByList.error =
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
