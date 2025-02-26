import { FieldValue } from "firebase/firestore";

/**
 * admin : 관리자 계정/ 보조 출연자 계정 구분을 위해 설정
 */
export interface UserFiled {
  name: string;
  admin: boolean;
  created_at: string;
}

export interface DramaField {
  title: string;
}

// TODO name -> title로 변경 예정
export interface ChatRoomsField {
  drama_id: number;
  name: string;
  admin_ids: number[];
  created_at: string;
}

// 드라마 출석 여부 -> QR
export interface DramaParticipationField {
  user_id: string;
  attendance_status: string;
  joined_at: string;
}

export interface ChatRoomsMessageField {
  user_id: string;
  message: string;
  created_at: string | FieldValue;
}

export interface ChatRoomInfo extends ChatRoomsField {
  chatRoom_id: string;
}

/**
 * userInfoMapById
 * key : userId
 * value : UserFiled( name, admin, created_at 정보 )
 *
 * userList
 * 채팅방에 참여중인 회원 ID List
 *
 */
export interface UserDetailsInChat {
  userInfoMapById: Map<number, UserFiled>;
  userIdList: number[] | [];
}
