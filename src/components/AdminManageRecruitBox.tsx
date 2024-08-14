import styled from "styled-components";
import documentIcon from "@assets/document.png";
import { JobPost } from "@api/interface";

type Props = {
  navigate: () => void;
  jobPostInfo: JobPost;
};

function AdminManageRecruitBox({ navigate, jobPostInfo }: Props) {
  // calendar가 '2020-01-01'일 경우로 구현

  // 01/01 형태로 받아오기
  const getMMDD = (calendar: string) => {
    const date = new Date(calendar);

    const mm = date.getMonth();
    const dd = date.getDate();

    return mm + "/" + dd;
  };

  // D-Day 계산
  const getDaysUntil = (calender: string) => {
    // 오늘 날짜 가져오기
    const today = new Date();

    // 입력받은 날짜 Date 타입으로 변환
    const targetDate = new Date(calender);

    // 날짜 차이 계산 (밀리초 단위로 계산 후 일 단위로 변환)
    const differenceInTime = targetDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(
      differenceInTime / (1000 * 60 * 60 * 24),
    );

    if (differenceInDays > 0) {
      return `D-${differenceInDays}`;
    } else if (differenceInDays === 0) {
      return `D-Day`;
    } else {
      return `D+${Math.abs(differenceInDays)}`;
    }
  };

  return (
    <RecruitContainer onClick={navigate}>
      <RecruitBox>
        <InfoContainer>
          <MediaSelectorTxt>{jobPostInfo.category}</MediaSelectorTxt>
          <TitleTxt>{jobPostInfo.title}</TitleTxt>
          <DateAndDeadlineContainer>
            {/* calendar가 '2001-01-01'일 경우로 구현함 */}
            {/* calendarList일 경우 => getMMDD(jobPostInfo.calendarList[0]) + " - " + getMMDD(jobPostInfo.calendarList[jobPostInfo.calendarList.length - 1])  */}
            <DateTxt>{getMMDD(jobPostInfo.calendar)}</DateTxt>
            {/* calendarList일 경우 => getDaysUntil(jobPostInfo.calendarList[0])  */}
            <DeadlineBox>{getDaysUntil(jobPostInfo.calendar)}</DeadlineBox>
          </DateAndDeadlineContainer>
          <Team>{jobPostInfo.company_name}</Team>
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
          {jobPostInfo.gathering_time} 예정 <br />{" "}
          {jobPostInfo.gathering_location}
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
