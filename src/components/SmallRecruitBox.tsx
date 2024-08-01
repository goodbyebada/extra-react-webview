import React from "react";
import styled from "styled-components";
import RecruitStatus from "@components/custom/smallRecuitStatus";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const StatusRecruitBox: React.FC = () => {
  const recruitStatus = useSelector(
    (state: RootState) => state.recruit.recruitStatus,
  );

  return (
    <RecruitContainer>
      <RecruitBox>
        <InfoContainer>
          <MediaSelectorTxt>Media</MediaSelectorTxt>
          <TitleTxt>Title</TitleTxt>
          <Team>Team</Team>
        </InfoContainer>
        <RecruitStatus
          visible={recruitStatus.pending}
          borderColor="#767676"
          backgroundColor="#d9d9d9"
          color="#000"
          fontSize={"8px"}
        >
          승인 대기
        </RecruitStatus>
        <RecruitStatus
          visible={recruitStatus.rejected}
          borderColor="#F00"
          backgroundColor="#F00"
          color="#FFF"
          fontSize={"10px"}
        >
          미승인
        </RecruitStatus>
        <RecruitStatus
          visible={recruitStatus.approved}
          borderColor="#23D014"
          backgroundColor="#23D014"
          color="#FFF"
          fontSize={"8px"}
        >
          승인 완료
        </RecruitStatus>
        <TimePlace>
          00:00 예정 <br /> place
        </TimePlace>
      </RecruitBox>
    </RecruitContainer>
  );
};

export default StatusRecruitBox;

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
  width: 300px;
  height: 122px;
  border-radius: 20px;
  border: 2px solid #3c3c3c;
  background: #191919;
  box-shadow: 5px 5px 4px 0px #000;
  box-sizing: border-box;
  z-index: 2;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  padding-left: 18px;
  padding-top: 12px;
`;

const MediaSelectorTxt = styled.div`
  color: #868686;
  font-size: 8px;
  font-weight: 900;
`;

const TitleTxt = styled.div`
  color: #fff;
  font-size: 12px;
  font-weight: 900;
`;

const Team = styled.div`
  color: #a7a7a7;
  font-size: 8px;
  font-weight: 700;
  margin-top: auto;
  padding-bottom: 8px;
`;

const TimePlace = styled.div`
  position: absolute;
  top: 14px;
  right: 10px;
  color: #fff;
  text-align: right;
  font-size: 9px;
  font-weight: 500;
  line-height: 15px;
`;
