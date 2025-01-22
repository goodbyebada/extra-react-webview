import {
  ChatRoomsMessageField,
  ChatRoomsSendMessageField,
  UserFiled,
} from "@/types/firebase_db";
import { useFirestoreQuery } from "@utills/chat/useFireStoreQuery";
import { db } from "@utills/firebase";
import {
  FieldValue,
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { UserDetailsInChat } from "@/types/firebase_db";
import { IoSend } from "react-icons/io5";

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

  // input 필드 포커싱과 하단 스크롤을 위한 useRef
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomListRef = useRef<HTMLDivElement | null>(null);

  // TODO 쓰로톨링 적용 예정
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.currentTarget.value);
  };

  async function sendMessage(data: {
    user_id: string;
    message: string;
    created_at: string;
  }) {
    await addDoc(colloectionRef, data);
  }

  const handleOnSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 추후에 내용 작성

    const messageContent = newMessage;
    setNewMessage("");

    const data: ChatRoomsSendMessageField = {
      user_id: myUserId,
      message: messageContent,
      // created_at: serverTimestamp(),
      created_at: new Date().toString(),
    };
    // 서버 사용 줄이기 위해 new Date로 임시로 사용

    sendMessage(data);

    if (bottomListRef.current) {
      bottomListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // toLocaleDateString : '2025. 1. 22.'
  // new Date().toDateString() 'Wed Jan 22 2025'
  // new Date().toTimeString()'15:21:36 GMT+0900 (한국 표준시)'

  // created_at field Timestamp와 섞여있음
  function formatCreatedAt(
    created_at: string | { seconds: number; nanoseconds: number },
  ): string {
    if (typeof created_at === "string") {
      // 문자열 형식의 날짜를 Date 객체로 변환하고 시간만 반환
      return new Date(created_at).toUTCString();
    } else if (typeof created_at === "object" && created_at.seconds) {
      // Firestore Timestamp 객체를 Date 객체로 변환하고 날짜만 반환
      return new Date(created_at.seconds * 1000).toUTCString();
    } else {
      // 유효하지 않은 형식 처리
      return "Invalid Date";
    }
  }

  return (
    <div>
      <div>
        <div>
          <ul>
            {chatUserDetails.userList.length !== 0 &&
              messageDocs
                ?.sort((first, second) =>
                  first?.created_at?.seconds <= second?.created_at?.seconds
                    ? -1
                    : 1,
                )
                ?.map((message, key) => (
                  <li key={key}>
                    {/* 추후 Message 컴포넌트 생성해서 채팅 내용 표시 */}
                    {/* <Message {...message} /> */}

                    <h3>
                      {chatUserDetails.userInfoMapById
                        ? chatUserDetails.userInfoMapById.get(message.user_id)
                            ?.name
                        : ""}
                    </h3>
                    <h1>{message.message}</h1>
                    <h4>{formatCreatedAt(message.created_at)}</h4>
                  </li>
                ))}
          </ul>

          {/* TODO 하단 스크롤 */}
          <div ref={bottomListRef} />
        </div>
      </div>

      {/* 채팅 입력 폼 생성 */}
      <div>
        <form onSubmit={handleOnSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="메세지를 입력하세요"
          />
          <button type="submit" disabled={!newMessage}>
            <IoSend />
          </button>
        </form>
      </div>
    </div>
  );
}
