import { ChatRoomsField, UserFiled } from "@/types/firebase_db";

import { dummyJobPostList } from "@/mocks/dummyJobData";

export { DUMMY_FIREBASE_DB_LIST };

// UserFiled 예시
const DUMMY_USER_FILED_LIST: UserFiled[] = [
  {
    name: "김준준",
    admin: true,
    created_at: "2022-11-15T08:30:00Z",
  },
  {
    name: "박민민",
    admin: true,
    created_at: "2021-01-10T12:45:00Z",
  },
  {
    name: "김수현",
    admin: false,
    created_at: "2022-07-20T16:20:00Z",
  },
  {
    name: "고윤정",
    admin: false,
    created_at: "2024-01-05T09:00:00Z",
  },
  {
    name: "고윤민",
    admin: false,
    created_at: "2023-05-14T10:10:00Z",
  },
  {
    name: "신혜선",
    admin: false,
    created_at: "2023-09-25T14:45:00Z",
  },
  {
    name: "문가영",
    admin: true,
    created_at: "2020-06-30T07:30:00Z",
  },
  {
    name: "민기영",
    admin: false,
    created_at: "2024-02-10T18:00:00Z",
  },
  {
    name: "민소희",
    admin: true,
    created_at: "2019-12-05T08:15:00Z",
  },
  {
    name: "한소희",
    admin: false,
    created_at: "2023-08-01T13:20:00Z",
  },
];

/**
 * TODO 시나리오 상 의문 검색했을시, 테스트
 * 이름이 겹칠 시 어떻게 구별할 것인지
 */

// ChatUser 필드 예시
const CHAT_USER_LIST = [
  {
    user_id: 1,
    name: "김준준",
    admin: true,
    created_at: "2022-11-15T08:30:00Z",
  },
  {
    user_id: 2,
    name: "박민민",
    admin: true,
    created_at: "2021-01-10T12:45:00Z",
  },
  {
    user_id: 3,
    name: "김수현",
    admin: false,
    created_at: "2022-07-20T16:20:00Z",
  },
  {
    user_id: 4,
    name: "고윤정",
    admin: false,
    created_at: "2024-01-05T09:00:00Z",
  },
  {
    user_id: 5,
    name: "고윤민",
    admin: false,
    created_at: "2023-05-14T10:10:00Z",
  },
  {
    user_id: 6,
    name: "신혜선",
    admin: false,
    created_at: "2023-09-25T14:45:00Z",
  },
  {
    user_id: 7,
    name: "문가영",
    admin: true,
    created_at: "2020-06-30T07:30:00Z",
  },
  {
    user_id: 8,
    name: "민기영",
    admin: false,
    created_at: "2024-02-10T18:00:00Z",
  },
  {
    user_id: 9,
    name: "민소희",
    admin: true,
    created_at: "2019-12-05T08:15:00Z",
  },
  {
    user_id: 10,
    name: "한소희",
    admin: false,
    created_at: "2023-08-01T13:20:00Z",
  },
];

/**
 * DB에 저장된 채팅방 리스트
 */
const DUMMY_CHAT_ROOMS: ChatRoomsField[] = dummyJobPostList.map(
  (jobInfo, index) => {
    const { id, title, calenderList } = jobInfo;
    let tmp_admin_ids;

    // dummyJobPostList 기준 앞에서 2개 관리자 : user_id: 1, 김준준
    // 나머지 공고 관리자 : user_id: 2, 박민민
    if (index < 3) {
      tmp_admin_ids = CHAT_USER_LIST[0].user_id;
    } else {
      tmp_admin_ids = CHAT_USER_LIST[1].user_id;
    }

    return {
      drama_id: id,
      name: title,
      created_at: calenderList[0],
      admin_ids: [tmp_admin_ids],
    };
  },
);

/**
 * firebase DB 데이터 예시
 */
const DUMMY_FIREBASE_DB_LIST = {
  DUMMY_USER_FILED_LIST,
  CHAT_USER_LIST,
  DUMMY_CHAT_ROOMS,
};
