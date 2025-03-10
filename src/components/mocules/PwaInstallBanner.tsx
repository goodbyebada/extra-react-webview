import { BeforeInstallPromptEvent } from "@/global";

import { styled } from "styled-components";
import { IoCloseCircle } from "react-icons/io5";
import { MainButton } from "@components/atoms/Button";

export default function PwaInstallBanner({
  deferredPrompt,
  onClick,
}: {
  deferredPrompt: BeforeInstallPromptEvent | undefined;
  onClick: () => void;
}) {
  return (
    <BannerContainer>
      <button>
        <IoCloseCircle />
        오늘은 안 보기
      </button>

      {!deferredPrompt ? (
        ""
      ) : (
        <MainButton onClick={onClick}>앱으로 설치하기</MainButton>
      )}
    </BannerContainer>
  );
}

const BannerContainer = styled.div`
  background-color: #481632;
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: 0;
  z-index: 20;
  width: 100%;
  /* height: 30%; */
`;
