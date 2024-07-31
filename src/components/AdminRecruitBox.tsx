import styled from "styled-components";
import RecruitStatus from "./custom/recruitStatus";

function HomeRecruitBox() {
  return (
    <RecruitContainer>
      <RecruitBox>
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
          visible={true}
          borderColor="#767676"
          backgroundColor="#d9d9d9"
          color="#000"
          fontSize={"12px"}
        >
          모집중
        </RecruitStatus>
        <TimePlace>
          00:00 예정 <br /> place
        </TimePlace>
      </RecruitBox>
    </RecruitContainer>
  );
}

export default HomeRecruitBox;

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
