import {
  RoleList,
  JobPostList,
  RoleRegister,
  ShootManageList,
  ShootManageSelectStatus,
} from "@api/interface";

/**
 * 캘린더/리스트 조회 dummyData
 */
export const dummyJobPostList: JobPostList = [
  {
    job_post_id: 1,
    calendar: "7/28",
    company_name: "유엠씨 촬영팀",
    title: "UMC 드라마",
    gathering_location: "신사역 6번 출구",
    gathering_time: "7:00",
    category: "드라마",
    status: true,
  },
  {
    job_post_id: 2,
    calendar: "8/1-8/4",
    company_name: "유엠씨 촬영팀2",
    title: "UMC 드라마2",
    gathering_location: "강남역 6번 출구",
    gathering_time: "11:30",
    category: "드라마",
    status: true,
  },
  {
    job_post_id: 3,
    calendar: "8/3-8/7",
    company_name: "유엠씨 촬영팀3",
    title: "UMC 드라마3",
    gathering_location: "신촌역 6번 출구",
    gathering_time: "3:20",
    category: "드라마",
    status: true,
  },
  {
    job_post_id: 4,
    calendar: "8/7-8/11",
    company_name: "유엠씨 촬영팀1esdfs",
    title: "sdfsdf",
    gathering_location: "sdsd역 6번 출구",
    gathering_time: "3:20",
    category: "드라마",
    status: true,
  },
  {
    job_post_id: 5,
    calendar: "8/15",
    company_name: "유엠씨 촬영팀sdf",
    title: "sdfdsdfs",
    gathering_location: "sdfsdf역 6번 출구",
    gathering_time: "3:20",
    category: "드라마",
    status: true,
  },
];

/**
 * 캘린더/리스트 조회  8월달 dummyData
 * 공고가 없는 날은 객체를 생성하지 않는다는 가정하에 만들었다.
 * -> 아직 서버와 합의 되지 않은 부분, 추후 수정 예정
 */

export const dummyMonthJobList: JobPostList = [
  {
    job_post_id: 1,
    calendar: "8/1",
    company_name: "FilmCorp",
    title: "Sunset Dreams",
    gathering_location: "강남역 3번 출구",
    gathering_time: "06:40",
    category: "Drama",
    status: true, //true: 모집중, false: 모집마감
  },
  {
    job_post_id: 2,
    calendar: "8/3-8/4",
    company_name: "Cinema Magic",
    title: "Moonlit Nights",
    gathering_location: "서울역 1번 출구",
    gathering_time: "08:00",
    category: "Romance",
    status: false,
  },
  {
    job_post_id: 3,
    calendar: "8/7-8/9",
    company_name: "Starline Studios",
    title: "City Lights",
    gathering_location: "홍대입구역 2번 출구",
    gathering_time: "07:30",
    category: "Action",
    status: true,
  },
  {
    job_post_id: 4,
    calendar: "8/12",
    company_name: "Visionary Films",
    title: "Winds of Change",
    gathering_location: "잠실역 5번 출구",
    gathering_time: "09:15",
    category: "Thriller",
    status: true,
  },
  {
    job_post_id: 5,
    calendar: "8/14-8/15",
    company_name: "Dreamscapes",
    title: "Echoes",
    gathering_location: "이태원역 4번 출구",
    gathering_time: "10:00",
    category: "Fantasy",
    status: true,
  },
  {
    job_post_id: 6,
    calendar: "8/17",
    company_name: "Cinematic Waves",
    title: "Silent Whispers",
    gathering_location: "강변역 6번 출구",
    gathering_time: "07:45",
    category: "Mystery",
    status: true,
  },
  {
    job_post_id: 7,
    calendar: "8/21-8/22",
    company_name: "Screen Magic",
    title: "The Last Train",
    gathering_location: "삼성역 8번 출구",
    gathering_time: "06:55",
    category: "Crime",
    status: true,
  },
  {
    job_post_id: 8,
    calendar: "8/24",
    company_name: "Vision Quest",
    title: "Unseen Forces",
    gathering_location: "고속터미널역 9번 출구",
    gathering_time: "09:00",
    category: "Sci-Fi",
    status: true,
  },
  {
    job_post_id: 9,
    calendar: "8/26-8/28",
    company_name: "Dream Weavers",
    title: "Whispering Pines",
    gathering_location: "서울대입구역 3번 출구",
    gathering_time: "10:30",
    category: "Horror",
    status: true,
  },
  {
    job_post_id: 10,
    calendar: "8/30",
    company_name: "Film Dreams",
    title: "Mirage",
    gathering_location: "을지로입구역 7번 출구",
    gathering_time: "08:15",
    category: "Adventure",
    status: true,
  },
];

/**
 * 역할 조회 dummyData
 */
export const dummyRoleList: RoleList = [
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

export const dummyRoleResister: RoleRegister = {
  job_post_id: 35, // 임시, API 연결 시 수정
  sex: true, // 남: false, 여: true
  min_age: 1,
  max_age: 4,
  season: "가을",
  costume: "코트",
  check_tatto: "팔, 다리",
  etc: "없음",
  limit_personnal: 10,
};

/**
 * 촬영관리 리스트 조회 dummyData
 */
export const dummyShootManageList: ShootManageList = [
  {
    id: 1,
    category: "드라마",
    title: "UMC1",
    gatheringTime: "2024-01-06T00:29:55",
    gatheringLocation: "강남역",
    name: "UMC1",
    applyStatus: ShootManageSelectStatus.APPLIED,
  },
  {
    id: 2,
    category: "영화",
    title: "UMC2",
    gatheringTime: "2024-01-07T00:29:55",
    gatheringLocation: "신논현역",
    name: "UMC2",
    applyStatus: ShootManageSelectStatus.REJECTED,
  },
  {
    id: 3,
    category: "영화",
    title: "UMC3",
    gatheringTime: "2024-01-08T00:29:55",
    gatheringLocation: "고속 터미널역",
    name: "UMC3",
    applyStatus: ShootManageSelectStatus.APPROVED,
  },
  {
    id: 4,
    category: "드라마",
    title: "UMC4",
    gatheringTime: "2024-01-08T00:29:55",
    gatheringLocation: "고속 터미널역",
    name: "UMC4",
    applyStatus: ShootManageSelectStatus.REJECTED,
  },
  {
    id: 5,
    category: "영화",
    title: "UMC5",
    gatheringTime: "2024-01-08T00:29:55",
    gatheringLocation: "고속 터미널역",
    name: "UMC5",
    applyStatus: ShootManageSelectStatus.APPLIED,
  },
];
