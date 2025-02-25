import { ChatRoomsMessageField, UserFiled } from "@/types/firebase_db";
import { useFirestoreQuery } from "@utills/chat/useFireStoreQuery";
import { db } from "@utills/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { UserDetailsInChat } from "@/types/firebase_db";

import MessageItem from "@components/mocules/chat/MessageItem";
import MessageInput from "@components/mocules/chat/MessageInput";
import styled from "styled-components";
import InfiniteScroll from "@utills/InfiniteScroll";
import DateDisplay from "@components/mocules/chat/DateDisplay";

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
  const LIMIT_COUNT = 15;

  const { docs: messageDocs, fetchMore } = useFirestoreQuery(
    colloectionRef,
    LIMIT_COUNT,
  );

  useEffect(() => {
    console.log(messageDocs);
  }, [messageDocs]);

  // 채팅 메세지 생성시 useState로 새로운 메세지 저장
  const [newMessage, setNewMessage] = useState("");
  // const [dateInfo, setDateInfo] = useState({
  //   year: 0,
  //   month: 0,
  //   dateNum: 0,
  // });

  //  하단 스크롤을 위한 useRef
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // TODO 쓰로톨링 적용 예정
  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.currentTarget.value);
    // console.log(e.currentTarget.value);
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
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }
    // updateTimeDateToTimeStamp(selectedChatsRoomId);
  }, [bottomRef.current]);

  // created_at field Timestamp와 섞여있음
  function formatCreatedAt(
    created_at: string | { seconds: number; nanoseconds: number },
  ): string {
    if (typeof created_at === "string") {
      // 문자열 형식의 날짜를 Date 객체로 변환하고 시간만 반환
      return new Date(created_at).toUTCString();
    } else if (typeof created_at === "object" && created_at.seconds) {
      const dateObj = new Date(created_at.seconds * 1000);
      const hour = dateObj.getHours();
      const ampm = dateObj.getHours() < 12 ? "오전" : "오후";
      const convertedHour = hour <= 12 ? hour : hour - 12;

      const timeString = `${ampm} ${convertedHour.toString().padStart(2, "0")} : ${dateObj.getMinutes().toString().padStart(2, "0")}`;
      return timeString;
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

  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // 다음과 비교
  const showDateInfo = (
    created_at: {
      seconds: number;
      nanoseconds: number;
    },
    index: number,
  ) => {
    let displayDate = false;
    const date = new Date(created_at.seconds * 1000);

    // 첫 idx라면 그린다.
    if (index === 0) {
      displayDate = true;
      return <DateDisplay date={date} />;
    }

    // prev index와 비교해 날짜가 달라진다면 표시한다.
    if (index > 0 && index !== messageDocs.length - 1) {
      const prevMessageCreatedAt = messageDocs[index - 1].created_at;
      const prevMessageDate = new Date(prevMessageCreatedAt.seconds * 1000);

      if (!isSameDate(date, prevMessageDate)) {
        displayDate = true;
      }
    }

    if (displayDate) {
      return <DateDisplay date={date} />;
    }
  };

  return (
    <ChatWrapper>
      <MessageWrapper>
        <InfiniteScroll
          fetchData={fetchMore}
          hasMore={messageDocs.length > 0}
          loader={<h2>loading....!</h2>}
          endMessage={<h2>모든 공고를 업데이트 하였습니다.</h2>}
          hasError={false}
          errorMessage={<h2>에러가 발생했습니다.</h2>}
          requestAtDown={false}
        >
          {chatUserDetails.userIdList.length !== 0 &&
            messageDocs?.map((message, index) => (
              <>
                {showDateInfo(message.created_at, index)}
                <MessageItem
                  key={index}
                  user_image={""}
                  user_name={getUserName(
                    chatUserDetails.userInfoMapById,
                    message.user_id,
                  )}
                  message={message.message}
                  created_at={formatCreatedAt(message.created_at)}
                  my_message={message.user_id === myUserId}
                />
              </>
            ))}
          <div ref={bottomRef} />
        </InfiniteScroll>
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
  width: 100%;
  height: 100%;
`;
