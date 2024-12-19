// import { TopBar } from "@pages/ExtrasHome";
import { styled } from "styled-components";
import TypeSelector from "@components/mocules/TypeSelector";
import { useNavigate } from "react-router-dom";

import { RootState } from "@redux/store";
import { useSelector } from "react-redux";
import CompanyCalender from "@components/template/CompanyCalender";
// import CompanyList from "@components/organisms/CompanyList";

/**
 *추후 수정 예정
 * 1. HomeRecruitBox 공고 컴포넌트 선택시 지원현황으로 이동해야함. 주디님 지원현황 페이지 완료시, 연결 예정 [모달창/ 리스트로보기]
 * 2. API 호출 데이터 연결
 * @returns 회사 업체측 홈화면 UI
 */
export default function CompanyHome() {
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
    const path = "/date-selected-notice-list-company";
    navigate(path);
  };

  /**
   * test용
   */

  // useEffect(() => {
  //   GetToken(0);
  // }, []);

  return (
    <div className="company-home-container">
      <CompanyHomeTopBar>
        <nav>
          <TypeSelector />
        </nav>
        <h1>내 촬영</h1>
      </CompanyHomeTopBar>

      <div className="content">
        {showAsCalender ? (
          <CompanyCalender
            showRecommand={false}
            clickedDateEvent={openModalWindow}
          />
        ) : (
          ""
          // TODO test 위해 CompanyList 주석 처리
          // <CompanyList dateYM={dateYM} showRecommand={false} />
        )}
      </div>
    </div>
  );
}

const CompanyHomeTopBar = styled.div`
  nav {
    display: flex;
    justify-content: end;
  }
  h1 {
    display: flex;
    justify-content: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 83.333%;
    letter-spacing: 0.24px;
    margin: 0px;
    padding-top: 20px;
  }
`;
