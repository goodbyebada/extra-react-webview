importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js",
);

// 알림 선택시 이동할 경로
const PATH_AFTER_CLICK_NOTIFICATION = "http://localhost:5173/";

// 프로젝트 고유 식별자로서 공개해도 무관
const firebaseConfig = {
  apiKey: "AIzaSyDS1NhKQw7Zo4pK2T5aBy3cGaebneo-_cM",
  authDomain: "extra-a6046.firebaseapp.com",
  projectId: "extra-a6046",
  storageBucket: "extra-a6046.firebasestorage.app",
  messagingSenderId: "351934910176",
  appId: "1:351934910176:web:3b5d5b2feaf46fa3a28a85",
  measurementId: "G-WBFQPPHVHP",
};

// 서비스워커
self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

// sw.js
self.addEventListener("push", function (event) {
  // console.log(event.data.text());
  const json = event.data.json();
  const data = json.notification;
  const title = data.title;
  const options = {
    body: data.body,
    icon: data.image,
    badge: data.image,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

//  웹 앱 포그라운드, 백그라운드 알림
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// TODO PWA 환경 설정 후 수정예정
function webAppShowNotificaiton() {
  // 임시
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
}

messaging.onMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received Foreground message ",
    payload,
  );
  webAppShowNotificaiton();
});

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  webAppShowNotificaiton();
});

self.addEventListener("notificationclick", (event) => {
  // 알림창 닫음
  event.notification.close();
  event.waitUntil(self.clients.openWindow(PATH_AFTER_CLICK_NOTIFICATION));
});
