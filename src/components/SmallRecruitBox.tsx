import styled from "styled-components";
import RecruitStatus from "@components/custom/smallRecuitStatus";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";
import { MemberRoleFront } from "@api/interface";
import { ScheduleTypeStatusLabel } from "@api/interface";
import gatheringTimeString from "@utills/returnGaterInfo";
import { sendMessage } from "@api/utils";

const SmallRecruitBox = ({ elem }: { elem: MemberRoleFront }) => {
  // const recruitStatus = useSelector(
  //   (state: RootState) => state.recruit.recruitStatus,
  // );

  // 현재 jobList에서 이 날짜의 공고 리스트를 가져온다

  const {
    category,
    title,
    companyName,
    status,
    gatheringTime,
    gatheringLocation,
  } = elem;

  const StatusUI = (label: string) => {
    switch (label) {
      case ScheduleTypeStatusLabel.APPLIED:
        return (
          <RecruitStatus
            visible={true}
            borderColor="#767676"
            backgroundColor="#d9d9d9"
            color="#000"
            fontSize={"8px"}
          >
            승인 대기
          </RecruitStatus>
        );

      case ScheduleTypeStatusLabel.APPROVED:
        return (
          <RecruitStatus
            visible={true}
            borderColor="#23D014"
            backgroundColor="#23D014"
            color="#FFF"
            fontSize={"8px"}
          >
            승인 완료
          </RecruitStatus>
        );
      case ScheduleTypeStatusLabel.REJECTED:
        return (
          <RecruitStatus
            visible={true}
            borderColor="#F00"
            backgroundColor="#F00"
            color="#FFF"
            fontSize={"10px"}
          >
            미승인
          </RecruitStatus>
        );
    }
  };

  return (
    <RecruitContainer
      onClick={() => {
        if (status === ScheduleTypeStatusLabel.APPROVED) {
          sendMessage({
            type: "NAVIGATION_MANAGE",
            payload: {
              jobPostId: elem.jobPostId,
              roleId: elem.id,
              title: elem.title,
            },
            version: "1.0",
          });
        } else {
          sendMessage({
            type: "NAVIGATION_DETAIL",
            payload: {
              uri: `/extra-casting-board/${elem.jobPostId}`,
            },
            version: "1.0",
          });
        }
      }}
    >
      <RecruitBox>
        <InfoContainer>
          <MediaSelectorTxt>{category}</MediaSelectorTxt>
          <TitleTxt>{title}</TitleTxt>
          <Team>{companyName}</Team>
        </InfoContainer>

        {StatusUI(status)}

        <TimePlace>
          {gatheringTimeString(gatheringTime)}
          <br /> {gatheringLocation}
        </TimePlace>
      </RecruitBox>
    </RecruitContainer>
  );
};

export default SmallRecruitBox;

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
