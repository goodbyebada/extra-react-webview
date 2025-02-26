import { NavBar } from "@components/mocules/navBar/CommonNavBar";
import Text from "@components/atoms/Text";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { FONT_COLORS } from "@styled/colors";
import Container from "@components/atoms/Container";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChatRoomsField, UserDetailsInChat } from "@/types/firebase_db";
import {
  getChatRoomInfoByChatRoomId,
  getChatRoomUserDetailsByChatRoomId,
} from "@utills/chat/get";
import Channel from "@pages/Chat/Chanel";
import styled from "styled-components";
import { SidePanel } from "@components/mocules/SidePanel";

// TODO 회원이 채팅방에서 나가기, 가입 시 기능 구현 예정
export default function ChatRoomPage() {
  const params = useParams();
  const chatRoomId = params.id;

  const [userId, setUserId] = useState("");
  const [navPannelIsOpen, setNavPannel] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  const [chatUserDetails, setChatUserDetails] =
    useState<UserDetailsInChat | null>(null);

  const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoomsField | null>({
    drama_id: 0,
    name: "",
    admin_ids: [],
    created_at: "",
  });

  /**
   * chatRoomId로 chatUserDetails,chatRoomInfo setting
   *
   * - chatUserDetails : 채팅방에 참여한 유저 정보
   * - chatRoomInfo:  채팅방 정보 ( drama_id, name, admin_ids, created_at )
   */
  const setChatRequriedInfo = async () => {
    if (chatRoomId) {
      const chatUserDetails =
        await getChatRoomUserDetailsByChatRoomId(chatRoomId);
      const chatRoomInfo = await getChatRoomInfoByChatRoomId(chatRoomId);

      setChatUserDetails(chatUserDetails);

      if (chatRoomInfo) {
        setChatRoomInfo(chatRoomInfo);
      }
    }
  };

  useEffect(() => {
    setUserId(sessionStorage.getItem("myUserId") || "");
    setChatRequriedInfo();
  }, []);

  const showChatUserList = () => {
    setNavPannel((prev) => !prev);
  };

  const showSearchModal = () => {
    setShowSearchBar(true);
  };

  return (
    <Wapper>
      {chatRoomInfo && chatUserDetails?.userIdList ? (
        <>
          <NavBar sticky={true}>
            <Container
              flexDirection="row"
              justifyContent="flex-start"
              paddingVertical={5}
              paddingHorizontal={5}
              style={{ gap: "10px" }}
            >
              <Text weight={900}>{chatRoomInfo.name}</Text>
              <Text color={FONT_COLORS.gray} weight={900}>
                {chatUserDetails.userIdList.length}
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
            chatUserDetails={chatUserDetails}
            chatRoomInfo={chatRoomInfo}
          />

          <Channel
            chatUserDetails={chatUserDetails}
            myUserId={userId || ""}
            selectedChatsRoomId={chatRoomId || ""}
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
