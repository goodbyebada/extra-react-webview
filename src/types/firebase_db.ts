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
  user_id: number;
  user_name: string;
  message: string;
  created_at: string | FieldValue;
}
