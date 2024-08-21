import { styled } from "styled-components";
import ToggleBar from "@components/ToggleBar";
import TypeSelector from "@components/TypeSelector";
import Calender from "@components/Calender";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { GetToken } from "@api/GetToken";

import List from "@pages/List";

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

  useEffect(() => {
    // web일때
    GetToken(0);
  }, []);

  return (
    <Container className="extras-home">
      <TopBar>
        <nav>
          <ToggleBar />
          <TypeSelector />
        </nav>

        <h1>{!showRecommand ? listAll : listRecommand}</h1>
      </TopBar>

      <Content className="content">
        {showAsCalender ? (
          <Calender
            dateYM={dateYM}
            dateYMHandler={dateYMHandler}
            showRecommand={showRecommand}
            clickedDateEvent={navigateToSelectedNoticeList}
          />
        ) : (
          <List dateYM={dateYM} showRecommand={showRecommand} />
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
