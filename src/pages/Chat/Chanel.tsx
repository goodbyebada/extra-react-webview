import { ChatRoomsMessageField } from "@type/firebaseInterface";
import { useFirestoreQuery } from "@utills/chat/useFireStoreQuery";
import { db } from "@utills/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { ParticipantInfoList } from "@type/firebaseInterface";

import MessageItem from "@components/mocules/chat/MessageItem";
import MessageInput from "@components/mocules/chat/MessageInput";
import styled from "styled-components";
import InfiniteScroll from "@utills/InfiniteScroll";
import DateDisplay from "@components/mocules/chat/DateDisplay";

export default function Channel({
  participantInfoList,
  myUserId,
  myUserName,
  selectedChatsRoomId,
}: {
  participantInfoList: ParticipantInfoList;
  myUserId: number;
  myUserName: string;
  selectedChatsRoomId: number;
}) {
  // 0. 에서 작성한 useFirestoreQuery 로 도큐먼트 가져옴

  const colloectionRef = collection(
    db,
    "Messages",
    selectedChatsRoomId.toString(),
    "m",
  );
  const LIMIT_COUNT = 15;

  const { docs: messageDocs, fetchMore } = useFirestoreQuery(
    colloectionRef,
    LIMIT_COUNT,
  );

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    console.log(messageDocs);
  }, [messageDocs]);

  // 채팅 메세지 생성시 useState로 새로운 메세지 저장
  const [newMessage, setNewMessage] = useState("");

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
      user_name: myUserName,
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
  }, []);

  function formatCreatedAt(created_at: {
    seconds: number;
    nanoseconds: number;
  }): string {
    let dateObj;

    if (typeof created_at === "object" && created_at.seconds) {
      dateObj = new Date(created_at.seconds * 1000);
    } else {
      dateObj = new Date(created_at.toString());
    }

    const hour = dateObj.getHours();
    const ampm = dateObj.getHours() < 12 ? "오전" : "오후";
    const convertedHour = hour <= 12 ? hour : hour - 12;

    const timeString = `${ampm} ${convertedHour.toString().padStart(2, "0")} : ${dateObj.getMinutes().toString().padStart(2, "0")}`;
    return timeString;
  }

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

  // // [ ] 렌더링 의미 없어 보임
  // const MessageList = useMemo(() => {
  //   if (participantInfoList.length !== 0 && messageDocs) {
  //     return messageDocs?.map((message, index) => (
  //       <>
  //         {showDateInfo(message.created_at, index)}
  //         <MessageItem
  //           key={message.id}
  //           user_image={""}
  //           user_name={message.user_name}
  //           message={message.message}
  //           created_at={formatCreatedAt(message.created_at)}
  //           my_message={message.user_id === myUserId}
  //         />
  //       </>
  //     ));
  //   }
  // }, [messageDocs]);

  return (
    <ChatWrapper>
      <MessageWrapper>
        <InfiniteScroll
          fetchData={fetchMore}
          hasMore={messageDocs.length > 0}
          loader={<h2>loading....!</h2>}
          endMessage={<h2>마지막 메시지 입니다.</h2>}
          hasError={false}
          errorMessage={<h2>에러가 발생했습니다.</h2>}
          requestAtDown={false}
        >
          {participantInfoList.length !== 0 &&
            messageDocs?.map((message, index) => (
              <div key={message.id}>
                {showDateInfo(message.created_at, index)}
                <MessageItem
                  user_image={""}
                  user_name={message.user_name}
                  message={message.message}
                  created_at={formatCreatedAt(message.created_at)}
                  my_message={message.user_id === myUserId}
                />
              </div>
            ))}
          <div id="bottom" ref={bottomRef} />
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
