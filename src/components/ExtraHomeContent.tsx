import Calender from "@components/Calender";

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

import List from "@pages/List";
import { sendMessage } from "@api/utils";

export default function ExtraHomeContent() {
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

  // dateSelectedNoticeList 날짜 선택시 화면으로 이동
  const navigateToSelectedNoticeList = () => {
    const path = "/date-selected-notice-list";
    // sendMessage({
    //   type: "NAVIGATION_DATE",
    //   payload: {
    //     uri: path,
    //   },
    //   version: "1.0",
    // });
    navigate(path);
  };

  return (
    <div className="content">
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
    </div>
  );
}
