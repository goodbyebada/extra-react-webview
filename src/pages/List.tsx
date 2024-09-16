import { useState, useEffect } from "react";
// import { useRef } from "react";
import { styled } from "styled-components";
import { JobPost } from "@api/interface";
import { dateYM } from "@api/interface";
import HomeRecruitBox from "@components/HomeRecruitBox";
import { ResponseStatus } from "@api/interface";
import Loading from "@components/Loading";
import NotFoundPage from "@pages/Error/NotFound";
import { sendMessage } from "@api/utils";
// import jobPostAPI from "@api/jobPostAPI";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { fetchJobPostByList } from "@redux/jobPost/jobPostSlice";
import string2Int from "@utills/string2Int";

type ListProps = {
  dateYM?: dateYM;
  showRecommand: boolean;
};

export default function List({ showRecommand }: ListProps) {
  const [pageNum, setPageNum] = useState(0);
  const dateYM = useSelector((state: RootState) => state.date);
  // const [localJobPost, setLocalJobPost] = useState<JobPost[]>([]);
  // const [status, setStatus] = useState<ResponseStatus>(ResponseStatus.loading);
  // const [hasMore, setHasMore] = useState(true);
  // const isFetching = useRef(false); // 추가된 변수: fetch 중복 방지용

  const navigateToExtraCastingBoard = (elem: JobPost) => {
    const path = `/extra-casting-board/${elem.id}`;
    sendMessage({
      type: "NAVIGATION_DETAIL",
      payload: {
        uri: path,
      },
      version: "1.0",
    });
    // navigate(path);
  };

  // const fetchJobPosts = async () => {
  //   if (isFetching.current) return; // fetch 중이면 중복 실행 방지
  //   isFetching.current = true;

  //   try {
  //     const data = await jobPostAPI.getAllJobPostByList(
  //       dateYM.year,
  //       dateYM.month,
  //       pageNum,
  //     );

  //     if (data.length === 0) {
  //       setHasMore(false);
  //     } else {
  //       const filteredData = data.filter(
  //         (newPost: JobPost) =>
  //           !localJobPost.some(
  //             (existingPost) => existingPost.id === newPost.id,
  //           ),
  //       );
  //       setLocalJobPost((prev) => [...prev, ...filteredData]);
  //       setPageNum((prev) => prev + 1);
  //     }
  //     setStatus(ResponseStatus.fullfilled);
  //   } catch (error) {
  //     setStatus(ResponseStatus.rejected);
  //   } finally {
  //     isFetching.current = false; // fetch가 끝난 후 false로 설정
  //   }
  // };

  // useEffect(() => {
  //   if (hasMore && !isFetching.current) {
  //     fetchJobPosts();
  //   }
  // }, [dateYM, pageNum, hasMore]);

  const dispatch = useDispatch<AppDispatch>();
  const jobPost = useSelector(
    (state: RootState) => state.jobPosts.jobPostByList,
  );
  const localJobPost = jobPost.data;

  useEffect(() => {
    const { year, month } = string2Int(dateYM);
    dispatch(fetchJobPostByList({ year, month, pageNum }));
    setPageNum((prev) => prev + 1);
  }, [dispatch, dateYM]);

  const renderComponent = () => {
    switch (jobPost.status) {
      case ResponseStatus.loading:
        return <Loading loading={true} />;

      case ResponseStatus.rejected:
        return <NotFoundPage />;

      case ResponseStatus.fullfilled:
        return (
          <ItemWrapper>
            {localJobPost.map((elem: JobPost, key: number) => (
              <HomeRecruitBox
                navigate={() => navigateToExtraCastingBoard(elem)}
                key={key}
                recruitInfo={elem}
                recommand={showRecommand}
              />
            ))}
          </ItemWrapper>
        );

      default:
        return null;
    }
  };

  return <>{renderComponent()}</>;
}

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;
