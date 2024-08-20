import { useState } from "react";
import styled from "styled-components";
import RecruitStatus from "@components/custom/recruitStatus";
import { JobPost } from "@api/interface";
import star_g from "@assets/Star_g.png";
import star_y from "@assets/Star_y.png";

// import returnGatherInfo from "@utills/returnGaterInfo";

type Props = {
  navigate: () => void;
  recruitInfo: JobPost;
  recommand?: boolean | undefined;
};

/**
 * 수정 해야할 것
 *
 * 1. D-day 데이터 받아올 때 year 필요(임시- 2024), 추후 수정 예정
 * 2. D-0, D-day 기준 필요, 8/1-8/4와 같이 여러 날일 경우 기준 필요
 */

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

function HomeRecruitBox({ navigate, recruitInfo, recommand }: Props) {
  const [star, setStar] = useState(star_g);

  const handleStarClick = () => {
    setStar(star === star_g ? star_y : star_g);
  };

  const {
    category,
    title,
    calenderList,
    companyName,
    gatheringTime,
    gatheringLocation,
    status,
  } = recruitInfo;

  // 촬영날짜가 여러 날일 경우 가장 가까운 날짜를 기준으로 디데이 계산
  const formattedDate = formatDateRange(calenderList);
  const dday = calculateDday(calenderList);
  // 촬영날짜가 1일이라는 가정하에 작성됨
  // 추후 논의 예정

  // 예상되는 촬영시간 string으로 올 수 있음
  // const timeToExpected = returnGatherInfo(gatheringTime).time;

  // string 값으로 준다면 사용할 예정
  const timeToExpected = gatheringTime;

  // 백 형식에 맞게 D-day 수정 필요
  // const dday = calculateDday(calenderList);

  // 임시 Dday for test
  // const dday = "D-7";

  return (
    <RecruitContainer className={`${!recommand ? "" : "recommand"}`}>
      <StarIcon src={star} onClick={handleStarClick} />
      <RecruitBox
        className={`${!recommand ? "" : "recommand"}`}
        onClick={navigate}
      >
        <InfoContainer>
          <MediaSelectorTxt>{category}</MediaSelectorTxt>
          <TitleTxt>{title}</TitleTxt>
          <DateAndDeadlineContainer>
            <DateTxt>{formattedDate}</DateTxt>
            <DeadlineBox>{dday}</DeadlineBox>
          </DateAndDeadlineContainer>
          <Team>{companyName}</Team>
        </InfoContainer>
        <RecruitStatus
          visible={true}
          borderColor={status ? "#767676" : "#F00"}
          backgroundColor={status ? "#d9d9d9" : "#F00"}
          color={status ? "#000" : "#fff"}
          fontSize={status ? "12px" : "11px"}
        >
          {status ? "모집중" : "모집마감"}
        </RecruitStatus>
        <TimePlace>
          {timeToExpected} 예정 <br /> {gatheringLocation}
        </TimePlace>
      </RecruitBox>
    </RecruitContainer>
  );
}

export default HomeRecruitBox;

const RecruitContainer = styled.div`
  position: relative;
  font-variant-numeric: lining-nums proportional-nums;
  font-feature-settings: "dlig" on;
  font-family: Inter;
  font-style: normal;
  line-height: 20px;
  letter-spacing: 0.1px;
  margin-bottom: 23px;
  border-radius: 20px;
  box-shadow: 5px 5px 4px 0px #000;

  width: 365px;
  height: 145px;
  border: 2px solid transparent;
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-image: linear-gradient(#191919, #191919),
    linear-gradient(#3c3c3c, #3c3c3c);

  /* 추천 시 그라데이션 border css class */
  &.recommand {
    background-image: linear-gradient(#191919, #191919),
      linear-gradient(#3c3c3c, #f5c001);
  }
`;

const RecruitBox = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: transparent;
  padding-top: 17px;
  padding-left: 24px;
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
  height: 18px;
  border-radius: 20px;
  background: #d9d9d9;
  color: #888;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.11px;
  padding-left: 7px;
  padding-right: 7px;
`;

const Team = styled.div`
  color: #a7a7a7;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1px;
  position: absolute;
  bottom: 17px;
`;

const StarIcon = styled.img`
  position: absolute;
  top: 18px;
  right: 10px;
  z-index: 1;
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
