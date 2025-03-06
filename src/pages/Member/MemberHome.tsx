import HomeCalendar from "@components/organisms/HomeCalendar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
// import { GetToken } from "@api/GetToken";

import { useNavigate } from "react-router-dom";
import { DateDetailedInfo } from "@type/dateInteface";
import { fetchJobPostByCalender } from "@redux/jobPost/jobPostSlice";
import List from "@pages/List";
import { HOME_MESSAGES } from "@constants/messages";
import { LayoutComponent } from "@components/atoms/Layout";
import { ThemeText } from "@components/atoms/Text";
import { Header } from "@components/atoms/Layout";
import { HomeNavBar } from "@components/mocules/navBar/HomeNavBar";
import { setHomeDate } from "@redux/dateSlice";
import MainWindow from "@components/mocules/MainWindow";

import { useLocation } from "react-router-dom";
import { getAuthType } from "@utills/getAuthType";

const DUMMY_INIT_NAME = "김출연";

/**
 * 보조 출연자 홈화면
 *
 * @returns 보조 출연자 홈화면 UI
 */
export default function MemberHome() {
  const name = DUMMY_INIT_NAME;

  const location = useLocation();
  const type = location.pathname.split("/")[1];

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
    const path = "/member/home/date-selected-notice-list";
    navigate(path);
  };

  // 데이터
  const gotJob = useSelector(
    (state: RootState) => state.jobPosts.jobPostByCalender,
  );
  const gotJobDataList = gotJob.data;

  // 날짜 정보
  //CHECK date.getMonth는 항상 원래 월보다 -1이다.
  //CHECK useCaleder에 들어가는 값도 원래  month보다 -1 이어야한다.
  const dateDetailedInfo: DateDetailedInfo = useSelector(
    (state: RootState) => state.date.selectedByHome,
  );
  const { year, month } = dateDetailedInfo;

  useEffect(() => {
    const dateYearMonth = { year, month };

    if (showAsCalender) {
      dispatch(fetchJobPostByCalender(dateYearMonth));
      return;
    }
  }, [dispatch, year, month, showAsCalender]);

  // Only Calender
  const clickedDateEvent = (dateNum: number) => {
    const stringDate = dateNum.toString();
    const jobLength = gotJobDataList[stringDate]?.length;

    if (!jobLength) {
      return;
    }

    if (jobLength > 0) {
      dispatch(setHomeDate({ dateNum }));
      navigateToSelectedNoticeList();
    }
  };

  return (
    <MainWindow>
      <LayoutComponent>
        <Header>
          <HomeNavBar />
          <ThemeText variant="title">
            {showRecommand
              ? HOME_MESSAGES.recommend(name)
              : HOME_MESSAGES.all(name)}
          </ThemeText>
        </Header>

        {showAsCalender ? (
          <HomeCalendar
            dateYearMonth={{ year, month }}
            showRecommand={showRecommand}
            clickedDateEvent={(dateNum) => clickedDateEvent(dateNum)}
            gotJobDataList={gotJobDataList}
          />
        ) : (
          <List
            dateYearMonth={{ year, month }}
            showRecommand={showRecommand}
            authType={getAuthType(type)}
          />
        )}
      </LayoutComponent>
    </MainWindow>
  );
}
