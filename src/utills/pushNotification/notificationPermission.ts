import { getMessaging, getToken } from "firebase/messaging";
import { initialLizedApp } from "@utills/firebase";

async function registerServiceWorker() {
  try {
    // 서비스워커를 지원하는가
    if ("serviceWorker" in navigator) {
      const res = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
        {
          scope: "/firebase-cloud-messaging-push-scope",
        },
      );

      console.log(res);
      return;
    }

    throw new Error("서비스 워커를 지원하지 않습니다.");
  } catch (e) {
    console.error(e);
  }
}

export default async function handleAllowNotification() {
  // Initialize Firebase
  initialLizedApp;

  const messaging = getMessaging();
  await registerServiceWorker();

  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });

      if (token) {
        // (토큰을 서버로 전송하는 로직)
        console.log(token);
      } else {
        alert("토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요");
      }
    } else if (permission === "denied") {
      alert(
        "web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요",
      );
    }
  } catch (error) {
    console.error("푸시 토큰 가져오는 중에 에러 발생", error);
  }
}
