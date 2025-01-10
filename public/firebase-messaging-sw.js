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

console.log("IM TESTING");

function convertNewEvent(e) {
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

  return newEvent;
}

// NOTE pushEvent
/*
 * Overrides push notification data, to avoid having 'notification' key and firebase blocking
 * the message handler from being called
 */
self.addEventListener("push", (e) => {
  // Skip if event is our own custom event
  if (e.custom) return;

  const newEvent = convertNewEvent(e);

  const pushData = newEvent.data.json().data;
  const title = pushData.title;
  const options = {
    body: pushData.body,
    icon: pushData.image,
    badge: pushData.image,
  };

  newEvent.waitUntil(self.registration.showNotification(title, options));
});

//  웹 앱 포그라운드, 백그라운드 알림

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onMessage((payload) => {
  console.log(`FORE_GROUND`, payload);

  const data = payload.notification;

  const title = `FORE_GROUND` + data.title;
  const options = {
    body: data.body,
    icon: data.image,
    badge: data.image,
  };

  self.registration.showNotification(title, options);
});

messaging.onBackgroundMessage((payload) => {
  console.log(`BACK_GROUND`, payload);

  const data = payload.notification;

  const title = `BACK_GROUND` + data.title;
  const options = {
    body: data.body,
    icon: data.image,
    badge: data.image,
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  // 알림창 닫음
  event.notification.close();

  console.log(event);

  event.waitUntil(self.clients.openWindow(PATH_AFTER_CLICK_NOTIFICATION));
});
