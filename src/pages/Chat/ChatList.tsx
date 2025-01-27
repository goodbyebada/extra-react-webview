import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { MainButton } from "@components/atoms/Button";
import { db } from "@utills/firebase";
import {
  getChatRoomUserDetailsByChatRoomId,
  getAllOfAmdinOwnedChatRooms,
  getChatRoomInfoByDramaId,
} from "@utills/chat/get";
import Channel from "@pages/Chat/Chanel";

import { ChatRoomInfo } from "@/types/firebase_db";
import { UserDetailsInChat } from "@/types/firebase_db";
import { useNavigate } from "react-router-dom";

export default function ChatList() {
  const navigate = useNavigate();
  /**
   * 보조 출연자 시나리오
   * 선택한 드라마의 채팅방에 입장할 수 있다.
   * -> drama_id 에 대한 chatRoom_id를 찾아 리스너를 달아준다.
   * -> 바로 채팅방이 나오게 한다.
   */
  const DUMMY_USER_INFO = {
    user_id: "YCwjfHnfO5ZVsOmMhVhk",
    drama_id: "drama000",
  };

  /**
   * 관리자 시나리오
   * : 본인 담당 채팅방 리스트 중 하나를 선택해 들어간다.
   */
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

  // 관리자용
  const [chatLists, setChatLists] = useState<ChatRoomInfo[]>([]);

  // 사용자용
  const [enterChat, setEnterChat] = useState<boolean>(false);
  const [memeberChatRoomsInfo, setMemberChatRoomsInfo] = useState<ChatRoomInfo>(
    {
      chatRoom_id: "",
      drama_id: "",
      name: "",
      admin_ids: [""],
      created_at: "",
    },
  );

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

  // 임시로 페이지 이동을 위해 sessionStorage에 저장함
  const storeChatRoomInfoAtSessionStorage = (
    chatUserDetails: UserDetailsInChat,
    userId: string,
    chatRoomInfo: ChatRoomInfo,
  ) => {
    sessionStorage.setItem("chatUserDetails", JSON.stringify(chatUserDetails));
    sessionStorage.setItem("myUserId", userId);
    sessionStorage.setItem("chatRoomInfo", JSON.stringify(chatRoomInfo));
  };

  const participateChatRoomWithMemeberAccount = () => {
    getChattingRoomInfoByDramaId(memberInfo.drama_id);
  };

  const participateChatRoomWithAdminAccount = () => {
    getMyInfo(true, adminInfo.user_id);
    setAdminChatLists(adminInfo.user_id);
  };

  const setAdminChatLists = async (userId: string) => {
    const adminOwnedChatRooms = await getAllOfAmdinOwnedChatRooms(userId);
    setChatLists(adminOwnedChatRooms);
  };

  const getChattingRoomInfoByDramaId = async (dramaId: string) => {
    const chatRoomInfo = await getChatRoomInfoByDramaId(dramaId);
    // const chatUserDetails = await getChatRoomInfoByChatRoomId(
    //   chatRoomInfo.chatRoom_id,
    // );

    storeChatRoomInfoAtSessionStorage(
      chatUserDetails,
      memberInfo.user_id,
      chatRoomInfo,
    );
    navigateToChatRoom();
  };

  const navigateToChatRoom = () => {
    const chatRoomInfoString = sessionStorage.getItem("chatRoomInfo");
    if (chatRoomInfoString && chatRoomInfoString !== "") {
      const json = JSON.parse(chatRoomInfoString);
      navigate(`/chatRoom/channel/${json.chatRoom_id}`);
    }
  };

  const clickedChattingRoom = async (chatRoom_id: string) => {
    setSelectedChatsRoomId(chatRoom_id);
    setOpenChat(true);

    const { userInfoMapById, userList } =
      await getChatRoomUserDetailsByChatRoomId(chatRoom_id);
    setChatUserDetails((prev) => ({ ...prev, userInfoMapById, userList }));
  };

  return (
    <>
      <div>
        <MainButton onClick={participateChatRoomWithMemeberAccount}>
          보조출연자 계정으로 drama001 방 채팅 참여하기
        </MainButton>
        <MainButton onClick={participateChatRoomWithAdminAccount}>
          관리자 계정으로 접속하기
        </MainButton>
      </div>

      <div>
        <h1>현재 참여하는 드라마 채팅방 리스트(관리자용)</h1>
        {chatLists.map((chatInfo, key) => {
          const { name, created_at, chatRoom_id } = chatInfo;
          return (
            <div key={key} onClick={() => clickedChattingRoom(chatRoom_id)}>
              <li>{name}</li>
              {created_at}
            </div>
          );
        })}
      </div>

      {openChat ? (
        <div>
          <button onClick={() => setOpenChat(false)}>채팅방 닫기 </button>
          <Channel
            chatUserDetails={chatUserDetails}
            myUserId={adminInfo.user_id}
            selectedChatsRoomId={selectedChatsRoomId}
          />
        </div>
      ) : (
        ""
      )}

      {enterChat && memeberChatRoomsInfo.chatRoom_id ? (
        <div>
          <button
            onClick={() => {
              setEnterChat(false);
            }}
          >
            채팅방 닫기
          </button>
          <Channel
            chatUserDetails={chatUserDetails}
            myUserId={memberInfo.user_id}
            selectedChatsRoomId={memeberChatRoomsInfo.chatRoom_id}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
