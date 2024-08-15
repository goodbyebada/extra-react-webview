import { useState, useRef, TouchEvent } from "react";
import styled, { keyframes } from "styled-components";
import RecruitStatus from "@components/custom/recruitStatus";
import DeleteButton from "@components/custom/deleteBtn";
import star_g from "@assets/Star_g.png";
import star_y from "@assets/Star_y.png";
import { ShootManageSelectStatus, ApplyStatusLabel } from "@api/interface";
import { ShootManage } from "@api/interface";

/**
 * 촬영관리 컴포넌트
 *
 */

interface StatusRecruitBoxProps {
  shootManageInfo: ShootManage;
  onDelete: (id: number) => void;
  onOpenCancelModal: (item: ShootManage) => void;
}

// 날짜 문자열 배열에서 가장 가까운 날짜를 찾는 함수 (촬영날짜가 여러날일 경우)
const getClosestDate = (dates: string[]): Date => {
  const today = new Date();
  let closestDate = new Date(dates[0]);

  dates.forEach((dateStr) => {
    const date = new Date(dateStr);
    if (date > today && (date < closestDate || closestDate <= today)) {
      closestDate = date;
    }
  });

  return closestDate;
};

// 디데이를 계산하는 함수
const calculateDday = (calendarList: string[]): string => {
  const today = new Date();
  const target = getClosestDate(calendarList);

  // 시간을 00:00:00으로 설정
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  // 날짜 차이 계산 (밀리초 단위)
  const differenceInTime = target.getTime() - today.getTime();

  // 밀리초를 일수로 변환
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  if (differenceInDays === 0) {
    return "D-day";
  } else if (differenceInDays > 0) {
    return `D-${Math.ceil(differenceInDays)}`;
  } else {
    return "종료";
  }
};

// 날짜를 MM/DD 형식으로 변환하는 함수
const formatDate = (date: Date): string => {
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1 필요
  const day = date.getDate();
  return `${month}/${day}`;
};

// 날짜 배열을 MM/DD - MM/DD 형식으로 변환하는 함수
const formatDateRange = (dates: string[]): string => {
  if (dates.length === 1) {
    return formatDate(new Date(dates[0]));
  } else {
    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[dates.length - 1]);
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  }
};

function StatusRecruitBox({
  shootManageInfo,
  onDelete,
  onOpenCancelModal,
}: StatusRecruitBoxProps) {
  const [swiped, setSwiped] = useState(false);
  const [star, setStar] = useState(star_g);

  const touchStartX = useRef(0);

  const formattedDate = formatDateRange(shootManageInfo.calenderList);
  const dday = calculateDday(shootManageInfo.calenderList);

  // gatheringTime에서 시간 부분만 추출
  const gatheringTime = shootManageInfo.gatheringTime.substring(11, 16);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX > 50) {
      setSwiped(true);
    } else if (touchEndX - touchStartX.current > 50) {
      setSwiped(false);
    }
  };

  const handleStarClick = () => {
    setStar(star === star_g ? star_y : star_g);
  };

  const recruitStatus = shootManageInfo.applyStatus;

  let deleteButtonText = "";
  if (recruitStatus === ShootManageSelectStatus.APPLIED) {
    deleteButtonText = "지원\n취소하기";
  } else if (recruitStatus === ShootManageSelectStatus.REJECTED) {
    deleteButtonText = "삭제하기";
  }

  const shouldShowDeleteButton =
    recruitStatus !== ShootManageSelectStatus.APPROVED;
  const swipeEnabled = recruitStatus !== ShootManageSelectStatus.APPROVED;

  return (
    <RecruitContainer>
      {shouldShowDeleteButton && (
        <DeleteButton
          cancelText={deleteButtonText}
          onClick={() => {
            if (recruitStatus === ShootManageSelectStatus.APPLIED) {
              onOpenCancelModal(shootManageInfo);
            } else if (recruitStatus === ShootManageSelectStatus.REJECTED) {
              onDelete(shootManageInfo.id);
            }
          }}
        />
      )}
      <RecruitBox
        $swiped={swiped}
        onTouchStart={swipeEnabled ? handleTouchStart : undefined}
        onTouchEnd={swipeEnabled ? handleTouchEnd : undefined}
        $swipeEnabled={swipeEnabled}
      >
        <InfoContainer>
          <MediaSelectorTxt>media</MediaSelectorTxt>
          <TitleTxt>{shootManageInfo.title}</TitleTxt>
          <DateAndDeadlineContainer>
            <DateTxt>{formattedDate}</DateTxt>
            <DeadlineBox>{dday}</DeadlineBox>
          </DateAndDeadlineContainer>
          <Team>{shootManageInfo.name}</Team>
        </InfoContainer>
        <RecruitStatus
          visible={recruitStatus === ShootManageSelectStatus.APPLIED}
          borderColor="#767676"
          backgroundColor="#d9d9d9"
          color="#000"
          fontSize={"10px"}
        >
          {ApplyStatusLabel[ShootManageSelectStatus.APPLIED]}
        </RecruitStatus>
        <RecruitStatus
          visible={recruitStatus === ShootManageSelectStatus.REJECTED}
          borderColor="#F00"
          backgroundColor="#F00"
          color="#FFF"
          fontSize={"12px"}
        >
          {ApplyStatusLabel[ShootManageSelectStatus.REJECTED]}
        </RecruitStatus>
        <RecruitStatus
          visible={recruitStatus === ShootManageSelectStatus.APPROVED}
          borderColor="#23D014"
          backgroundColor="#23D014"
          color="#FFF"
          fontSize={"10px"}
        >
          {ApplyStatusLabel[ShootManageSelectStatus.APPROVED]}
        </RecruitStatus>
        <TimePlace>
          {gatheringTime} 예정 <br /> {shootManageInfo.gatheringLocation}
        </TimePlace>
        <StarIcon src={star} onClick={handleStarClick} />
      </RecruitBox>
    </RecruitContainer>
  );
}

export default StatusRecruitBox;

// 스와이프 애니메이션 정의
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

const RecruitBox = styled.div<{ $swiped: boolean; $swipeEnabled: boolean }>`
  display: flex;
  position: relative;
  width: 365px;
  height: 145px;
  border-radius: 20px;
  border: 2px solid #3c3c3c;
  background: #191919;
  box-shadow: 5px 5px 4px 0px #000;
  padding: 17px;
  box-sizing: border-box;
  animation: ${(props) =>
      props.$swipeEnabled ? (props.$swiped ? swipeLeft : swipeRight) : "none"}
    0.4s forwards;
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
  top: 16px;
  right: 45px;
  color: #fff;
  text-align: right;
  font-size: 11px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0.11px;
`;

const StarIcon = styled.img`
  position: absolute;
  top: 18px;
  right: 10px;
  z-index: 1;
`;
