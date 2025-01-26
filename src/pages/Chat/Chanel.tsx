import { ChatRoomsMessageField, UserFiled } from "@/types/firebase_db";
import { useFirestoreQuery } from "@utills/chat/useFireStoreQuery";
import { db } from "@utills/firebase";
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { UserDetailsInChat } from "@/types/firebase_db";

import MessageItem from "@components/mocules/chat/MessageItem";
import MessageInput from "@components/mocules/chat/MessageInput";
import styled from "styled-components";

export default function Channel({
  chatUserDetails,
  myUserId,
  selectedChatsRoomId,
}: {
  chatUserDetails: UserDetailsInChat;
  myUserId: string;
  selectedChatsRoomId: string;
}) {
  // 0. 에서 작성한 useFirestoreQuery 로 도큐먼트 가져옴
  const colloectionRef = collection(db, "Messages", selectedChatsRoomId, "m1");
  const q = query(colloectionRef, orderBy("created_at"));
  const messageDocs = useFirestoreQuery(q);

  // 채팅 메세지 생성시 useState로 새로운 메세지 저장
  const [newMessage, setNewMessage] = useState("");

  //  하단 스크롤을 위한 useRef
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // TODO 쓰로톨링 적용 예정
  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.currentTarget.value);
  };

  async function sendMessage(data: ChatRoomsMessageField) {
    await addDoc(colloectionRef, data);
  }

  const handleOnSubmit = () => {
    const messageContent = newMessage;
    setNewMessage("");

    const data: ChatRoomsMessageField = {
      user_id: myUserId,
      message: messageContent,
      created_at: serverTimestamp(),
      // created_at: new Date().toUTCString(),
    };

    sendMessage(data);

    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }
    // updateTimeDateToTimeStamp(selectedChatsRoomId);
  }, [bottomRef.current, messageDocs]);

  // created_at field Timestamp와 섞여있음
  function formatCreatedAt(
    created_at: string | { seconds: number; nanoseconds: number },
  ): string {
    if (typeof created_at === "string") {
      // 문자열 형식의 날짜를 Date 객체로 변환하고 시간만 반환
      return new Date(created_at).toUTCString();
    } else if (typeof created_at === "object" && created_at.seconds) {
      return new Date(created_at.seconds * 1000).toString();
    } else {
      // 유효하지 않은 형식 처리
      return "Invalid Date";
    }
  }

  // 사용자 이름을 안전하게 가져오는 함수
  const getUserName = (
    userInfoMapById: Map<string, UserFiled> | null,
    userId: string,
  ): string => {
    if (userInfoMapById !== null && userInfoMapById.has(userId)) {
      return userInfoMapById.get(userId)?.name || "";
      // undefined일 경우 빈 문자열 반환
    }
    return "";
  };

  return (
    <ChatWrapper>
      <MessageWrapper>
        {chatUserDetails.userList.length !== 0 &&
          messageDocs
            ?.sort((first, second) => {
              if (first?.created_at?.seconds === second?.created_at?.seconds) {
                return (
                  first?.created_at?.nanoseconds -
                  second?.created_at?.nanoseconds
                );
              }

              return first?.created_at?.seconds - second?.created_at?.seconds;
            })
            ?.map((message) => (
              <MessageItem
                key={message.id}
                user_image={""}
                user_name={getUserName(
                  chatUserDetails.userInfoMapById,
                  message.user_id,
                )}
                message={message.message}
                created_at={formatCreatedAt(message.created_at)}
                my_message={message.user_id === myUserId}
              />
            ))}

        <div ref={bottomRef} />
      </MessageWrapper>
      {/* 채팅 입력 폼 생성 */}
      <MessageInput
        bottomRef={bottomRef}
        value={newMessage}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
        disabled={!newMessage}
      />
    </ChatWrapper>
  );
}

// TODO 헤더 높이 정보를 알아야함
const ChatWrapper = styled.div`
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
`;

const MessageWrapper = styled.div`
  box-sizing: border-box;
  overflow-y: scroll;
`;
