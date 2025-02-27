import { useEffect, useState } from "react";
import { MainButton } from "@components/atoms/Button";
import {
  checkUserExists,
  getChatRoomIds,
} from "@utills/chat/FirebaseAPI/getDataFromFirebase";

import { useNavigate } from "react-router-dom";
import { ChatSessionManager } from "@utills/chat/ChatSessionManager";

/**
 * 보조 출연자 시나리오
 * 선택한 드라마의 채팅방에 입장할 수 있다.
 * -> user_id, work_id만 있다 가정
 * -> work_id 에 대한 chatRoom_id를 찾아 리스너를 달아준다.
 * -> 바로 채팅방이 나오게 한다.
 *
 *
 * 유저 정보
 *  참여작품  work_id: 3
 */
const DUMMY_USER_INFO = {
  userId: 3,
  workId: 3,
};

/**
 * 사용자용 채팅 테스트 화면
 * @returns
 */
export default function ChatPreviewForUser() {
  const navigate = useNavigate();
  const memberInfo = DUMMY_USER_INFO;
  const [chatRoomId, setChatRoomId] = useState<number>(-1);

  // TODO 에러 발생 시 모달창으로 표시 예정
  useEffect(() => {
    const fetchData = async () => {
      const result = await checkUserExists(memberInfo.userId);

      if (!result.success) {
        console.error(result.error);
      } else {
        console.log(result.data);

        if (result.data) {
          ChatSessionManager.saveUserInfo(memberInfo.userId, result.data);
        }
      }

      const chatRoomIds = await getChatRoomIds(memberInfo.workId);

      if (chatRoomIds.length === 1) {
        const [chatRoomId] = chatRoomIds;
        // console.log(chatRoomId);
        setChatRoomId(chatRoomId);
      }
    };

    fetchData();
  }, [memberInfo]);

  const navigateToChatRoom = () => {
    navigate(`/chatRoom/channel/${chatRoomId}`);
  };

  return (
    <>
      <div>
        <MainButton onClick={navigateToChatRoom}>
          보조출연자 계정으로 작품(드라마/영화) work_id
          {DUMMY_USER_INFO.workId}의 채팅방 chatRoomId
          {chatRoomId} 방 채팅 참여하기
        </MainButton>
      </div>
    </>
  );
}
