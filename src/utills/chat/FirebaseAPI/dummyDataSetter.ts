import { doc, setDoc } from "firebase/firestore";
import { db } from "@utills/firebase";
import { DUMMY_FIREBASE_DB_LIST } from "@/mocks/dummyChatData";

/**
 * 파이어베이스에 dummyData 세팅하는 utils
 */

export const FirebaseDummyDataSetter = {
  setUsersData,
  setChatRoomsData,
  setChatRoomsUsersData,
};

// firebase doc Id string으로 밖에 안된다.
async function setUsersData() {
  const promises = DUMMY_FIREBASE_DB_LIST.DUMMY_USER_FILED_LIST.map(
    (elem, key) => setDoc(doc(db, "Users", (key + 1).toString()), elem),
  );

  await Promise.all(promises);
}

async function setChatRoomsData() {
  const promises = DUMMY_FIREBASE_DB_LIST.DUMMY_CHAT_ROOMS.map((elem, key) =>
    setDoc(doc(db, "ChatRooms", (key + 1).toString()), elem),
  );

  await Promise.all(promises);
}

async function setChatRoomsUsersData() {
  const promises = DUMMY_FIREBASE_DB_LIST.DUMMY_CHAT_ROOM_USERS.map(
    (elem, key) => setDoc(doc(db, "ChatRoomUsers", (key + 1).toString()), elem),
  );

  await Promise.all(promises);
}
