import { styled } from "styled-components";
import { IoCloseCircle } from "react-icons/io5";
import { BoxButton, MainButton } from "@components/atoms/Button";
import { useEffect, useState } from "react";
import { shutBannerHandler } from "@utills/handleStorage";
import { ThemeText } from "@components/atoms/Text";
import useDeferredPrompt from "@customHook/useDeferredPrompt";
import { BACKGROUND_COLORS, COMMON_COLORS } from "@styled/colors";

const EXPIRIED_MS = 24 * 60 * 60;

export default function PwaInstallBanner() {
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
    <BannerContainer $show={show}>
      <Banner>
        <ThemeText variant={"content-title"}>
          EXTRA 앱 설치를 통해 편리하게 사용해보세요.
        </ThemeText>

        <ButtonWrapper>
          <MainButton onClick={handleInstallButton}>
            {isUnsupportedBrowser ? "홈 화면에 추가하기" : "앱으로 설치하기"}
          </MainButton>
        </ButtonWrapper>

        <BoxButton onClick={handleRejectPwaInstallBanner}>
          <IoCloseCircle />
          오늘은 그만 보기
        </BoxButton>
      </Banner>
    </BannerContainer>
  );
}

const BannerContainer = styled.div<{ $show: boolean }>`
  /* background-color: #a6236499; */
  display: ${({ $show: $hide }) => ($hide ? "flex" : "none")};
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  bottom: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
`;

const Banner = styled.div`
  background-color: ${BACKGROUND_COLORS.default};
  display: flex;
  flex-direction: column;

  align-self: center;

  justify-items: center;
  align-items: center;

  width: 90%;
  height: 40%;

  padding: 30px;
  margin-bottom: 30px;

  border-style: solid;
  border-radius: 80px;
  border-color: ${COMMON_COLORS.main};
`;

const ButtonWrapper = styled.div`
  height: 30%;
  margin: 30px 0px;

  & > * {
    width: 200px;
  }
`;
