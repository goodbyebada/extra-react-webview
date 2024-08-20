import { styled } from "styled-components";
import ToggleBar from "@components/ToggleBar";
import TypeSelector from "@components/TypeSelector";
import Calender from "@components/Calender";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { JobPost, ResponseStatus } from "@api/interface";

import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

import { useDispatch } from "react-redux";
import { fetchJobPostByCalender } from "@redux/jobPost/jobPostSlice";

import { AppDispatch } from "@redux/store";
import { GetToken } from "@api/GetToken";
import Loading from "@components/Loading";
import { Err } from "@components/Err";

import NotFoundPage from "@pages/Error/NotFound";

/**
 * 회원 정보 수정할 것
 */
/**임시
 * API 개발 후 처리할 예정
 */
const name = "미뇽";

/**
 * 보조 출연자 홈화면
 *
 * @returns 보조 출연자 홈화면 UI
 */
export default function ExtrasHome() {
  // date 관련
  const date = new Date();
  const today = {
    year: date.getFullYear(),
    month: date.getMonth(),
  };

  /**
   * date.getMonth는 항상 원래 월보다 -1이다.
   * useCaleder에 들어가는 값도 원래  month보다 -1 이어야한다.
   */
  const [dateYM, setDateYM] = useState(today);

  const dateYMHandler = (type: string, value: number) => {
    setDateYM((prev) => {
      return type === "month"
        ? { ...prev, [type]: value - 1 }
        : { ...prev, [type]: value };
    });
  };

  const dispatch = useDispatch<AppDispatch>();
  const jobpost = useSelector(
    (state: RootState) => state.jobPosts.jobPostByCalender,
  );

  useEffect(() => {
    const Dispatch = () => {
      dispatch(fetchJobPostByCalender(dateYM));
    };

    /**
     * for test
     */
    if (!localStorage.getItem("token")) {
      GetToken(0);
    }
    Dispatch();
  }, [dispatch, dateYM]);

  // 월 기준으로 API 호출 로직 추가 예정
  //  list로 보기 시,infiniteScrolling으로 구현 해야함
  // dummydata

  // navigate
  const navigate = useNavigate();

  // 전체 || 추천
  const showRecommand = useSelector(
    (state: RootState) => state.showType.showRecommand,
  );

  // 캘린더 || 리스트
  const showAsCalender = useSelector(
    (state: RootState) => state.showType.showAsCalender,
  );

  const listAll = `지금 당장 ${name}님이 필요해요 ⏰`;
  const listRecommand = `${name}님한테 딱 맞는 역할이 있어요 🤩`;

  // dateSelectedNoticeList 날짜 선택시 화면으로 이동
  const navigateToSelectedNoticeList = () => {
    const path = "/date-selected-notice-list";
    navigate(path);
  };

  // 리스트 보기 선택시 navigate
  const navigateToExtraCastingBoard = (elem: JobPost) => {
    const path = `/extra-casting-board/${elem.id}`;
    navigate(path);
  };

  const ReturnComponent = () => {
    switch (jobpost.status) {
      case ResponseStatus.loading:
        return <Loading loading={true} />;

      case ResponseStatus.fullfilled:
        switch (showAsCalender) {
          case true:
            return (
              <Calender
                dateYM={dateYM}
                dateYMHandler={dateYMHandler}
                showRecommand={showRecommand}
                clickedDateEvent={navigateToSelectedNoticeList}
              />
            );

          case false:
          default:
            return (
              <ItemWrapper>
                {/* {jobPostList.map((elem, key) => (
                  <HomeRecruitBox
                    navigate={() => navigateToExtraCastingBoard(elem)}
                    key={key}
                    recruitInfo={elem}
                    recommand={showRecommand}
                  />
                ))} */}
              </ItemWrapper>
            );
        }

      case ResponseStatus.rejected:
        return <NotFoundPage />;

      default:
        return "";
    }
  };

  return (
    <Container className="extras-home">
      <TopBar>
        <nav>
          <ToggleBar />
          <TypeSelector />
        </nav>

        <h1>{!showRecommand ? listAll : listRecommand}</h1>
      </TopBar>

      <Content className="content">{ReturnComponent()}</Content>
    </Container>
  );
}

const Container = styled.div``;

const Content = styled.div``;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

export const TopBar = styled.div`
  padding: 0 22px;
  position: sticky;
  top: 0;
  z-index: 9;
  background-color: #000000;
  padding-top: 43px;
  width: 100vw;
  padding-bottom: 23px;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    color: #fff;
    font-size: 20px;
    font-weight: 900;
    line-height: 100%;
    letter-spacing: 0.2px;
    margin-top: 21px;
    top: 30px;
  }
`;
