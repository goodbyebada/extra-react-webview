import { NavBar } from "@components/mocules/navBar/CommonNavBar";
import Text from "@components/atoms/Text";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { FONT_COLORS } from "@styled/colors";
import Container from "@components/atoms/Container";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ChatRoomsField,
  ParticipantInfoList,
  UserFiled,
} from "@/type/firebaseInterface";
import {
  getChatRoomInfoByChatRoomId,
  getParticipantInfoList,
} from "@utills/chat/FirebaseAPI/dataGetter";
import Channel from "@pages/Chat/Chanel";
import styled from "styled-components";
import { SidePanel } from "@pages/Chat/SidePanel";
import { ChatSessionManager } from "@utills/chat/ChatSessionManager";

export default function ChatRoomPage() {
  const params = useParams();
  const chatRoomId = Number(params.id);

  const [userId, setUserId] = useState(0);
  const [navPannelIsOpen, setNavPannel] = useState<boolean>(false);

  // TODO 삭제 예정  -> 백의 페이지네이션 필요함
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  // 파이어베이스의 유저 정보
  const storedUserInfo = ChatSessionManager.getUserInfo();
  const userInfo: UserFiled | null = storedUserInfo ? storedUserInfo : null;

  const [participantInfoList, setParticipantInfoList] =
    useState<ParticipantInfoList | null>(null);

  const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoomsField | null>({
    work_id: 0,
    work_title: "",
    admin_ids: [],
    created_at: "",
  });

  useEffect(() => {
    if (chatRoomId) {
      setChatRequriedInfo();
    }
  }, [chatRoomId]);

  /**
   * chatRoomId로 participantInfoList,chatRoomInfo 가져오기
   *
   * - participantInfoList : 채팅방에 참여한 유저 정보 리스트 ChatUserInfo[]
   * - chatRoomInfo:  채팅방 세부 정보
   */
  const setChatRequriedInfo = async () => {
    if (chatRoomId) {
      const chatRoomInfo: ChatRoomsField | null =
        await getChatRoomInfoByChatRoomId(chatRoomId);

      const participantInfoList: ParticipantInfoList | null =
        await getParticipantInfoList(chatRoomId);

      if (participantInfoList) {
        setParticipantInfoList(participantInfoList);
      }

      if (chatRoomInfo) {
        setChatRoomInfo(chatRoomInfo);
      }
    }
  };

  useEffect(() => {
    const userId = ChatSessionManager.getUserId();

    if (!Number.isNaN(userId)) {
      setUserId(userId);
    }
  }, []);

  const showChatUserList = () => {
    setNavPannel((prev) => !prev);
  };

  const showSearchModal = () => {
    setShowSearchBar(true);
  };

  return (
    <Wapper>
      {chatRoomInfo && participantInfoList ? (
        <>
          <NavBar sticky={true}>
            <Container
              flexDirection="row"
              justifyContent="flex-start"
              paddingVertical={5}
              paddingHorizontal={5}
              style={{ gap: "10px" }}
            >
              <Text weight={900}>{chatRoomInfo.work_title}</Text>
              <Text color={FONT_COLORS.gray} weight={900}>
                {participantInfoList.length}
              </Text>
            </Container>

            <Container
              flexDirection="row"
              justifyContent="flex-end"
              paddingVertical={5}
              paddingHorizontal={5}
              style={{ gap: "10px" }}
            >
              {showSearchBar ? (
                <>
                  <Overlay onClick={() => setShowSearchBar(false)} />
                  검색 창
                </>
              ) : (
                ""
              )}
              <button onClick={showSearchModal}>
                <IoSearch size={25} />
              </button>

              <button onClick={showChatUserList}>
                <GiHamburgerMenu size={25} />
              </button>
            </Container>
          </NavBar>

          <SidePanel
            isOpen={navPannelIsOpen}
            onClose={() => setNavPannel(false)}
            participantInfoList={participantInfoList}
            chatRoomInfo={chatRoomInfo}
          />

          <Channel
            participantInfoList={participantInfoList}
            myUserId={userId}
            myUserName={userInfo?.name ?? "UNDEFIEND"}
            selectedChatsRoomId={chatRoomId}
          />
        </>
      ) : (
        ""
      )}
    </Wapper>
  );
}

const Wapper = styled.div`
  height: 100%;
  position: relative;

  button {
    cursor: pointer;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;
