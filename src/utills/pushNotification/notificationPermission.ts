import { getMessaging, getToken } from "firebase/messaging";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS1NhKQw7Zo4pK2T5aBy3cGaebneo-_cM",
  authDomain: "extra-a6046.firebaseapp.com",
  projectId: "extra-a6046",
  storageBucket: "extra-a6046.firebasestorage.app",
  messagingSenderId: "351934910176",
  appId: "1:351934910176:web:3b5d5b2feaf46fa3a28a85",
  measurementId: "G-WBFQPPHVHP",
};

// const analytics = getAnalytics(app);

// TODO env 파일로 옮길 것

async function registerServiceWorker() {
  try {
    // 서비스워커를 지원하는가
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
        scope: "/firebase-cloud-messaging-push-scope",
      });
      return;
    }

    throw new Error("서비스 워커를 지원하지 않습니다.");
  } catch (e) {
    console.error(e);
  }
}

export default async function handleAllowNotification() {
  // Initialize Firebase
  initializeApp(firebaseConfig);
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
