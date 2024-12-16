import { styled } from "styled-components";
import ToggleBar from "@components/custom/ToggleBar";
import TypeSelector from "@components/custom/TypeSelector";
import HomeCalendar from "@components/organisms/HomeCalendar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
// import { GetToken } from "@api/GetToken";

import { useNavigate } from "react-router-dom";
import { DateDetailedInfo } from "@api/dateInteface";
import { fetchJobPostByCalender } from "@redux/jobPost/jobPostSlice";

const DUMMY_INIT_NAME = "김출연";

/**
 * 보조 출연자 홈화면
 *
 * @returns 보조 출연자 홈화면 UI
 */
export default function ExtrasHome() {
  const name = DUMMY_INIT_NAME;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // 전체 || 추천
  const showRecommand = useSelector(
    (state: RootState) => state.showType.showRecommand,
  );

  // 캘린더 || 리스트
  const showAsCalender = useSelector(
    (state: RootState) => state.showType.showAsCalender,
  );

  // dateSelectedNoticeList 날짜 선택시 화면으로 이동
  const navigateToSelectedNoticeList = () => {
    const path = "/date-selected-notice-list";
    navigate(path);
  };

  // 데이터
  const gotJob = useSelector(
    (state: RootState) => state.jobPosts.jobPostByCalender,
  );
  const gotJobDataList = gotJob.data;

  // 날짜 정보
  //CHECK date.getMonth는 항상 원래 월보다 -1이다.
  //CHECK useCaleder에 들어가는 값도 원래  month보다 -1 이어야한다.s
  const dateDetailedInfo: DateDetailedInfo = useSelector(
    (state: RootState) => state.date.selectedByHome,
  );
  const { year, month } = dateDetailedInfo;

  useEffect(() => {
    dispatch(fetchJobPostByCalender({ year, month }));
  }, [dispatch, year, month]);

  // Only Calender
  const clickedDateEvent = (dateNum: number) => {
    const stringDate = dateNum.toString();
    const jobLength = gotJobDataList[stringDate]?.length;

    if (!jobLength) {
      return;
    }

    if (jobLength > 0) {
      // const dateNum = stringDate;

      // CHECK dateNum 눌렀을때 어떻게 처리했는지 확인 후 수정 예정
      // dispatch(setHomeDate(dateNum));
      navigateToSelectedNoticeList();
    }
  };

  return (
    <Container className="extras-home">
      <TopBar>
        <nav>
          <ToggleBar />
          <TypeSelector />
        </nav>

        <h1>
          {!showRecommand
            ? `지금 당장 ${name}님이 필요해요 ⏰`
            : `${name}님한테 딱 맞는 역할이 있어요 🤩`}
        </h1>
      </TopBar>

      <Content className="content">
        {showAsCalender ? (
          <HomeCalendar
            dateYearMonth={{ year, month }}
            showRecommand={showRecommand}
            clickedDateEvent={(dateNum) => clickedDateEvent(dateNum)}
            gotJobDataList={gotJobDataList}
          />
        ) : (
          ""
          // TODO list 리팩해야함
          // <List dateYM={dateYM} showRecommand={showRecommand} />
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div``;

const Content = styled.div``;

export const TopBar = styled.div`
  padding: 0 22px;
  position: sticky;
  top: 0;
  z-index: 9;
  background-color: #000000;
  padding-top: 25px;

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

  @media all and (max-width: 375px) {
    h1 {
      font-size: 18px;
    }
  }
`;
