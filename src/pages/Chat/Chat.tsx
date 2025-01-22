import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  Timestamp,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { MainButton } from "@components/atoms/Button";
import { db } from "@utills/firebase";
import {
  getUserMapByUserIds,
  getChatRoomInfoByChatRoomId,
  getAllOfAmdinOwnedChatRooms,
} from "@utills/chat/get";
import Channel from "@pages/Chat/Chanel";
import { UserFiled } from "@/types/firebase_db";
import { useFirestoreQuery } from "@utills/chat/useFireStoreQuery";
import { ChatRoomInfo } from "@/types/firebase_db";
import { UserDetailsInChat } from "@/types/firebase_db";

export default function Chat() {
  const DUMMY_USER_INFO = {
    user_id: "YCwjfHnfO5ZVsOmMhVhk",
  };

  const DUMMY_ADMIN_INFO = {
    user_id: "TUeqfdxmCeqF7gRE6qQp",
  };
  const [memberInfo, setMemberInfo] = useState(DUMMY_USER_INFO);
  const [adminInfo, setAdminInfo] = useState(DUMMY_ADMIN_INFO);
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [selectedChatsRoomId, setSelectedChatsRoomId] = useState("");
  const [chatUserDetails, setChatUserDetails] = useState<UserDetailsInChat>({
    userInfoMapById: null,
    userList: [],
  });

  const [chatLists, setChatLists] = useState<ChatRoomInfo[]>([]);

  useEffect(() => {
    console.log(chatLists);
  }, [chatLists]);

  async function getMyInfo(isAdmin: boolean, userId: string) {
    const docRef = doc(db, "Users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const myNewData = docSnap.data();

      isAdmin
        ? setAdminInfo((prev) => ({ ...prev, ...myNewData }))
        : setMemberInfo((prev) => ({ ...prev, ...myNewData }));
    } else {
      console.log("no such document");
    }
  }

  const participateChatRoomWithMemeberAccount = () => {
    getMyInfo(false, memberInfo.user_id);
    // setChatt(memberInfo.user_id);
  };

  const participateChatRoomWithAdminAccount = () => {
    getMyInfo(true, adminInfo.user_id);
    setAdminChatLists(adminInfo.user_id);
  };

  const setAdminChatLists = async (userId: string) => {
    const adminOwnedChatRooms = await getAllOfAmdinOwnedChatRooms(userId);

    setChatLists(adminOwnedChatRooms);
  };

  const clickedChattingRoom = async (chatRoom_id: string) => {
    setSelectedChatsRoomId(chatRoom_id);
    setOpenChat(true);

    const { userInfoMapById, userList } =
      await getChatRoomInfoByChatRoomId(chatRoom_id);
    setChatUserDetails((prev) => ({ ...prev, userInfoMapById, userList }));
  };

  return (
    <>
      <div>
        <MainButton onClick={participateChatRoomWithMemeberAccount}>
          보조출연자 계정으로 접속하기
        </MainButton>
        <MainButton onClick={participateChatRoomWithAdminAccount}>
          관리자 계정으로 접속하기
        </MainButton>
      </div>

      <div>
        <h1>현재 참여하는 드라마 채팅방 리스트</h1>
        {chatLists.map((chatInfo, key) => {
          const { name, created_at, chatRoom_id } = chatInfo;
          return (
            <div key={key} onClick={() => clickedChattingRoom(chatRoom_id)}>
              <li>{name}</li>
              <li>{created_at}</li>
            </div>
          );
        })}
      </div>

      {openChat
        ? <button>채팅방 닫기 </button> && (
            <Channel
              chatUserDetails={chatUserDetails}
              myUserId={adminInfo.user_id}
              selectedChatsRoomId={selectedChatsRoomId}
            />
          )
        : ""}
    </>
  );
}
