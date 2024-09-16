import Calender from "@components/Calender";

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

import List from "@pages/List";
import { sendMessage } from "@api/utils";

export default function ExtraHomeContent() {
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
          showRecommand={showRecommand}
          clickedDateEvent={navigateToSelectedNoticeList}
        />
      ) : (
        <List showRecommand={showRecommand} />
      )}
    </div>
  );
}
