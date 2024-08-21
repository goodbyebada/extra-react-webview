import HomeRecruitBox from "@components/HomeRecruitBox";
import { styled } from "styled-components";
import { JobPost } from "@api/interface";
import { dateYM } from "@api/interface";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { useEffect } from "react";
import { fetchJobPostByList } from "@redux/jobPost/jobPostSlice";
import { ResponseStatus } from "@api/interface";
import Loading from "@components/Loading";
import NotFoundPage from "@pages/Error/NotFound";

type ListProps = {
  dateYM: dateYM;
  showRecommand: boolean;
};

export default function List({ dateYM, showRecommand }: ListProps) {
  // 리스트 보기 선택시 navigate

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const jobPost = useSelector(
    (state: RootState) => state.jobPosts.jobPostByList,
  );

  const navigateToExtraCastingBoard = (elem: JobPost) => {
    const path = `/extra-casting-board/${elem.id}`;
    navigate(path);
  };

  useEffect(() => {
    dispatch(
      fetchJobPostByList({
        year: dateYM.year,
        month: dateYM.month,
        pageNum: 0,
      }),
    );

    console.log("afterDispatch");
  }, [dispatch, dateYM]);

  const Component = () => {
    switch (jobPost.status) {
      case ResponseStatus.loading:
        return <Loading loading={true} />;

      case ResponseStatus.rejected:
        return <NotFoundPage />;

      case ResponseStatus.fullfilled:
        return (
          <>
            <ItemWrapper>
              {jobPost.data.map((elem, key) => (
                <HomeRecruitBox
                  navigate={() => navigateToExtraCastingBoard(elem)}
                  key={key}
                  recruitInfo={elem}
                  recommand={showRecommand}
                />
              ))}
              {/* <div ref={ref}></div> */}
            </ItemWrapper>
          </>
        );

      default:
        return;
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