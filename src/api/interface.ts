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

/**
 * JobPost 단건 조회
 */
export interface JobPost {
  id: number;
  title: string;
  gatheringLocation: string;
  gatheringTime: string;
  imageUrl: string;
  status: boolean;
  hourPay: number;
  category: string;
  companyName: string;
  scheduleIdList: number[]; //? 무슨 값인지 확인 필요 와이어프레임에는 안보임
  calenderList: string[];
  roleIdList: number[];
  roleNameList: string[];
  costumeList: string[][]; // ? 백에서 구현됐는지 확인 필요
  sexList: boolean[];
  roleAgeList: string[][]; // ? roleAgeList 백과 합의 안됨 추후 수정예정
  limitPersonnelList: number[];
  currentPersonnelList: number[];
  seasonList: string[];
  checkTattooList: boolean[];
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
  roleName: string;
  costume: string;
  sex: boolean;
  roleAge: string;
  limitPersonnel: number;
  currentPersonnel: number;
  season: string;
  checkTattoo: boolean;
};

/**
 * 역할 생성 / 역할 수정시
 * API put post 시 body type
 *
 * 역할 등록 === 역할 생성
 * roleBodyType으로 수정 부탁드립니다.
 */
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

/**
 * 촬영관리 API 호출시,
 * request
 */
export type ShootManage = {
  id: number;
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
