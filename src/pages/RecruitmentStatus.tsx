/**
 * 공고 업체 측에서 볼 수 있는 지원 현황 화면
 */

import { CompanyNavBar } from "@components/mocules/navBar/CompanyNavBar";
import Text, { ThemeText } from "@components/atoms/Text";
import { COLORS } from "@/styled/colors";
import { LineWrapper } from "@components/atoms/Wrapper";
import { styled } from "styled-components";

export default function RecruitmentStatus() {
  const tmpData = {
    title: "EXTRA DRAMA",
    time: {
      hour: 7,
      min: 30,
    },
    location: "여의도역 7번 출구 ",
  };

  const { title, time, location } = tmpData;
  const { hour, min } = time;

  return (
    <>
      <CompanyNavBar fixed={true}>
        <Text weight={900} color={COLORS.darkGray}>
          모집 공고
        </Text>
        <Text weight={900} color={COLORS.darkGray}>
          드라마
        </Text>
      </CompanyNavBar>
      <ContentWrapper>
        {/* 제목 */}
        <LineWrapper>
          <Text size={40} highlight={true} weight={700}>
            {title}
          </Text>
        </LineWrapper>
        {/* 장소 */}

        <LineWrapper>
          <InfoWrapper>
            <ThemeText variant={"item-title"}>
              {hour.toString().padStart(2, "0")}:
              {min.toString().padStart(2, "0")} 예정
            </ThemeText>
            <ThemeText variant={"item-title"}>{location}</ThemeText>
          </InfoWrapper>
        </LineWrapper>

        {/* 역할 컴포넌트 */}
      </ContentWrapper>
    </>
  );
}

const ContentWrapper = styled.div`
  margin-top: 5rem;
`;

const InfoWrapper = styled.div`
  width: 100%;
  padding: 10px 30px;
`;
