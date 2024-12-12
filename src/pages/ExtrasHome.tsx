import { styled } from "styled-components";
import ToggleBar from "@components/custom/ToggleBar";
import TypeSelector from "@components/custom/TypeSelector";
import Calender from "@components/organisms/Calender";

import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
// import { GetToken } from "@api/GetToken";

import List from "@pages/List";
import { sendMessage } from "@api/utils";

/**
 * 회원 정보 수정할 것
 */

/**
 * 보조 출연자 홈화면
 *
 * @returns 보조 출연자 홈화면 UI
 */
export default function ExtrasHome() {
  const [name, setName] = useState("");

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
  // const navigate = useNavigate();

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
    sendMessage({
      type: "NAVIGATION_DATE",
      payload: {
        uri: path,
      },
      version: "1.0",
    });
    // navigate(path);
  };

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === "POST_DATA") {
        setName(data.payload.name);
      }
    };

    window.addEventListener("message", listener);
    document.addEventListener("message", listener as EventListener);
  }, []);

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
          <Calender
            // dateYM={dateYM}
            // dateYMHandler={dateYMHandler}
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
