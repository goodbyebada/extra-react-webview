import { useState, useEffect } from "react";
// import { useRef } from "react";
import { styled } from "styled-components";
import { JobPost, ResponseStatus } from "@/type/shared";
import { DateYearMonth } from "@/type/dateInteface";
import HomeRecruitBox from "@components/HomeRecruitBox";
// import { ResponseStatus } from "@api/interface";
// import Loading from "@components/Loading";
// import NotFoundPage from "@pages/Error/NotFound";
// import { sendMessage } from "@api/utils";
// import jobPostAPI from "@api/jobPostAPI";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { fetchJobPostByList } from "@redux/jobPost/jobPostSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "@components/Loading";
import NotFoundPage from "@pages/Error/NotFound";

type ListProps = {
  dateYearMonth: DateYearMonth;
  showRecommand: boolean;
  authType: "company" | "member";
};

// TODO 인피니트 스크롤링 적요
export default function List({
  dateYearMonth,
  showRecommand,
  authType,
}: ListProps) {
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

  // TODO company member에 따라 분기 처리 필요함
  const jobPost = useSelector((state: RootState) =>
    authType === "member"
      ? state.jobPosts.jobPostByList
      : state.companyJobpost.jobPostByListForCom,
  );

  useEffect(() => {
    const { year, month } = dateYearMonth;
    dispatch(fetchJobPostByList({ year, month, pageNum }));
    setPageNum((prev) => prev + 1);
  }, [dispatch, dateYM]);

  // // TODO ResponseStatus 에 따른 분기처리 모듈화할 것
  const Component = () => {
    switch (jobPost.status) {
      case ResponseStatus.loading:
        return <Loading loading={true} />;

      case ResponseStatus.fullfilled:
        return (
          <ItemWrapper>
            {jobPost.data.map((elem: JobPost, key: number) => (
              <HomeRecruitBox
                navigate={() => navigateToExtraCastingBoard(elem)}
                key={key}
                recruitInfo={elem}
                recommand={showRecommand}
              />
            ))}
          </ItemWrapper>
        );
      case ResponseStatus.rejected:
        return <NotFoundPage />;
    }
  };

  return <>{Component()}</>;
}

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;
