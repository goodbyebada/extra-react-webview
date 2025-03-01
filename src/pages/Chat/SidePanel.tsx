import styled from "styled-components";
import { COLORS, FONT_COLORS } from "@styled/colors";
import { ChatRoomsField, ParticipantInfoList } from "@/types/firebaseInterface";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { InputField } from "@components/atoms/Form";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "@utills/hooks/useDebounce";
import Text, { ThemeText } from "@components/atoms/Text";
import { ChatUser, ChatUsersManager } from "@utills/chat/ChatUsers";
import { SearchChatUsersService } from "@utills/chat/SearchUsersController";

// 사이드 패널 컴포넌트
export const SidePanel = ({
  isOpen,
  onClose,
  participantInfoList,
  chatRoomInfo,
}: {
  isOpen: boolean;
  onClose: () => void;
  participantInfoList: ParticipantInfoList;
  chatRoomInfo: ChatRoomsField;
}) => {
  const showAnnouncement = () => {
    console.log("공지 사항 페이지 보여주기");
  };

  const showDocument = () => {
    console.log("계약서 보여주기 ");
  };

  const { control } = useForm();
  const [inputChange, handleInputChange] = useState<string>("");

  const [searchedChatUserList, setSearchedChatUserList] = useState<
    ChatUser[] | []
  >([]);

  const debouncedValue = useDebounce<string>(inputChange, 500);

  const chatUsersManager = useMemo(
    () => new ChatUsersManager(participantInfoList),
    [participantInfoList],
  );

  const searchChatUsersService = useMemo(
    () => new SearchChatUsersService(chatUsersManager.chatUsers),
    [chatUsersManager.chatUsers],
  );

  useEffect(() => {
    setSearchedChatUserList(() =>
      searchChatUsersService.search(debouncedValue),
    );
  }, [debouncedValue, searchChatUsersService]);

  return (
    <Container isOpen={isOpen}>
      <Overlay onClick={onClose} />
      <Panel>
        <Text color={COLORS.white} size={25} weight={800}>
          {chatRoomInfo.work_title}
        </Text>
        <Text color={COLORS.lightGray} size={15}>
          {chatUsersManager.getChatUserCount()}명 참여 중
        </Text>
        <Text color={COLORS.lightGray} size={15}>
          개설일 : {chatRoomInfo.created_at.split("-").join(".")}
        </Text>
        <Line />

        <InfoWrapper>
          <IconButton onClick={showAnnouncement}>
            <TfiAnnouncement />
            <Text>공지사항</Text>
          </IconButton>

          <IconButton onClick={showDocument}>
            <IoDocumentTextOutline />
            <Text>계약서</Text>
          </IconButton>
        </InfoWrapper>

        <Line />

        <InfoWrapper>
          <div style={{ minWidth: "80px" }}>
            <ThemeText variant="item-title">대화 상대</ThemeText>
          </div>

          <InputField
            name="member"
            placeholder="회원 찾기"
            control={control}
            inputProps={{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e.target.value),
            }}
          />
        </InfoWrapper>

        {/* CHECK  회원 USER LIST 갱신해야함  */}
        <UserListWrapper>
          {searchedChatUserList.map((chatUser, key) => (
            <SearchResult key={key}>
              {chatUser.getUserName()}

              {/* 임시 */}
              <span>{"출석여부"}</span>
            </SearchResult>
          ))}
        </UserListWrapper>
      </Panel>
    </Container>
  );
};

// TODO "desktop" | "tablet" | "phone"에 따라 width가 변경되어야함

const Container = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  color: ${({ isOpen }) => (isOpen ? `${FONT_COLORS.gray}` : "transparent")};

  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
  z-index: 100000;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;

const Panel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  background-color: ${COLORS.darkGray};
  color: ${FONT_COLORS.white};
`;

const Line = styled.div`
  margin-top: 10px;
  width: 100%;
  border-width: 0.2px;
  border-style: solid;
  border-color: ${COLORS.lightGray};
`;

const InfoWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: 5px;
`;

const UserListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  width: 100%;
`;

const SearchResult = styled.span`
  padding: 5px;
`;
