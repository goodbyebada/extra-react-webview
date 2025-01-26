import { NavBar } from "@components/mocules/navBar/CommonNavBar";
import Text from "@components/atoms/Text";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { FONT_COLORS } from "@/styled/colors";
import Container from "@components/atoms/Container";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChatRoomField, UserDetailsInChat } from "@/types/firebase_db";
import {
  getChatRoomInfoByChatRoomId,
  getChatRoomUserDetailsByChatRoomId,
} from "@utills/chat/get";
import Channel from "@pages/Chat/Chanel";

// TODO 회원이 채팅방에서 나가기, 가입 시 기능 구현 예정
export default function ChatRoomPage() {
  const params = useParams();
  const chatRoomId = params.id;

  const [userId, setUserId] = useState("");

  const [chatUserDetails, setChatUserDetails] =
    useState<UserDetailsInChat | null>(null);
  const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoomField | null>({
    drama_id: "",
    name: "",
    admin_ids: [""],
    created_at: "",
  });

  //   TODO chatUserDetails, chatRoomInfo는 ChatRoomPage온 후 조회해도 된다.
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

  const showChatUserList = () => {};
  const showSearchModal = () => {};


  return (
    <Wapper>
      {chatRoomInfo && chatUserDetails?.userList ? (
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
                {chatUserDetails.userList.length}
              </Text>
            </Container>

            <Container
              flexDirection="row"
              justifyContent="flex-end"
              paddingVertical={5}
              paddingHorizontal={5}
              style={{ gap: "10px" }}
            >
              <IoSearch onClick={showSearchModal} size={25} />
              <GiHamburgerMenu onClick={showChatUserList} size={25} />
            </Container>
          </NavBar>

          {/* <SidePanel
            isOpen={navPannelIsOpen}
            onClose={() => setNavPannel(false)}
          >
            {chatUserDetails.userList.map((userId, key) => (
              <li key={key}>{userName(userId)}</li>
            ))}
          </SidePanel> */}

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
`;
