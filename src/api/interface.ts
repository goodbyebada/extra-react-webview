export const BASE_URL = "https://test-server.store/api/v1";

/**
 * JobPost API 관련 인터페이스
 * - 공고 생성
 * - 공고 수정
 * - 전체 조회
 * - 단건 조회
 */

/**
 * JobPost 공고 생성, 공고 수정시 사용되는 type
 */
export interface JobPostRequest {
  title: string;
  gatheringLocation: string;
  gatheringTime: string;
  imageUrl: string;
  status: boolean;
  hourPay: number;
  category: string;
}

export type Tattoo = {
  face: boolean;
  chest: boolean;
  arm: boolean;
  leg: boolean;
  shoulder: boolean;
  back: boolean;
  hand: boolean;
  feet: boolean;
};

/**
 * JobPost 단건 조회
 */
export interface JobPost {
  id: number;
  title: string;
  gatheringLocation: string;
  gatheringTime: string;
  imageUrl?: string; // ? 서버에서 없을텐데 왜 이 속성이 있는지 모르겠다
  status: boolean;
  hourPay: number;
  category: string;
  companyName: string;
  scheduleIdList: number[]; //? 무슨 값인지 확인 필요 와이어프레임에는 안보임
  calenderList: string[];
  roleIdList: number[];
  roleNameList: string[];
  costumeList: string[]; // ? 백에서 구현됐는지 확인 필요
  sexList: boolean[];
  roleAgeList: string[]; // ? roleAgeList 백과 합의 안됨 추후 수정예정
  limitPersonnelList: number[];
  currentPersonnelList: number[];
  seasonList: string[];
  tattooList: Tattoo[];
}

/**
 *  JobPost 전체 조회
 */
export type JobPostList = JobPost[];

/**
 * 공고 조회 > 모달창에서 역할 조회시
 * 역할 type
 * 프론트에서만 사용할 RoleType
 */
export type RoleItemToShow = {
  roleId: number;
  roleName: string;
  roleAge: string;
  sex: boolean;
};

export type RoleListToShow = RoleItemToShow[];

/**
 * jobPosts/{jobPost_id}/roles API
 * - 역할 생성
 * - 역할 수정
 */
export type RoleBodyType = {
  id: number;
  roleName: string;
  costume: string;
  sex: boolean;
  minAge: string;
  maxAge: string;
  limitPersonnel: number;
  currentPersonnel: number;
  season: string;
  tattoo: Tattoo;
};

/**
 * 촬영관리 API 호출시,
 * request
 */
export type RoleRegister = {
  job_post_id: number;
  sex: boolean; // true: female, false: male
  min_age: number;
  max_age: number;
  season: keyof typeof SeasonEnum;
  costume: string;
  etc: string;
  limit_personnal: number;
  tattoo: {
    face: boolean;
    chest: boolean;
    arm: boolean;
    leg: boolean;
    shoulder: boolean;
    back: boolean;
    hand: boolean;
    feet: boolean;
  };
};

export type ShootManage = {
  id: number;
  jobPostId: number;
  category: string;
  title: string;
  gatheringTime: string;
  gatheringLocation: string;
  calenderList: string[];
  name: string;
  applyStatus: ShootManageSelectStatus;
};

/**
 * 촬영관리 조회 API 호출시,
 * response.data.shoot_manage_list type
 */
export type ShootManageList = ShootManage[];

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

export type Role = {
  id: number;
  roleName: string;
  costume: string;
  sex: boolean;
  minAge: number;
  maxAge: number;
  limitPersonnel: number;
  currentPersonnel: number;
  season: string;
  tattoo: Tattoo;
};

export type RoleList = Role[];

export type CategoryEnumType = {
  DRAMA: "드라마";
  MOVIE: "영화";
  ADVERTISEMENT: "광고";
  MUSIC_VIDEO: "뮤비촬영";
  ETC?: string;
};

export const CategoryEnum: CategoryEnumType = {
  DRAMA: "드라마",
  MOVIE: "영화",
  ADVERTISEMENT: "광고",
  MUSIC_VIDEO: "뮤비촬영",
};

export const SeasonEnum = {
  SPRING: "봄",
  SUMMER: "여름",
  AUTUMN: "가을",
  WINTER: "겨울",
};

export enum ResponseStatus {
  "loading" = "LOAIDNG",
  "fullfilled" = "FULFILLED",
  "rejected" = "REJECTED",
}

export interface MemberRoleServer {
  id: number;
  jobPostId: number;
  category: string;
  calenderList: string[];
  title: string;
  gatheringTime: string; //시간
  gatheringLocation: string;
  name: string;
  applyStatus: string;
}

export interface MemberRoleFront {
  id: number;
  jobPostId: number;
  category: string;
  title: string;
  gatheringTime: string; //시간
  gatheringLocation: string;
  companyName: string;
  status: string;
  calender: {
    startDateNum: number;
    endDateNum: number;
  };
  // 만약 1일이라면 startDateNum == endDateNum
}

// 객체 타입 정의
export type ScheduleElemType = {
  id: number; // id가 숫자나 문자열일 수 있음
  title: string;
  dateNum: number; // dateNum이 숫자형인 경우
  status: string; // status는 문자열로 가정
};

export enum ScheduleTypeStatusLabel {
  "APPLIED" = "APPLIED",
  "REJECTED" = "REJECTED",
  "APPROVED" = "APPROVED",
  "DEFAULT" = "DEFAULT",
}

export enum ScheduleType {
  "SINGLE" = 0,
  "START" = 1,
  "END" = 2,
  "MIDDLE" = 3,
}

export const SeasonLabel: { [key: string]: string } = {
  SPRING: "봄",
  SUMMER: "여름",
  AUTUMN: "가을",
  WINTER: "겨울",
};

export interface dateYM {
  year: number;
  month: number;
}

export interface QuryTypesWithPage extends dateYM {
  pageNum: number;
}

export type ObjectType = {
  [key: string]: number[];
};
export enum CalenderTypeFor {
  "user" = 0,
  "company" = 1,
}
