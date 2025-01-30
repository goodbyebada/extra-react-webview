import styled from "styled-components";
import { COLORS, FONT_COLORS } from "@/styled/colors";
import { ChatRoomField, UserDetailsInChat } from "@/types/firebase_db";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { InputField } from "@components/atoms/Form";
import { useEffect, useState } from "react";
import search from "@utills/search";
import useDebounce from "@utills/useDebounce";
import Text from "@components/atoms/Text";

// 사이드 패널 컴포넌트
export const SidePanel = ({
  isOpen,
  onClose,
  chatUserDetails,
  chatRoomInfo,
}: {
  isOpen: boolean;
  onClose: () => void;
  chatUserDetails: UserDetailsInChat;
  chatRoomInfo: ChatRoomField;
}) => {
  const userName = (userId: string): string => {
    if (!chatUserDetails) return "??";
    const { userInfoMapById } = chatUserDetails;
    if (userInfoMapById && userInfoMapById.has(userId)) {
      return userInfoMapById.get(userId)?.name || "??";
    }
    return "??";
  };

  const showAnnouncement = () => {
    console.log("공지 사항 페이지 보여주기");
  };

  const showDocument = () => {
    console.log("계약서 보여주기 ");
  };

  const { control } = useForm();
  const [inputChange, handleInputChange] = useState<string>("");
  const [userList, setUserList] = useState<string[]>([""]);
  const debouncedValue = useDebounce<string>(inputChange, 600);

  useEffect(() => {
    setUserList(chatUserDetails.userList);
  }, []);

  useEffect(() => {
    if (debouncedValue === "") {
      setUserList(chatUserDetails.userList);
      return;
    }

    const newUserList = userList.filter((userId) => {
      return search(debouncedValue, userName(userId)) === 0;
    });

    console.log("newUserList", newUserList);

    setUserList(newUserList);
  }, [debouncedValue]);

  return (
    <Container isOpen={isOpen}>
      <Overlay onClick={onClose} />
      <Panel>
        <Text color={COLORS.white} size={25} weight={800}>
          {chatRoomInfo.name}
        </Text>
        <Text color={COLORS.lightGray} size={15}>
          {chatUserDetails.userList.length}명 참여 중
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
          <Text>대화 상대</Text>
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

        <UserListWrapper>
          {userList.map((userId, key) => (
            <User key={key}>
              {userName(userId)}
              <span>{"출석여부"}</span>
            </User>
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

const User = styled.span`
  padding: 5px;
`;
