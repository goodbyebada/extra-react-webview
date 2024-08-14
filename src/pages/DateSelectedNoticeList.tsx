import { styled } from "styled-components";
import NavBar from "@components/custom/NavBar";
import HomeRecruitBox from "@components/HomeRecruitBox";
import { useNavigate } from "react-router-dom";
import { dummyJobPostList } from "@api/dummyData";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

/**
 * 날짜 선택시 화면
 * @returns
 */
export default function DateSelectedNoticeList() {
  const selectedDate = useSelector(
    (state: RootState) => state.homeSelectedDate,
  );

  const { year, month, dateNum } = selectedDate;

  const dateString = `${year}/${month}/${dateNum}`;
  const navContent = `${dateString} 에 모집 중인 공고예요.`;

  // month에 따른 데이터들중 해당 날짜에 맞는 joblist만 고르는 로직 추가 필요
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
              navigate={() => navigateToExtraCastingBoard(elem.id)}
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
