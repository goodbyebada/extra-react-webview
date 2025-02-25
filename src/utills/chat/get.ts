import { db } from "@utills/firebase";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import {
  ChatRoomInfo,
  UserDetailsInChat,
  ChatRoomsMessageField,
  ChatRoomField,
} from "@/types/firebase_db";
import { documentId } from "firebase/firestore";

/**
 *  chatRoomUsersList를 먼저 확인해야함
 * chatRoomUsersList.len === 0 -> map == null
 * @param chatRoom_id
 * @returns
 */
export async function getChatRoomUserDetailsByChatRoomId(
  chatRoom_id: string,
): Promise<UserDetailsInChat | null> {
  let userList = await getDramaChatRoomUsersList(chatRoom_id);
  let userInfoMapById;

  if (!userList) {
    userList = [];

    return null;
  }

  if (userList && userList.length !== 0) {
    userInfoMapById = await getUserMapByUserIds(userList);

    return {
      userInfoMapById,
      userIdList: userList,
    };
  }

  return null;
}

// Admin(관리자 계정)

/**
 *
 * @param userId
 * @returns 관리자가 userId인 드라마 id 리스트
 */
export async function getDramaIdsByAdmin(userId: string) {
  const q = query(collection(db, "Drama"), where("admin", "==", userId));
  const querySnapshot = await getDocs(q);
  const dramaIdList: string[] = [];
  querySnapshot.forEach((doc) => {
    dramaIdList.push(doc.id);
  });

  return dramaIdList;
}

/**
 * 관리자가 담당하는 drama 채팅방 정보들
 */
export async function getAllOfAmdinOwnedChatRooms(adminId: string) {
  const q = query(
    collection(db, "ChatRooms"),
    where("admin_ids", "array-contains", adminId),
  );
  const querySnapshot = await getDocs(q);

  const adminOwnedChatRooms: ChatRoomInfo[] = [];

  querySnapshot.forEach((doc) => {
    const { drama_id, name, admin_ids, created_at } = doc.data();
    const chatRoomInfo: ChatRoomInfo = {
      chatRoom_id: doc.id,
      drama_id,
      name,
      admin_ids,
      created_at,
    };
    adminOwnedChatRooms.push(chatRoomInfo);
  });

  return adminOwnedChatRooms;
}

/**
 *
 * @param dramaId
 * @returns dramaId (해당 드라마의 채팅방 정보 )
 */
export async function getChatRoomInfoByDramaId(dramaId: string) {
  const q = query(
    collection(db, "ChatRooms"),
    where("drama_id", "==", dramaId),
  );

  const querySnapshot = await getDocs(q);

  let chatRoomInfo: ChatRoomInfo = {
    chatRoom_id: "",
    drama_id: "",
    name: "",
    admin_ids: [],
    created_at: "",
  };

  querySnapshot.forEach((doc) => {
    chatRoomInfo.chatRoom_id = doc.id;
    chatRoomInfo = { ...chatRoomInfo, ...doc.data() };
  });

  return chatRoomInfo;
}

/**
 *
 * @param dramaId
 * @returns dramaId (해당 드라마의 채팅방 정보 )
 */
export async function getChatRoomInfoByChatRoomId(chatRoomId: string) {
  const docRef = doc(db, "ChatRooms", chatRoomId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as ChatRoomField;
  } else {
    return null;
  }
}

async function getDramaChatRoomUsersList(
  chatRoomId: string,
): Promise<string[] | null> {
  const docRef = doc(db, "ChatRoomUsers", chatRoomId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().user_id;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
}

async function getMessagesInChatsRoom(chatRoomId: string) {
  // TODO m1 path는 임시 추후 수정예정
  // -> 로직 수정해야함
  const colloectionRef = collection(db, "Messages", chatRoomId, "m1");

  const q = query(colloectionRef, orderBy("created_at"));
  const querySnapshot = await getDocs(q);

  const messagesList: ChatRoomsMessageField[] = [];

  querySnapshot.forEach((doc) => {
    console.log("채팅방", doc.data());
    const { user_id, message, created_at } = doc.data();

    const messageObj: ChatRoomsMessageField = {
      user_id,
      message,
      created_at,
    };
    // console.log(created_at.toDate());
    // TODO 이렇게 사용하려면 ChatRoomsMessageField 수정해야함

    messagesList.push(messageObj);
  });

  return messagesList;
}

/**
 * 채팅 방에 참여중인 참여자들의 정보 가져오기
 * @param userIds
 * @returns
 */
export async function getUserMapByUserIds(userIds: string[]) {
  //documentID가 userID이다.
  const q = query(collection(db, "Users"), where(documentId(), "in", userIds));
  const querySnapshot = await getDocs(q);
  const userMap = new Map();

  querySnapshot.forEach((doc) => {
    userMap.set(doc.id, doc.data());
  });

  return userMap;
}

// new Date() 형식으로 올라가있던 created_at TimeStamp로 모두 통일
export async function updateTimeDateToTimeStamp(chatRoomId: string) {
  const colloectionRef = collection(db, "Messages", chatRoomId, "m1");
  const querySnapshot = await getDocs(colloectionRef);

  const filteredDocs = querySnapshot.docs.filter((doc) => {
    const data = doc.data();
    return typeof data.created_at === "string";
  });

  // id 반환
  // doc id에 접근해
  //  저장된 new Date() ->timestamp로 업데이트 할 수는 없나?

  const list: {
    id: string;
    created_at: string;
  }[] = [];
  filteredDocs.forEach((elem) => {
    list.push({
      id: elem.id,
      created_at: elem.data().created_at,
    });
  });

  list.forEach(async ({ id, created_at }) => {
    const frankDocRef = doc(db, "Messages", chatRoomId, "m1", id);
    await updateDoc(frankDocRef, {
      created_at: Timestamp.fromDate(new Date(created_at)),
    });
  });
}

// TODO 캐싱 로직
// const userCache = {};
// // user 캐싱
// async function getUser(userId: string) {
//   if (userCache[userId]) {
//     return userCache[userId];
//   }
//   const userDoc = await firestore.collection("users").doc(userId).get();
//   const userData = userDoc.data();
//   userCache[userId] = userData;
//   return userData;
// }
