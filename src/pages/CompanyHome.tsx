// import { TopBar } from "@pages/ExtrasHome";
import { styled } from "styled-components";
import TypeSelector from "@components/mocules/TypeSelector";
import { useNavigate } from "react-router-dom";

import { RootState } from "@redux/store";
import { useSelector } from "react-redux";
import CompanyCalender from "@components/template/CompanyCalender";
import MainWindow from "@components/mocules/MainWindow";
import List from "@pages/List";
import { DateDetailedInfo } from "@type/dateInteface";
// import CompanyList from "@components/organisms/CompanyList";
import ScrollingList from "@components/mocules/ScrollingList";

/**
 *추후 수정 예정
 * 1. HomeRecruitBox 공고 컴포넌트 선택시 지원현황으로 이동해야함. 주디님 지원현황 페이지 완료시, 연결 예정 [모달창/ 리스트로보기]
 * 2. API 호출 데이터 연결
 * @returns 회사 업체측 홈화면 UI
 */
export default function CompanyHome() {
  const dateYearMonth: DateDetailedInfo = useSelector(
    (state: RootState) => state.date.selectedByHome,
  );

  // 캘린더 || 리스트
  const showAsCalender = useSelector(
    (state: RootState) => state.showType.showAsCalender,
  );

  const navigate = useNavigate();

  /**
   * 일을 클릭했을때 일어날 Event
   */
  const openModalWindow = () => {
    // 모달창을 연다
    const path = "/company/home/date-selected-notice-list";
    navigate(path);
  };

  /**
   * test용
   */

  // useEffect(() => {
  //   GetToken(0);
  // }, []);

  return (
    <MainWindow headerShown={false}>
      <NavWrapper>
        <TypeSelector />
      </NavWrapper>

      <Title>내 촬영</Title>

      <ScrollingList>
        {showAsCalender ? (
          <CompanyCalender
            showRecommand={false}
            clickedDateEvent={openModalWindow}
          />
        ) : (
          <List dateYearMonth={dateYearMonth} showRecommand={false} />
        )}
      </ScrollingList>
    </MainWindow>
  );
}

const NavWrapper = styled.nav`
  width: 100%;
  height: fit-content;
  position: sticky;
  display: flex;
  justify-content: flex-end;
`;
const Title = styled.h1`
  height: fit-content;
  width: 100%;
  position: sticky;
  display: flex;
  justify-content: center;
`;
