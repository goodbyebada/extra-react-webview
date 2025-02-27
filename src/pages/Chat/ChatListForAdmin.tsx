import Item from "@components/mocules/Item";
import {
  DUMMY_MANAGER_JOB_LIST_VER_1,
  DUMMY_MANAGER_JOB_LIST_VER_2,
} from "@/mocks/dummyJobData";
import { JobPostList } from "@/types/shared";
import getDdayString from "@utills/getDdayString";
import { useNavigate } from "react-router-dom";
import { ContentWrapper } from "@components/atoms/Wrapper";
import Text from "@components/atoms/Text";
import { NavBar } from "@components/mocules/navBar/CommonNavBar";
import { styled } from "styled-components";

import {
  getManagedChatRoomIdList,
  getUserInfoByUserId,
} from "@utills/chat/FirebaseAPI/getDataFromFirebase";
import { useEffect, useState } from "react";
import { UserFiled } from "@/types/firebaseInterface";
import { ChatSessionManager } from "@utills/chat/ChatSessionManager";

/**
// [x] 최초 접속시,  관리자의 정보와 관리하는 채팅방 Id list를 불러온다.
    [x] session에 저장해 관리한다.
    // TODO 상태관리 RTK로 변경 예정
 * [ ] 인피니티 스크롤링으로 불러와야한다.
 * [x] 클릭 시  해당 ID의 채팅 방으로 이동해야한다.
 * @param param0
 */

/**
 * getManagerJobPosts
 * 매니저 계정의 담당 공고 return 하는 임시 함수
 *
 * 매니저(관리자) userId로 요청시, 관리 jobPostList return하는 API 있다고 가정
 */
function getDummyJobPost(userId: number): JobPostList {
  if (userId === 1) return DUMMY_MANAGER_JOB_LIST_VER_1;
  if (userId === 2) return DUMMY_MANAGER_JOB_LIST_VER_2;
  return [];
}

// TODO RTK로 변경 예정
/**
 * 관리자 시나리오
 * : 본인 담당 채팅방 리스트 중 하나를 선택해 들어간다.
 */
const DUMMY_ADMIN_INFO = {
  user_id: 2,
};

export function ChatListForAdmin() {
  const [userId, setUserId] = useState<number>(0);
  const managedWorkItems = getDummyJobPost(userId);
  const [userInfo, setUserInfo] = useState<UserFiled>();

  const [managedChatRoomIdList, setManagedChatRoomIdList] = useState<number[]>(
    [],
  );

  const navigate = useNavigate();

  // 최초 한 번 실행
  useEffect(() => {
    setUserId(DUMMY_ADMIN_INFO.user_id);
  }, []);

  useEffect(() => {
    if (userId === 0) return; // 초기 값 방지

    //
    const fetchData = async () => {
      const managedChatRoomIdList = await getManagedChatRoomIdList(userId);
      const myUserInfo = await getUserInfoByUserId(userId);

      setManagedChatRoomIdList(managedChatRoomIdList);

      if (myUserInfo) {
        setUserInfo(myUserInfo);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    //
    if (userId && userInfo && managedChatRoomIdList) {
      ChatSessionManager.saveChatRoomInfo(
        userId,
        managedChatRoomIdList,
        userInfo,
      );
    }
  }, [userId, userInfo, managedChatRoomIdList]);

  return (
    <>
      <NavBar bottomLine={true}>
        <Text size={25} weight={900}>
          채팅
        </Text>
      </NavBar>

      <ContentWrapper marginTop="2rem" paddingLeft="10px" paddingRight="10px">
        <ItemWrapper>
          {managedWorkItems.map((jobInfo, key) => {
            const {
              id,
              title,
              category,
              calenderList,
              applyDeadLine,
              gatheringTime,
              gatheringLocation,
              companyName,
            } = jobInfo;

            //   공고(드라마/ 영화) id
            const workId = id;

            const dDay = getDdayString(applyDeadLine);

            return (
              <Item
                key={key}
                title={title}
                category={category}
                date={calenderList}
                dDay={dDay}
                time={gatheringTime}
                location={gatheringLocation}
                company={companyName}
                onClick={() => navigate(`/chatRoom/channel/${workId}`)}
              />
            );
          })}
        </ItemWrapper>
      </ContentWrapper>
    </>
  );
}

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 10px;
`;
