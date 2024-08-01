import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { toggleStar } from "@redux/recruitSlice";
import { RootState } from "@redux/store";
import RecruitStatus from "@components/custom/recruitStatus";
import { JobPost } from "@api/dummyData";

type Props = {
  navigate: () => void;
  recruitInfo: JobPost;
};

function HomeRecruitBox({ navigate, recruitInfo }: Props) {
  const dispatch = useDispatch();
  const star = useSelector((state: RootState) => state.recruit.star);

  const handleStarClick = () => {
    dispatch(toggleStar());
  };

  const {
    category,
    drama_title,
    calendar,
    company_name,
    gathering_time,
    gathering_location,
  } = recruitInfo;

  /**
   * 수정 해야할 것
   *
   * 1. <RecruitContainer>와 같은 wrapper에 (버튼 전체에) onClick={navigate} 이벤트 추가하였을시,
   *  starIcon 눌렀을때 페이지 이동 됨, 임시로 중첩되지 않게 TitleTxt에 이벤트 추가하였음.
   *
   * 2. D-0 로직은 작성하지 않았음, 추후 작성 예정
   *
   */

  return (
    <RecruitContainer>
      <RecruitBox>
        <InfoContainer>
          <MediaSelectorTxt>{category}</MediaSelectorTxt>
          <StarIcon src={star} onClick={handleStarClick} />
          <TitleTxt onClick={navigate}>{drama_title}</TitleTxt>
          <DateAndDeadlineContainer>
            <DateTxt>{calendar}</DateTxt>
            <DeadlineBox>D-0</DeadlineBox>
          </DateAndDeadlineContainer>
          <Team>{company_name}</Team>
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
          {gathering_time} 예정 <br /> {gathering_location}
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
  border: 2px solid #3c3c3c;
  background: #191919;
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

const StarIcon = styled.img`
  position: absolute;
  top: 18px;
  right: 10px;
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
