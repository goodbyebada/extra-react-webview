import { styled } from "styled-components";
import NavBar from "@components/custom/NavBar";
import HomeRecruitBox from "@components/HomeRecruitBox";
import { useNavigate } from "react-router-dom";
import { dummyJobPostList } from "@api/dummyData";

/**
 * 날짜 선택시 화면
 * @returns
 */
export default function DateSelectedNoticeList() {
  const tmpDateData = "2024/8/3";
  const navContent = `${tmpDateData}에 모집 중인 공고예요.`;

  // dummydata
  const jobPostList = dummyJobPostList;
  const navigate = useNavigate();

  const navigateToExtraCastingBoard = (jobPostId: number) => {
    const basePath = "/extra-casting-board";
    navigate(`${basePath}/${jobPostId}`);
  };

  return (
    <Container>
      <NavBar content={navContent} />

      <ItemWrapper>
        {jobPostList.map((elem, key) => {
          return (
            <HomeRecruitBox
              navigate={() => navigateToExtraCastingBoard(elem.job_post_id)}
              key={key}
              recruitInfo={elem}
            />
          );
        })}
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
