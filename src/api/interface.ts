/**
 * 캘린더 / 리스트 조회시의 response.data.job_post_list 리스트의 item type
 */
export type JobPost = {
  job_post_id: number;
  calendar: string;
  company_name: string;
  drama_title: string;
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
