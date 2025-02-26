import Item from "@components/mocules/Item";
import {
  DUMMY_MANAGER_JOB_LIST_VER_1,
  DUMMY_MANAGER_JOB_LIST_VER_2,
  dummyJobPost,
} from "@/mocks/dummyJobData";
import { JobPostList } from "@/types/shared";
import getDdayString from "@utills/getDdayString";
import { useNavigate } from "react-router-dom";
import { ContentWrapper, LineWrapper } from "@components/atoms/Wrapper";
import Text from "@components/atoms/Text";
import { NavBar } from "@components/mocules/navBar/CommonNavBar";
import { styled } from "styled-components";

// TODO 공고 매니저에게만 제공되는 chatList
/**
 * [ ] 공고 매니저의 공고 리스트를 불러온다.
 * [ ] 공고 정보 리스트를 보여준다.
 * [ ] 인피니티 스크롤링으로 불러와야한다.
 * [ ] 클릭 시  해당 ID의 채팅 방으로 이동해야한다.
 * @param param0
 */

// 공고 ID 요청 시 -> 공고 채팅 ID return하는 API 있다 가정
function getChatIdById(id: number) {
  return dummyJobPost;
}

/**
 * 관리자 시나리오
 * : 본인 담당 채팅방 리스트 중 하나를 선택해 들어간다.
 */
const DUMMY_ADMIN_INFO = {
  user_id: 2,
};

/**
 * getManagerJobPosts
 * 매니저 계정의 담당 공고 return 하는 임시 함수
 *
 */
function getManagerJobPostsTMP(userId: number): JobPostList {
  if (userId === 1) return DUMMY_MANAGER_JOB_LIST_VER_1;
  if (userId === 2) return DUMMY_MANAGER_JOB_LIST_VER_2;
  return [];
}

export function ChatListForAdmin() {
  const managerJobPosts = getManagerJobPostsTMP(DUMMY_ADMIN_INFO.user_id);
  const navigate = useNavigate();

  return (
    <>
      <NavBar bottomLine={true}>
        <Text size={25} weight={900}>
          채팅
        </Text>
      </NavBar>

      <ContentWrapper marginTop="2rem" paddingLeft="10px" paddingRight="10px">
        <ItemWrapper>
          {managerJobPosts.map((jobInfo, key) => {
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
            const jobPostId = id;

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
                onClick={() => navigate(`/chatRoom/channel/${jobPostId}`)}
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
