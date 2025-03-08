import { useState, useEffect } from "react";
// import { useRef } from "react";
import { styled } from "styled-components";
import { AuthType, JobPost, ResponseStatus } from "@type/shared";
import { AUTH_TYPE_CONST } from "@constants/const";
import { DateYearMonth } from "@type/dateInteface";
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
import { useNavigate } from "react-router-dom";
import Loading from "@components/Loading";
import NotFoundPage from "@pages/Error/NotFound";
import { fetchJobPostByListForCom } from "@redux/company/companyJobPostSlice";

type ListProps = {
  dateYearMonth: DateYearMonth;
  showRecommand: boolean;
  authType: AuthType;
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

  const navigateToExtraCastingBoard = (elem: JobPost) => {
    const path = `/extra-casting-board/${elem.id}`;
    navigate(path);
  };

  const dispatch = useDispatch<AppDispatch>();

  const isCompany = (authType: string) => {
    return authType === AUTH_TYPE_CONST.COMPANY;
  };

  const jobPost = useSelector((state: RootState) => {
    if (isCompany(authType)) {
      return state.companyJobpost.jobPostByListForCom;
    }
    return state.jobPosts.jobPostByList;
  });

  useEffect(() => {
    const { year, month } = dateYearMonth;
    if (isCompany(authType)) {
      dispatch(fetchJobPostByListForCom({ year, month, pageNum }));
    } else {
      dispatch(fetchJobPostByList({ year, month, pageNum }));
    }

    setPageNum((prev) => prev + 1);
  }, [dispatch, dateYM, dateYearMonth]);

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
