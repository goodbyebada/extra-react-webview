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

class CustomPushEvent extends Event {
  constructor(data) {
    super("push");

    Object.assign(this, data);
    this.custom = true;
  }
}

// 서비스워커
self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

/*
 * Overrides push notification data, to avoid having 'notification' key and firebase blocking
 * the message handler from being called
 */
self.addEventListener("push", (e) => {
  // Skip if event is our own custom event
  if (e.custom) return;

  // Kep old event data to override
  const oldData = e.data;

  // Create a new event to dispatch, pull values from notification key and put it in data key,
  // and then remove notification key
  const newEvent = new CustomPushEvent({
    data: {
      legacy: oldData.json(),
      json() {
        const newData = oldData.json();
        newData.data = {
          ...newData.data,
          ...newData.notification,
        };
        delete newData.notification;
        return newData;
      },
    },
    waitUntil: e.waitUntil.bind(e),
  });

  // Stop event propagation
  e.stopImmediatePropagation();

  // Dispatch the new wrapped event
  dispatchEvent(newEvent);

  const pushData = newEvent.data.json().data;
  const title = pushData.title;
  const options = {
    body: pushData.body,
    icon: pushData.image,
    badge: pushData.image,
  };

  console.log(pushData);
  console.log(title);
  console.log(options);

  newEvent.waitUntil(self.registration.showNotification(title, options));
});

// sw.js
// self.addEventListener("push", function (event) {
//   console.log(event.data.text());
//   console.log("실행!");
//   // const json = event.data.json();
//   // const data = json.notification;
//   // const title = data.title;
//   // const options = {
//   //   body: data.body,
//   //   icon: data.image,
//   //   badge: data.image,
//   // };
//   // event.waitUntil(self.registration.showNotification(title, options));
//   // These are handled by the FCM SDK automatically.
//   // webAppShowNotificaiton("push Message");
// });

//  웹 앱 포그라운드, 백그라운드 알림
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// TODO PWA 환경 설정 후 수정예정
function webAppShowNotificaiton(tmpBody) {
  // 임시
  const notificationTitle = tmpBody + "title";
  const notificationOptions = {
    body: tmpBody,
    icon: "/pwa-64x64.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
}

messaging.onMessage((payload) => {
  console.log("포어그라운드 ", payload);

  const tmpBody = "포어그라운드 ";
  webAppShowNotificaiton(tmpBody);
});

messaging.onBackgroundMessage((payload) => {
  console.log("백그라운드", payload);

  const tmpBody = "백그라운드";
  webAppShowNotificaiton(tmpBody);
});

self.addEventListener("notificationclick", (event) => {
  // 알림창 닫음
  event.notification.close();
  event.waitUntil(self.clients.openWindow(PATH_AFTER_CLICK_NOTIFICATION));
});
