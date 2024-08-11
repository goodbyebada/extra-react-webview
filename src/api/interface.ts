/**
 * 캘린더 / 리스트 조회시의 response.data.job_post_list 리스트의 item type
 */
export type JobPost = {
  job_post_id: number;
  calendar: string;
  company_name: string;
  title: string;
  gathering_location: string;
  gathering_time: string; // string 또는 timestamp 형식의 string 사용 가능
  category: string;
  status: boolean;
};

/**
 * 역할 조회 API 호출시,
 * response.data.rolelist 리스트의 item type
 */
export type Role = {
  role_id: number;
  role_name: string;
  costume: string;
  sex: boolean; // true: female, false: male
  role_age: string;
  limit_personnal: number;
  current_personnal: number;
  season: string;
  check_tatto: boolean;
  apply_status: string;
};

/**
 * 캘린더 / 리스트 조회 API 호출시,
 * response.data.job_post_list type
 */
export type JobPostList = JobPost[];

/**
 * 역할 조회 API 호출시,
 * response.data.rolelist type
 */
export type RoleList = Role[];

/**
 * 역할 등록 API 호출시,
 * request
 */
export type RoleRegister = {
  job_post_id: number;
  sex: boolean; // true: female, false: male
  min_age: number;
  max_age: number;
  season: string;
  costume: string;
  check_tatto: string; // boolean -> string 변경
  etc: string;
  limit_personnal: number;
};

export enum ShootManageSelectStatus {
  "ALL" = 0,
  "APPLIED" = 1,
  "REJECTED" = 2,
  "APPROVED" = 3,
}

// Reverse mapping
export const ApplyStatusLabel: { [key: number]: string } = {
  0: "전체",
  1: "승인 대기",
  2: "미승인",
  3: "승인 완료",
};
