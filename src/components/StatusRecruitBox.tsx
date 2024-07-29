import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import RecruitStatus from "./custom/recruitStatus";
import DeleteButton from "./custom/deleteBtn";
import { toggleSwipe } from "../redux/recruitSlice";

function StatusRecruitBox() {
  const dispatch = useDispatch();
  const swiped = useSelector((state) => state.recruit.swiped);
  const recruitStatus = useSelector((state) => state.recruit.recruitStatus);
  const touchStartX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX > 50) {
      dispatch(toggleSwipe());
    } else if (touchEndX - touchStartX.current > 50) {
      dispatch(toggleSwipe());
    }
  };

  let deleteButtonText = "";
  if (recruitStatus.pending) {
    deleteButtonText = "지원\n취소하기";
  } else if (recruitStatus.rejected) {
    deleteButtonText = "삭제하기";
  }

  return (
    <RecruitContainer>
      <DeleteButton visible={swiped} cancelText={deleteButtonText} />
      <RecruitBox
        swiped={swiped}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <InfoContainer>
          <MediaSelectorTxt>media</MediaSelectorTxt>
          <TitleTxt>title</TitleTxt>
          <DateAndDeadlineContainer>
            <DateTxt>date</DateTxt>
            <DeadlineBox>D-0</DeadlineBox>
          </DateAndDeadlineContainer>
          <Team>team</Team>
        </InfoContainer>
        <RecruitStatus
          visible={recruitStatus.pending}
          borderColor="#767676"
          backgroundColor="#d9d9d9"
          color="#000"
          fontSize={"10px"}
        >
          승인 대기
        </RecruitStatus>
        <RecruitStatus
          visible={recruitStatus.rejected}
          borderColor="#F00"
          backgroundColor="#F00"
          color="#FFF"
          fontSize={"12px"}
        >
          미승인
        </RecruitStatus>
        <RecruitStatus
          visible={recruitStatus.approved}
          borderColor="#23D014"
          backgroundColor="#23D014"
          color="#FFF"
          fontSize={"10px"}
        >
          승인 완료
        </RecruitStatus>
        <TimePlace>
          00:00 예정 <br /> place
        </TimePlace>
      </RecruitBox>
    </RecruitContainer>
  );
}

export default StatusRecruitBox;

const swipeLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-110px);
  }
`;

const swipeRight = keyframes`
  0% {
    transform: translateX(-110px);
  }
  100% {
    transform: translateX(0);
  }
`;

const RecruitContainer = styled.div`
  font-variant-numeric: lining-nums proportional-nums;
  font-feature-settings: "dlig" on;
  font-family: Inter;
  font-style: normal;
  line-height: 20px;
  letter-spacing: 0.1px;
  padding-bottom: 23px;
  position: relative;
`;

const RecruitBox = styled.div`
  display: flex;
  position: relative;
  width: 365px;
  height: 145px;
  border-radius: 20px;
  border: 2px solid #3c3c3c;
  background: #191919;
  box-shadow: 5px 5px 4px 0px #000;
  padding-top: 17px;
  padding-left: 24px;
  box-sizing: border-box;
  animation: ${(props) => (props.swiped ? swipeLeft : swipeRight)} 0.4s forwards;
  z-index: 2;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const MediaSelectorTxt = styled.div`
  color: #868686;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.1px;
`;

const TitleTxt = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 0.16px;
  margin-bottom: 6px;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateAndDeadlineContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DateTxt = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.14px;
  margin-right: 10px;
`;

const DeadlineBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 18px;
  border-radius: 20px;
  background: #d9d9d9;
  color: #888;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.11px;
`;

const Team = styled.div`
  color: #a7a7a7;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1px;
  position: absolute;
  bottom: 17px;
`;

const TimePlace = styled.div`
  position: absolute;
  top: 20px;
  right: 10px;
  color: #fff;
  text-align: right;
  font-size: 11px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0.11px;
`;
