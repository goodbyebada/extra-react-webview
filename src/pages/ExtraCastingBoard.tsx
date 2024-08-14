import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@redux/store";

import { fetchJobPostById } from "@redux/jobPost/jobPostSlice";
import { AppDispatch } from "@redux/store";
import { Loading } from "@components/Loading";
import { Err } from "@components/Err";

import ExtraCastsComponent from "@components/ExtraCastsCopmponent";
import { ResponseStatus } from "@api/interface";

/**
 *
 * @returns 공고화면 UI
 */

/**
 * 단건 조회할 예정
 */
export default function ExtraCastingBoard() {
  const { jobPostId } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const jobPostItem = useSelector(
    (state: RootState) => state.jobPosts.jobPostItem,
  );

  useEffect(() => {
    // 서버에서 데이터를 불러오는 createAsyncThunk 호출
    console.log("SDfs");

    const fetch = () => {
      if (jobPostId !== undefined && jobPostId !== null) {
        dispatch(fetchJobPostById(parseInt(jobPostId)));
      }
    };

    fetch();
  }, [dispatch, jobPostId]);

  const selectedJobPostItem = jobPostItem.data;
  console.log(jobPostItem);

  return !(jobPostItem.status === ResponseStatus.fullfilled) ? (
    jobPostItem.status === ResponseStatus.loading ? (
      <Loading />
    ) : (
      <Err />
    )
  ) : (
    <ExtraCastsComponent selectedJobPostItem={selectedJobPostItem} />
  );
}
