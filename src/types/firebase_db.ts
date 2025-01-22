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

export interface ChatRoomField {
  drama_id: string;
  name: string;
  admin_ids: string[];
  created_at: string;
}

// 드라마 출석 여부 -> QR
export interface DramaParticipationField {
  user_id: string;
  attendance_status: string;
  joined_at: string;
}

/**
 * 받아오는 메시지
 */
export interface ChatRoomsMessageField {
  user_id: string;
  message: string;
  created_at: {
    nanoseconds: number;
    seconds: number;
  };
}

/**
 * FB로 보내는 메시지
 */
export interface ChatRoomsSendMessageField {
  user_id: string;
  message: string;
  created_at: string;
}

export interface ChatRoomInfo extends ChatRoomField {
  chatRoom_id: string;
}

export interface UserDetailsInChat {
  userInfoMapById: Map<string, UserFiled> | null;
  userList: string[] | [];
}
