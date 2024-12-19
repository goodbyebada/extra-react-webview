import { useState, useEffect } from "react";
// import { useRef } from "react";
import { styled } from "styled-components";
import { JobPost } from "@api/interface";
import { DateYearMonth } from "@api/dateInteface";
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
import { useNavigate } from "react-router-dom";

type ListProps = {
  dateYearMonth: DateYearMonth;
  showRecommand: boolean;
};

export default function List({ dateYearMonth, showRecommand }: ListProps) {
  const [pageNum, setPageNum] = useState(0);
  const dateYM = useSelector((state: RootState) => state.date);
  const navigate = useNavigate();
  // const [localJobPost, setLocalJobPost] = useState<JobPost[]>([]);
  // const [status, setStatus] = useState<ResponseStatus>(ResponseStatus.loading);
  // const [hasMore, setHasMore] = useState(true);
  // const isFetching = useRef(false); // 추가된 변수: fetch 중복 방지용

  const navigateToExtraCastingBoard = (elem: JobPost) => {
    const path = `/extra-casting-board/${elem.id}`;
    navigate(path);
  };

  const dispatch = useDispatch<AppDispatch>();
  const jobPost = useSelector(
    (state: RootState) => state.jobPosts.jobPostByList,
  );
  const localJobPost = jobPost.data;

  useEffect(() => {
    const { year, month } = dateYearMonth;
    dispatch(fetchJobPostByList({ year, month, pageNum }));
    setPageNum((prev) => prev + 1);
  }, [dispatch, dateYM]);

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
}

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;
