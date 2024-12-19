import { styled } from "styled-components";

import HomeCalendar from "@components/organisms/HomeCalendar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
// import { GetToken } from "@api/GetToken";

import { useNavigate } from "react-router-dom";
import { DateDetailedInfo } from "@api/dateInteface";
import { fetchJobPostByCalender } from "@redux/jobPost/jobPostSlice";
import List from "@pages/List";
import { HOME_MESSAGES } from "@/constants/messages";
import { LayoutComponent } from "@components/template/Layout";
import { ThemeText } from "@components/atoms/Text";
import { Header } from "@components/template/Layout";
import { HomeNavBar } from "@components/mocules/HomeNavBar";

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
    const dateYearMonth = { year, month };
    showAsCalender ? dispatch(fetchJobPostByCalender(dateYearMonth)) : "";
  }, [dispatch, year, month, showAsCalender]);

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

  const homeMessageComponent = () => {
    return (
      <HomeMessage>
        {showRecommand
          ? HOME_MESSAGES.recommend(name)
          : HOME_MESSAGES.all(name)}
      </HomeMessage>
    );
  };

  return (
    <LayoutComponent>
      <Header>
        <HomeNavBar />
        <ThemeText
          children={homeMessageComponent()}
          variant="title"
        ></ThemeText>
      </Header>

      {showAsCalender ? (
        <HomeCalendar
          dateYearMonth={{ year, month }}
          showRecommand={showRecommand}
          clickedDateEvent={(dateNum) => clickedDateEvent(dateNum)}
          gotJobDataList={gotJobDataList}
        />
      ) : (
        <List dateYearMonth={{ year, month }} showRecommand={showRecommand} />
      )}
    </LayoutComponent>
  );
}

const HomeMessage = styled.p`
  color: #fff;
  font-size: 20px;
  font-weight: 900;
  margin-top: 20px;
`;
