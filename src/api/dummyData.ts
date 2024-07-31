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

type JobPostList = JobPost[];

/**
 * 캘린더/리스트 조회 dummyData
 */
export const dummyJobPostList: JobPostList = [
  {
    job_post_id: 1,
    calendar: "8/1-8/4",
    company_name: "유엠씨 촬영팀",
    drama_title: "UMC 드라마",
    gathering_location: "신사역 6번 출구",
    gathering_time: "7:00",
    category: "드라마",
    status: true,
  },
  {
    job_post_id: 2,
    calendar: "8/1-8/4",
    company_name: "유엠씨 촬영팀2",
    drama_title: "UMC 드라마2",
    gathering_location: "강남역 6번 출구",
    gathering_time: "11:30",
    category: "드라마",
    status: true,
  },
  {
    job_post_id: 3,
    calendar: "8/1-8/4",
    company_name: "유엠씨 촬영팀3",
    drama_title: "UMC 드라마3",
    gathering_location: "신촌역 6번 출구",
    gathering_time: "3:20",
    category: "드라마",
    status: true,
  },
];

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
 * 역활 조회 조회 dummyData
 */
export const dummyRoleList: Role[] = [
  {
    role_id: 1,
    role_name: "학생 역할",
    costume: "교복 지급",
    sex: true, // 여
    role_age: "20 - 25 세",
    limit_personnal: 5,
    current_personnal: 2,
    season: "여름",
    check_tatto: false,
    apply_status: "신청 중",
  },
  {
    role_id: 2,
    role_name: "학생 역할",
    costume: "정장 1, 세미 정장 1, 캐주얼 2",
    sex: false, // 남
    role_age: "20 - 25 세",
    limit_personnal: 3,
    current_personnal: 1,
    season: "여름",
    check_tatto: false,
    apply_status: "신청 중",
  },
  {
    role_id: 3,
    role_name: "선생님 역할",
    costume: "교복 지급",
    sex: true, // 여
    role_age: "20 - 25 세",
    limit_personnal: 2,
    current_personnal: 1,
    season: "여름",
    check_tatto: false,
    apply_status: "신청 중",
  },
];
