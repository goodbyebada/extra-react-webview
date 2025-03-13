// import { BeforeInstallPromptEvent } from "@/global";

import { checkUnsupportedBrowser } from "@utills/checkUnsupportedBrowser";
import { useState, useEffect } from "react";
import { BeforeInstallPromptEvent } from "@type/shared";

type UseDeferredPromptReturn = {
  handleInstallButton: () => Promise<void>;
  deferredPrompt: BeforeInstallPromptEvent | undefined;
  isUnsupportedBrowser: boolean;
};

const useDeferredPrompt = (): UseDeferredPromptReturn => {
  const [deferredPrompt, setDeferredPrompt] = useState<
    BeforeInstallPromptEvent | undefined
  >(undefined);
  const isUnsupportedBrowser = checkUnsupportedBrowser();

  const handleUnSupportedInstallButton = async () => {
    alert(
      "공유 아이콘 -> 홈 화면에 추가를 클릭해 앱으로 편리하게 이용해보세요!",
    );
  };

  const handleSupportedInstallButton = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === "accepted") {
        setDeferredPrompt(undefined);
      }
    } else {
      alert("이미 저희 서비스를 설치해주셨어요!");
    }
  };

  useEffect(() => {
    if (isUnsupportedBrowser) {
      return;
    }

    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setDeferredPrompt(event);

      console.log(`BeforeInstallPromptEvent 이벤트 객체 `, event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, [isUnsupportedBrowser]);

  const handleInstallButton = isUnsupportedBrowser
    ? handleUnSupportedInstallButton
    : handleSupportedInstallButton;

  return { handleInstallButton, deferredPrompt, isUnsupportedBrowser };
};

export default useDeferredPrompt;
