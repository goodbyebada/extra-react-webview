import { useState } from "react";
import styled from "styled-components";
import RecruitStatus from "@components/custom/recruitStatus";
import { JobPost } from "@api/interface";
import star_g from "@assets/Star_g.png";
import star_y from "@assets/Star_y.png";

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

/**
 * @param param0
 *  navigate props 예시 : ()=>navigate("/")
 *  recruitInfo :  JobPost 객체
 *  recommand : 추천 공고리스트일 경우 true 넣어야함
 *   일반 공고 리스트라면 navigate, recruitInfo만 작성하면 됨
 * @returns 공고 기본 컴포넌트 + 즐겨찾기 기능
 */

const calculateDday = (calendar: string) => {
  const today = new Date();
  const [startCal, endCal] = calendar
    .split("-")
    .map((date) => new Date(`2024/${date.trim()}`));

  const startDiff = Math.ceil((+startCal - +today) / (1000 * 60 * 60 * 24));
  const endDiff = Math.ceil((+endCal - +today) / (1000 * 60 * 60 * 24));

  if (startDiff <= 0 && endDiff >= 0) {
    return "D-day";
  } else if (startDiff > 0) {
    return `D-${startDiff}`;
  } else {
    return "종료";
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

  // 촬영날짜가 1일이라는 가정하에 작성됨
  // 추후 논의 예정
  const dateOfShotting = calenderList[0];

  // 백 형식에 맞게 D-day 수정 필요
  // const dday = calculateDday(calenderList);

  // 임시 Dday for test
  const dday = "D-7";

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
            <DateTxt>{dateOfShotting}</DateTxt>
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
          {gatheringTime} 예정 <br /> {gatheringLocation}
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
