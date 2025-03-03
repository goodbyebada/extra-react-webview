import { FieldValue } from "firebase/firestore";

/**
 * admin : 관리자 계정/ 보조 출연자 계정 구분을 위해 설정
 */
export interface UserFiled {
  name: string;
  admin: boolean;
  created_at: string;
}

/**
 * 채팅에 참여한 user_id_list 원소 형식
 */
export interface ChatUserInfo extends UserFiled {
  user_id: number;
}

export type ParticipantInfoList = ChatUserInfo[];

export interface DramaField {
  title: string;
}

export interface ChatRoomsField {
  work_id: number;
  work_title: string;
  admin_ids: number[];
  created_at: string;
}

export interface ChatRoomUsersField {
  work_id: number;
  participant_info_list: ChatUserInfo[];
}

// 백엔드에서 받아온 원본 타입
export interface ChatRoomInfo extends ChatRoomsField {
  chat_room_id: string;
}

// 프론트엔드에서 사용할 변환된 타입
export interface ChatRoomInfoFrontend extends ChatRoomsField {
  chat_room_id: number;
}

// 드라마 출석 여부 -> QR
export interface DramaParticipationField {
  user_id: string;
  attendance_status: string;
  joined_at: string;
}

export interface ChatRoomsMessageField {
  user_id: number;
  user_name: string;
  message: string;
  created_at: string | FieldValue;
}
