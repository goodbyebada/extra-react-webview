import { db } from "@utills/firebase";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  ChatRoomInfo,
  ChatRoomsField,
  ChatRoomInfoFrontend,
  ParticipantInfoList,
  UserFiled,
} from "@type/firebaseInterface";

/**
 *
 * @param workId(작품 id)
 * @returns chatRoomId List  (해당 드라마의 채팅방 Id )
 *
 * 하나의 work_id 에 하나의 chat_room_id 이지만,
 * 파이어베이스 쿼리문 컨벤션에 인해 list return
 */
export async function getChatRoomIds(workId: number): Promise<number[]> {
  const q = query(collection(db, "ChatRooms"), where("work_id", "==", workId));
  const querySnapshot = await getDocs(q);

  const chatRoomIds: number[] = [];
  querySnapshot.forEach((doc) => {
    const chatRoomId = Number(doc.id);

    chatRoomIds.push(chatRoomId);
  });

  return chatRoomIds;
}

export async function checkUserExists(userId: number) {
  try {
    const user_id = userId.toString();
    const docRef = doc(db, "Users", user_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() as UserFiled };
    } else {
      return { success: false, error: "사용자 정보가 없습니다." };
    }
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "알 수 없는 오류 발생",
    };
  }
}

/**
 * 관리자가 담당하는 work(작품) 채팅방 정보들
 */
export async function getManagedChatRoomInfoList(
  adminId: number,
): Promise<ChatRoomInfoFrontend[]> {
  const q = query(
    collection(db, "ChatRooms"),
    where("admin_ids", "array-contains", adminId),
  );
  const querySnapshot = await getDocs(q);

  const managedChatRoomsInfoList: ChatRoomInfoFrontend[] = [];

  querySnapshot.forEach((doc) => {
    const { work_id, work_title, admin_ids, created_at } = doc.data();

    // 숫자가 아니라면 -1 값을 넣는다.
    const chatRoomInfo: ChatRoomInfoFrontend = {
      chat_room_id: !Number.isNaN(doc.id) ? Number(doc.id) : -1,
      work_id,
      work_title,
      admin_ids,
      created_at,
    };
    managedChatRoomsInfoList.push(chatRoomInfo);
  });

  return managedChatRoomsInfoList;
}

/**
 * 관리자가 담당하는 work(작품) 채팅방 ID List
 */
export async function getManagedChatRoomIdList(
  adminId: number,
): Promise<number[]> {
  const q = query(
    collection(db, "ChatRooms"),
    where("admin_ids", "array-contains", adminId),
  );
  const querySnapshot = await getDocs(q);

  const managedChatRoomsIdList: number[] = [];

  querySnapshot.forEach((doc) => {
    // 숫자가 아니라면 -1 값을 넣는다.
    // 숫자가 아닌 값 chatRoomId임을 방지
    const chatRoomId: number = !Number.isNaN(doc.id) ? Number(doc.id) : -1;

    managedChatRoomsIdList.push(chatRoomId);
  });

  return managedChatRoomsIdList;
}

/**
 *
 * @param workId(작품 id)
 * @returns chatRoomInfo (해당 드라마의 채팅방 정보 )
 */
export async function getChatRoomInfoByDramaChatId(workId: number) {
  // 파이어베이스에서의 work_id === workId (드라마의 채팅 아이디)
  const q = query(collection(db, "ChatRooms"), where("work_id", "==", workId));

  const querySnapshot = await getDocs(q);

  let chatRoomInfo: ChatRoomInfo = {
    chat_room_id: "",
    work_id: 0,
    work_title: "",
    admin_ids: [],
    created_at: "",
  };

  querySnapshot.forEach((doc) => {
    chatRoomInfo.chat_room_id = doc.id;
    chatRoomInfo = { ...chatRoomInfo, ...doc.data() };
  });

  return chatRoomInfo;
}

/**
 *
 * @param chatRoomId
 * @returns 해당 작품(드라마/영화)의 채팅방 정보
 * 예시 
 * {
      work_id: id,
      work_title: title,
      created_at: calenderList[0],
      admin_ids: [tmp_admin_ids],
    };
 */
export async function getChatRoomInfoByChatRoomId(
  chatRoomId: number,
): Promise<ChatRoomsField | null> {
  const chat_room_id = chatRoomId.toString();
  const docRef = doc(db, "ChatRooms", chat_room_id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as ChatRoomsField;
  } else {
    return null;
  }
}

export async function getUserInfoByUserId(
  userId: number,
): Promise<UserFiled | null> {
  const user_id = userId.toString();
  const docRef = doc(db, "Users", user_id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserFiled;
  } else {
    return null;
  }
}

/**
 * ChatRoomUsers collection에서
 * ChatRoomId(documentId)에 참여하는 참여자들 정보 list return
 *
 *  docSnap.data() = {
 *      user_list_in_chat,
 *      work_id
 * }
 * @param chatRoomId
 * @returns
 */
export async function getParticipantInfoList(
  chatRoomId: number,
): Promise<ParticipantInfoList | null> {
  const chat_room_id = chatRoomId.toString();
  const docRef = doc(db, "ChatRoomUsers", chat_room_id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log(docSnap.data());
    return docSnap.data().participant_info_list;
  } else {
    console.log("No such document!");
    return null;
  }
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
