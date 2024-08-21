import HomeRecruitBox from "@components/HomeRecruitBox";
import { styled } from "styled-components";
import { dateYM } from "@api/interface";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { useEffect } from "react";
import { ResponseStatus } from "@api/interface";
import Loading from "@components/Loading";
import NotFoundPage from "@pages/Error/NotFound";
import { fetchJobPostByListForCom } from "@redux/company/companyJobPostSlice";

type ListProps = {
  dateYM: dateYM;
  showRecommand: boolean;
};

export default function CompanyList({ dateYM, showRecommand }: ListProps) {
  // 리스트 보기 선택시 navigate

  // const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const jobPost = useSelector(
    (state: RootState) => state.companyJobpost.jobPostByListForCom,
  );

  // const navigateToExtraCastingBoard = (elem: JobPost) => {
  //   const path = `/extra-casting-board/${elem.id}`;
  //   navigate(path);
  // };

  useEffect(() => {
    dispatch(
      fetchJobPostByListForCom({
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
                  navigate={() => {}}
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