import { TopBar } from "@pages/ExtrasHome";
import { styled } from "styled-components";
import TypeSelector from "@components/custom/TypeSelector";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "@redux/store";
import { useSelector } from "react-redux";
import CompanyCalender from "@components/organisms/CompanyCalender";
import CompanyList from "@components/organisms/CompanyList";

/**
 *추후 수정 예정
 * 1. HomeRecruitBox 공고 컴포넌트 선택시 지원현황으로 이동해야함. 주디님 지원현황 페이지 완료시, 연결 예정 [모달창/ 리스트로보기]
 * 2. API 호출 데이터 연결
 * @returns 회사 업체측 홈화면 UI
 */
export default function CompanyHome() {
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

  // 캘린더 || 리스트
  const showAsCalender = useSelector(
    (state: RootState) => state.showType.showAsCalender,
  );

  const navigate = useNavigate();

  /**
   * 일을 클릭했을때 일어날 Event
   */
  const clickedDateEvent = () => {
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
          // 항상 전체 추천 UI
          <CompanyCalender
            // dateYM={dateYM}
            // dateYMHandler={dateYMHandler}
            showRecommand={false}
            clickedDateEvent={clickedDateEvent}
          />
        ) : (
          <CompanyList dateYM={dateYM} showRecommand={false} />
        )}
      </div>
    </div>
  );
}

const CompanyHomeTopBar = styled(TopBar)`
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
