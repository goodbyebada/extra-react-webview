import { StarToggleButton } from "@components/atoms/Button";
import styled from "styled-components";
import { ThemeText } from "@components/atoms/Text";
import Container from "@components/atoms/Container";
import { ContentWrapper } from "@components/atoms/Wrapper";
import { COLORS } from "@styled/colors";
import { FaMapMarkedAlt } from "react-icons/fa";

interface ShootScheduleProps {
  gatheringTime: string;
  gatheringLocation: string;
  dateOfShotting: string;
  handleStarClick: () => void;
  isStarActive: boolean;
  status: boolean;
  handleMapClick: () => void;
}

/**
 * 공고 페이지에,
 * 모이는 시간, 장소,진행 날짜, 모집 상태, 즐겨찾기 정보를 표시하는 UI이다.
 * @param param0
 * @returns
 */
export default function ShootSchedule({
  gatheringTime,
  gatheringLocation,
  dateOfShotting,
  handleStarClick,
  isStarActive,
  status,
  handleMapClick,
}: ShootScheduleProps) {
  return (
    <ShootingSchedule className="shooting-schedule">
      <ContentWrapper>
        <ThemeText variant={"item-title"}>{gatheringTime} 예정</ThemeText>
        <ThemeText variant={"item-title"}>{gatheringLocation}</ThemeText>
        <FaMapMarkedAlt
          onClick={handleMapClick}
          size={30}
          style={{ margin: "-5px 15px" }}
        />
      </ContentWrapper>

      <ContentWrapper>
        <Container alignItems={"flex-end"}>
          <StarToggleButton onClick={handleStarClick} isActive={isStarActive} />
        </Container>

        <ContentWrapper marginTop="10px">
          <ShootDate>{dateOfShotting}</ShootDate>
          <Status>{status ? "모집중" : "모집완료"}</Status>
        </ContentWrapper>
      </ContentWrapper>
    </ShootingSchedule>
  );
}

const ShootingSchedule = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 120px;
  border: 1px solid #bababa;
  background: #000;
  z-index: 9;
  line-height: 30px;

  position: sticky;

  /* TODO 내비게이션 바 높이 상수화 */
  /* 네비게이션 바 높이 고정 */
  top: 80px;
`;

const ShootDate = styled.span`
  font-weight: 900;
  display: inline-block;
`;

const Status = styled.span`
  color: ${COLORS.black};

  -webkit-text-stroke-width: 1;
  -webkit-text-stroke-color: ${COLORS.yellow};

  width: fit-content;

  font-size: 12px;
  font-weight: 900;

  border-radius: 20px;
  background: ${COLORS.yellow};

  padding: 3px;
  margin-left: 8px;
`;
