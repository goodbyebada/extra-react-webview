import styled from "styled-components";
import documentIcon from "@assets/document.png";
import { JobPost } from "@api/interface";

type Props = {
  navigate: () => void;
  jobPostInfo: JobPost;
};

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

function AdminManageRecruitBox({ navigate, jobPostInfo }: Props) {
  // 촬영날짜가 여러 날일 경우 가장 가까운 날짜를 기준으로 디데이 계산
  const formattedDate = formatDateRange(jobPostInfo.calenderList);
  const dday = calculateDday(jobPostInfo.calenderList);
  const gatheringTime = jobPostInfo.gatheringTime.substring(11, 16);

  return (
    <RecruitContainer onClick={navigate}>
      <RecruitBox>
        <InfoContainer>
          <MediaSelectorTxt>{jobPostInfo.category}</MediaSelectorTxt>
          <TitleTxt>{jobPostInfo.title}</TitleTxt>
          <DateAndDeadlineContainer>
            {/* calendarList를 사용하여 처음과 마지막 날짜 표시 */}
            <DateTxt>{formattedDate}</DateTxt>
            {/* 가장 첫 번째 날짜에 대해 D-Day 계산 */}
            <DeadlineBox>{dday}</DeadlineBox>
          </DateAndDeadlineContainer>
          <Team>{jobPostInfo.companyName}</Team>
        </InfoContainer>
        <button
          style={{
            position: "absolute",
            bottom: "20px",
            right: "17px",
            width: "33px",
            height: "33px",
          }}
        >
          <img
            src={documentIcon}
            alt="document"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </button>
        <TimePlace>
          {gatheringTime} 예정 <br /> {jobPostInfo.gatheringLocation}
        </TimePlace>
      </RecruitBox>
    </RecruitContainer>
  );
}

export default AdminManageRecruitBox;

const RecruitContainer = styled.div`
  font-variant-numeric: lining-nums proportional-nums;
  font-feature-settings: "dlig" on;
  font-family: Inter;
  font-style: normal;
  line-height: 20px;
  letter-spacing: 0.1px;
  padding-bottom: 23px;
`;

const RecruitBox = styled.div`
  display: flex;
  position: relative;
  width: 365px;
  height: 145px;
  border-radius: 20px;
  background: #302e34;
  box-shadow: 5px 5px 4px 0px #000;
  padding-top: 17px;
  padding-left: 24px;
  box-sizing: border-box;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const MediaSelectorTxt = styled.div`
  color: #8b8b8b;
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
  color: #8b8b8b;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1px;
  position: absolute;
  bottom: 17px;
`;

const TimePlace = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 84px;
  height: 54px;
  flex-shrink: 0;
  border-radius: 5px 20px 5px 5px;
  background: #f5c001;
  color: #fff;
  text-align: center;
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0.11px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
`;
