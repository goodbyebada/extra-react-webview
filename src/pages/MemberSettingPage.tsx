import { BACKGROUND_COLORS, FONT_COLORS } from "@/styled/colors";
import ToggleButton from "@components/atoms/\bToggleButton";
import { MainButton } from "@components/atoms/Button";
import Container from "@components/atoms/Container";
import Margin from "@components/atoms/Margin";
import Text from "@components/atoms/Text";
import MainWindow from "@components/mocules/MainWindow";
import ScrollingList from "@components/mocules/ScrollingList";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import styled from "styled-components";

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${FONT_COLORS.gray};

  margin: 10px 0;
`;

const MemberSettingPage = () => {
  const [isActiveRecommandNotification, setIsActiveRecommandNotification] =
    useState(false);
  const [isActiveEventNotification, setIsActiveEventNotification] =
    useState(false);

  return (
    <MainWindow bottomNavigationShown={false}>
      <Container alignItems="flex-start">
        <ScrollingList>
          <Text size={20} weight={900}>
            계정 정보
          </Text>
          <Margin size={20} />
          <Container
            alignItems="flex-start"
            background={BACKGROUND_COLORS.card}
            paddingHorizontal={20}
            paddingVertical={20}
            style={{ borderRadius: "15px" }}
          >
            <Container flexDirection="row" justifyContent="space-between">
              <Text size={14}>연동 계정</Text>
              <Text size={14}>Kakao</Text>
            </Container>
            <Divider />
            <Container flexDirection="row" justifyContent="space-between">
              <Text size={14}>abc123@example.com</Text>
              <MainButton
                style={{ width: "57px", height: "26px", margin: "0" }}
                isActive={false}
                onClick={() => {}}
              >
                <Text size={13}>로그아웃</Text>
              </MainButton>
            </Container>
          </Container>
          <Margin size={30} />
          <Text size={20} weight={900}>
            알림 설정
          </Text>
          <Margin size={20} />
          <Container
            alignItems="flex-start"
            background={BACKGROUND_COLORS.card}
            paddingHorizontal={20}
            paddingVertical={20}
            style={{ borderRadius: "15px" }}
          >
            <Container flexDirection="row" justifyContent="space-between">
              <Text size={14}>추천공고 알림</Text>
              <ToggleButton
                isActive={isActiveRecommandNotification}
                onClick={() => {
                  setIsActiveRecommandNotification(
                    !isActiveRecommandNotification,
                  );
                }}
              />
            </Container>
            <Divider />
            <Container flexDirection="row" justifyContent="space-between">
              <Text size={14}>마케팅 및 이벤트 알림</Text>
              <ToggleButton
                isActive={isActiveEventNotification}
                onClick={() => {
                  setIsActiveEventNotification(!isActiveEventNotification);
                }}
              />
            </Container>
          </Container>
          <Margin size={30} />
          <Text size={20} weight={900}>
            이용 약관
          </Text>
          <Margin size={20} />
          <Container
            alignItems="flex-start"
            background={BACKGROUND_COLORS.card}
            paddingHorizontal={20}
            paddingVertical={20}
            style={{ borderRadius: "15px" }}
          >
            <Container
              flexDirection="row"
              justifyContent="space-between"
              onClick={() => {}}
            >
              <Text size={14}>이용 약관</Text>
              <FaAngleRight />
            </Container>
            <Divider />
            <Container
              flexDirection="row"
              justifyContent="space-between"
              onClick={() => {}}
            >
              <Text size={14}>개인정보 처리 방침</Text>
              <FaAngleRight />
            </Container>
            <Divider />
            <Container
              flexDirection="row"
              justifyContent="space-between"
              onClick={() => {}}
            >
              <Text size={14}>위치 서비스 이용 약관</Text>
              <FaAngleRight />
            </Container>
          </Container>
          <Margin size={30} />
          <Text size={20} weight={900}>
            고객 센터
          </Text>
          <Margin size={20} />
          <Container
            alignItems="flex-start"
            background={BACKGROUND_COLORS.card}
            paddingHorizontal={20}
            paddingVertical={20}
            style={{ borderRadius: "15px" }}
          >
            <Container
              flexDirection="row"
              justifyContent="space-between"
              onClick={() => {}}
            >
              <Text size={14}>회사 소개</Text>
              <FaAngleRight />
            </Container>
            <Divider />
            <Container
              flexDirection="row"
              justifyContent="space-between"
              onClick={() => {}}
            >
              <Text size={14}>공지사항 및 이벤트</Text>
              <FaAngleRight />
            </Container>
            <Divider />
            <Container
              flexDirection="row"
              justifyContent="space-between"
              onClick={() => {}}
            >
              <Text size={14}>고객센터</Text>
              <FaAngleRight />
            </Container>
          </Container>
          <Margin size={30} />
          <Text size={20} weight={900}>
            고객 센터
          </Text>
          <Margin size={20} />
          <Container
            alignItems="flex-start"
            background={BACKGROUND_COLORS.card}
            paddingHorizontal={20}
            paddingVertical={20}
            style={{ borderRadius: "15px" }}
          >
            <Container
              flexDirection="row"
              justifyContent="space-between"
              onClick={() => {}}
            >
              <Text size={14}>0.2.2</Text>
            </Container>
          </Container>
        </ScrollingList>
      </Container>
    </MainWindow>
  );
};

export default MemberSettingPage;
