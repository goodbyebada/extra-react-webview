// PWAInstallBottomSheet.tsx
import { ThemeText } from "@components/atoms/Text";
import { COLORS, COMMON_COLORS } from "@styled/colors";
import styled from "styled-components";
import Text from "@components/atoms/Text";
import Margin from "@components/atoms/Margin";
import useDeferredPrompt from "@customHook/useDeferredPrompt";
import { useEffect, useState } from "react";
import { shutBannerHandler } from "@utills/handleStorage";

const BottomSheetWrapper = styled.div<{ $show: boolean }>`
  display: ${({ $show: $hide }) => ($hide ? "block" : "none")};
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${COLORS.midNightGray};
  padding: 24px 20px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const styledButton = styled.button`
  flex: 1;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
`;

const InstallButton = styled(styledButton)`
  background-color: ${COMMON_COLORS.main};
  color: ${COLORS.black};
`;

const LaterButton = styled(styledButton)`
  background-color: transparent;
  color: ${COLORS.lightGray};
  border: 1px solid ${COLORS.lightGray};
`;

export const PWAInstallBottomSheet = () => {
  const EXPIRIED_MS = 24 * 60 * 60;
  const [show, setShow] = useState<boolean>(false);
  const { handleInstallButton, deferredPrompt, isUnsupportedBrowser } =
    useDeferredPrompt();

  const handleRejectPwaInstallBanner = () => {
    shutBannerHandler.setExpiredTime(EXPIRIED_MS);
    setShow(false);
  };

  useEffect(() => {
    // 만료 시간이 없을 시 (그만 보기 누르지 않았을시)
    if (!shutBannerHandler.hasExpiredTime()) {
      if (isUnsupportedBrowser) {
        setShow(true);
        return;
      }

      if (!isUnsupportedBrowser && deferredPrompt) {
        setShow(true);
        return;
      }
    }

    // 그만 보기를 눌렀고 && 누른 시각이 만료 되었을 시
    if (shutBannerHandler.hasExpiredTime() && shutBannerHandler.isExpired()) {
      setShow(true);
      shutBannerHandler.removeItem();
      return;
    }

    setShow(false);
  }, [isUnsupportedBrowser, deferredPrompt]);

  return (
    <BottomSheetWrapper $show={show}>
      <ThemeText variant={"content-title"}>
        EXTRA 앱 설치를 통해 편리하게 사용해보세요.
      </ThemeText>
      <Margin size={8} />

      <Text size={14} color={COLORS.lightGray}>
        홈 화면에 추가하면 더 빠르게 접속할 수 있어요.
      </Text>
      <Margin size={24} />

      <ButtonGroup>
        <InstallButton onClick={handleInstallButton}>
          {isUnsupportedBrowser ? "추가하기" : "설치하기"}
        </InstallButton>
        <LaterButton onClick={handleRejectPwaInstallBanner}>
          오늘은 그만보기
        </LaterButton>
      </ButtonGroup>
    </BottomSheetWrapper>
  );
};
