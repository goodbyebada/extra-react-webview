import { styled } from "styled-components";

import HomeRecruitBox from "@components/HomeRecruitBox";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { useEffect, useState } from "react";
import jobPostAPI from "@api/jobPostAPI";
import { JobPost } from "@api/interface";
import Loading from "@components/Loading";
import NotFoundPage from "@pages/Error/NotFound";

/**
 * 날짜 선택시 화면
 * @returns
 */
export default function DateSelectedNoticeListForCom() {
  const INIT_LOCAL_INFOLIST = [] as JobPost[];
  const [localJobInfoLists, setLocalJobInfoLists] =
    useState<JobPost[]>(INIT_LOCAL_INFOLIST);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  // Nav Bar Content 삭제
  const selectedDate = useSelector(
    (state: RootState) => state.homeSelectedDate,
  );

  const { dateNum } = selectedDate;

  const jobListAboutYM = useSelector(
    (state: RootState) => state.companyJobpost.jobPostByCalenderForCom.data,
  );

  const selectedDataIdList = jobListAboutYM[dateNum];

  const navigate = useNavigate();

  /**
   * navigate하고 싶은 url 추가
   * @param jobPostId
   */
  const navigateToExtraCastingBoard = (jobPostId: number) => {
    // const basePath = "/detail";
    // navigate(`${basePath}/${jobPostId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      let finalList: (JobPost | null)[] = []; // 에러일 경우 null을 넣도록 변경

      const fetch = async (id: number) => {
        try {
          const data = await jobPostAPI.getJobPostById(id);
          return data;
        } catch (error) {
          console.error(`Error fetching job post with ID ${id}:`, error);
          return null; // 에러 발생 시 null 반환
        }
      };

      if (selectedDataIdList && selectedDataIdList.length > 0) {
        finalList = await Promise.all(
          selectedDataIdList.map((id) => fetch(id)),
        );
      }

      // null 값(에러)을 제거하고 성공한 데이터만 남김
      const filteredList = finalList.filter(
        (item) => item !== null,
      ) as JobPost[];

      if (filteredList.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
        setLocalJobInfoLists(filteredList);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [selectedDataIdList]);

  return (
    <Container>
      {/* <NavBar content={navContent} /> */}

      <ItemWrapper>
        {loading ? <Loading loading={loading} /> : ""}

        {localJobInfoLists.length > 0 &&
          localJobInfoLists.map((elem, key) => {
            return (
              <HomeRecruitBox
                navigate={() => {
                  navigateToExtraCastingBoard(elem.id);
                }}
                key={key}
                recruitInfo={elem}
              />
            );
          })}

        {!loading && notFound ? <NotFoundPage /> : ""}
      </ItemWrapper>
    </Container>
  );
}

const Container = styled.div`
  nav {
    height: 95px;
    background: #191919;
    font-size: 18px;
    font-style: normal;
    font-weight: 900;
    line-height: 111.111%;
    letter-spacing: 0.18px;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  /* width: 100%; */
  /* height: 100%; */
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;
