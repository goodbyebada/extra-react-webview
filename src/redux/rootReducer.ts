import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 기본적으로 localStorage 사용

import modalReducer from "@redux/modalSlice";
import recruitReducer from "@redux/recruitSlice";
import homeSelectedDateReducer from "@redux/home/homeSelectedDateSlice";
import showTypeSliceReducer from "@redux/home/showTypeSlice";
import jobPostReducer from "@redux/jobPost/jobPostSlice";
import appliedRoleReducer from "@redux/memberRoles/memberRolesSlice";

// redux-persist를 사용한 데이터 유지를 위한 설정

const modalConfig = {
  key: "modal",
  storage,
  whitelist: ["modal"],
};

const recruitConfig = {
  key: "recruit",
  storage,
  whitelist: ["recruit", "star", "recruitStatus"],
};

const homeSelectedDateConfig = {
  key: "homeSelectedDate",
  storage,
  whitelist: ["homeSelectedDate", "year", "month", "dateNum", "dayOfWeek"],
};

const showTypeConfig = {
  key: "showType",
  storage,
  whitelist: ["showType"],
};

// 확인 필요
const jobPostConfig = {
  key: "jobPosts",
  storage,
  whitelist: ["jobPostAll", "jobPostItem"],
};

// 새로 추가된 appliedRole slice에 대한 persist 설정
const appliedRoleConfig = {
  key: "appliedRoles",
  storage,
  whitelist: ["data"], // 상태 중 유지하고자 하는 값만 설정
};

// reducer 통합
const rootReducer = combineReducers({
  modal: persistReducer(modalConfig, modalReducer),
  recruit: persistReducer(recruitConfig, recruitReducer),
  homeSelectedDate: persistReducer(
    homeSelectedDateConfig,
    homeSelectedDateReducer,
  ),
  showType: persistReducer(showTypeConfig, showTypeSliceReducer),
  jobPosts: persistReducer(jobPostConfig, jobPostReducer), // jobPostSlice 추가
  appliedRoles: persistReducer(appliedRoleConfig, appliedRoleReducer), // appliedRoleSlice 추가
});

export default rootReducer;
