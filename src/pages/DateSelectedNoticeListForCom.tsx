import { styled } from "styled-components";

import HomeRecruitBox from "@components/HomeRecruitBox";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { useEffect, useState } from "react";
import jobPostAPI from "@api/jobPostAPI";
import { JobPost } from "@type/shared";
import Loading from "@components/Loading";
import NotFoundPage from "@pages/Error/NotFound";
import { useNavigate } from "react-router-dom";
import { dummyJobPostList } from "@mocks/dummyJobData";
import { TEST_FLAG } from "@/testFlag";
import { NavBar } from "@components/mocules/navBar/CommonNavBar";
import { ThemeText } from "@components/atoms/Text";
import { defaultJobPost } from "@redux/jobPost/jobPostSlice";

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
    (state: RootState) => state.date.selectedByHome,
  );

  const navigate = useNavigate();

  const { dateNum, year, month } = selectedDate;
  const NAV_CONTENT = `${year}/${month + 1}/${dateNum}의 촬영 스케줄이에요.`;

  const jobListAboutYM = useSelector(
    (state: RootState) => state.companyJobpost.jobPostByCalenderForCom.data,
  );

  const selectedDataIdList = jobListAboutYM[dateNum];

  /**
   * navigate하고 싶은 url 추가
   * @param jobPostId
   */
  const navigateToExtraCastingBoard = (jobPostId: number) => {
    const basePath = "/company/notice/post-status";
    navigate(`${basePath}/${jobPostId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      let finalList: (JobPost | null)[] = []; // 에러일 경우 null을 넣도록 변경

      const fetchAllJobPostID = async (id: number) => {
        let data: Promise<JobPost>;

        if (TEST_FLAG) {
          data = new Promise<JobPost>((resolve) =>
            setTimeout(() => {
              const jobPost = dummyJobPostList.find((elem) => elem.id === id);
              if (!jobPost) {
                return resolve(defaultJobPost);
              }
              return resolve(jobPost);
            }, 2000),
          );
          return data;
        }

        // test 아닐때
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
          selectedDataIdList.map((id) => fetchAllJobPostID(id)),
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
    <div>
      <NavBar>
        <ThemeText variant={"content-title"}>{NAV_CONTENT}</ThemeText>
      </NavBar>

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
    </div>
  );
}

const ItemWrapper = styled.div`
  display: flex;
  /* width: 100%; */
  /* height: 100%; */
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;
