// TODO 추후 파일 폴더 옮길 예정

import { db } from "@utills/firebase";
import { doc, getDoc, addDoc } from "firebase/firestore";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import {
  ChatRoomInfo,
  UserDetailsInChat,
  ChatRoomsMessageField,
} from "@/types/firebase_db";
import { FieldPath } from "firebase/firestore/lite";
import firebase from "firebase/compat/app";
import { documentId } from "firebase/firestore";


/**
 *  chatRoomUsersList를 먼저 확인해야함
 * chatRoomUsersList.len === 0 -> map == null
 * @param chatRoom_id
 * @returns
 */
export async function getChatRoomInfoByChatRoomId(
  chatRoom_id: string,
): Promise<UserDetailsInChat> {
  let userList = await getDramaChatRoomUsersList(chatRoom_id);
  let userInfoMapById;

  if (!userList) {
    userList = [];
  }

  if (userList && userList.length !== 0) {
    userInfoMapById = await getUserMapByUserIds(userList);
  } else {
    userInfoMapById = null;
  }

  return {
    userInfoMapById,
    userList,
  };
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
async function getChatRoomInfoByDramaId(dramaId: string) {
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
  console.log("userIds", userIds);

  //documentID가 userID이다.
  const q = query(collection(db, "Users"), where(documentId(), "in", userIds));
  const querySnapshot = await getDocs(q);
  const userMap = new Map();

  querySnapshot.forEach((doc) => {
    userMap.set(doc.id, doc.data());
  });

  return userMap;
}

