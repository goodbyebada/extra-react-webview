import { MemberRoleServer, MemberRoleFront, JobPostList } from "@api/interface";

import { ObjectType } from "@api/dateInteface";

export {
  memberRoleServerDummyList,
  memberRoleFrontDummyData,
  dummyCalenderDataForExtra,
  dummyJobPostList,
  dummyCalenderDataForCompany,
  dummyUserRoleData,
};

const memberRoleServerDummyList: MemberRoleServer[] = [
  {
    id: 1,
    jobPostId: 1,
    category: "MOVIE",
    title: "섀도우플레이",
    gatheringTime: "6시까지 집합. 지각 금지",
    gatheringLocation: "서울특별시 서초구 서초역 3번 출구",
    calenderList: ["2024-09-01"],
    name: "엑스트라",
    applyStatus: "REJECTED",
  },
  {
    id: 2,
    jobPostId: 2,
    category: "MOVIE",
    title: "라스트 서바이벌",
    gatheringTime: "4시 30분까지 도착",
    gatheringLocation: "서울특별시 종로구 광화문역 1번 출구",
    calenderList: ["2024-11-02", "2024-11-05"],
    name: "UMC",
    applyStatus: "APPROVED",
  },
  {
    id: 3,
    jobPostId: 3,
    category: "ADVERTISEMENT",
    title: "아워 타임즈",
    gatheringTime: "7시 15분까지 모임",
    gatheringLocation: "서울특별시 용산구 이태원역 4번 출구",
    calenderList: ["2024-10-10", "2024-10-12", "2024-10-15"],
    name: "몽실몽실",
    applyStatus: "APPLIED",
  },
  {
    id: 4,
    jobPostId: 4,
    category: "MOVIE",
    title: "블랙 마스크",
    gatheringTime: "5시까지 도착 필수",
    gatheringLocation: "서울특별시 강남구 역삼동",
    calenderList: ["2024-09-10"],
    name: "엑스트라",
    applyStatus: "REJECTED",
  },
  {
    id: 5,
    jobPostId: 5,
    category: "MOVIE",
    title: "미래의 연대기",
    gatheringTime: "3시까지 도착. 음식 제공",
    gatheringLocation: "서울특별시 마포구 홍대입구역 1번 출구",
    calenderList: ["2024-11-03", "2024-11-07"],
    name: "UMC",
    applyStatus: "APPROVED",
  },
];

/**
 * JobPost 공고 전체 조회
 * - 캘린더/ 리스트 공고 조회
 */
const memberRoleFrontDummyData: MemberRoleFront[] = [
  {
    id: 1,
    jobPostId: 1,
    category: "Developer",
    title: "111",
    gatheringTime: "2024-09-02T10:00:00", // 시간
    gatheringLocation: "Seoul, Korea",
    companyName: "Tech Corp",
    status: "APPROVED",
    calender: {
      startDateNum: 1,
      endDateNum: 5, // 1일이면 startDateNum == endDateNum
    },
  },
  {
    id: 2,
    jobPostId: 2,
    category: "Designer",
    title: "UI/UX Designer",
    gatheringTime: "2024-09-02T10:00:00",
    gatheringLocation: "Busan, Korea",
    companyName: "Creative Studio",
    status: "APPLIED",
    calender: {
      startDateNum: 2,
      endDateNum: 6,
    },
  },
  {
    id: 3,
    jobPostId: 3,
    category: "Manager",
    title: "Project Manager",
    gatheringTime: "2024-09-18T10:00:00",
    gatheringLocation: "Incheon, Korea",
    companyName: "Global Solutions",
    status: "APPROVED",
    calender: {
      startDateNum: 3,
      endDateNum: 5, // 2일 행사
    },
  },
  {
    id: 4,
    jobPostId: 4,
    category: "signle",
    title: "signeldfsdf",
    gatheringTime: "2024-09-18T10:00:00",
    gatheringLocation: "Incheon, Korea",
    companyName: "Global Solutions",
    status: "APPROVED",
    calender: {
      startDateNum: 10,
      endDateNum: 10, // 2일 행사
    },
  },
];

/**
 * jobPost
 * 캘린더 화면일 때 호출되는 API response
 */

const dummyCalenderDataForExtra: ObjectType = {
  "2024-09-02": [1, 2],
  "2024-09-05": [2],
  "2024-09-18": [3, 4],
};

const dummyCalenderDataForCompany: ObjectType = dummyCalenderDataForExtra;

/**
 * JobPost 공고 전체 조회
 * - 캘린더/ 리스트 공고 조회
 */
const dummyJobPostList: JobPostList = [
  {
    id: 1,
    title: "라스트 서바이벌1",
    gatheringLocation: "서울특별시 종로구 광화문역 1번 출구",
    gatheringTime: "4시 30분까지 도착",
    status: true,
    hourPay: 9860,
    category: "MOVIE",
    companyName: "UMC",
    scheduleIdList: [2, 3],
    calenderList: ["2024-09-02", "2024-09-05"],
    roleIdList: [4, 5, 6],
    roleNameList: ["정보 분석가", "생존 전문가", "무기 전문가"],
    costumeList: [
      "가벼운 방탄 조끼, 모자, 방수 바지",
      "다목적 전투복, 군용 부츠, 다기능 벨트",
      "전투용 장갑, 방탄 조끼, 전술 헬멧",
    ],
    sexList: [false, true, true],
    roleAgeList: ["31 ~ 25", "41 ~ 30", "44 ~ 33"],
    limitPersonnelList: [3, 2, 1],
    currentPersonnelList: [1, 1, 1],
    seasonList: ["SUMMER", "SUMMER", "SUMMER"],
    tattooList: [
      {
        face: false,
        chest: false,
        arm: false,
        leg: false,
        shoulder: false,
        back: false,
        hand: false,
        feet: false,
      },
      {
        face: false,
        chest: false,
        arm: false,
        leg: false,
        shoulder: true,
        back: false,
        hand: false,
        feet: false,
      },
      {
        face: false,
        chest: false,
        arm: false,
        leg: true,
        shoulder: false,
        back: false,
        hand: false,
        feet: false,
      },
    ],
  },
  {
    id: 2,
    title: "라스트 서바이벌2",
    gatheringLocation: "서울특별시 종로구 광화문역 1번 출구",
    gatheringTime: "4시 30분까지 도착",
    status: true,
    hourPay: 9860,
    category: "MOVIE",
    companyName: "UMC",
    scheduleIdList: [2, 3],
    calenderList: ["2024-09-02", "2024-09-05"],
    roleIdList: [4, 5, 6],
    roleNameList: ["정보 분석가", "생존 전문가", "무기 전문가"],
    costumeList: [
      "가벼운 방탄 조끼, 모자, 방수 바지",
      "다목적 전투복, 군용 부츠, 다기능 벨트",
      "전투용 장갑, 방탄 조끼, 전술 헬멧",
    ],
    sexList: [false, true, true],
    roleAgeList: ["31 ~ 25", "41 ~ 30", "44 ~ 33"],
    limitPersonnelList: [3, 2, 1],
    currentPersonnelList: [1, 1, 1],
    seasonList: ["SUMMER", "SUMMER", "SUMMER"],
    tattooList: [
      {
        face: false,
        chest: false,
        arm: false,
        leg: false,
        shoulder: false,
        back: false,
        hand: false,
        feet: false,
      },
      {
        face: false,
        chest: false,
        arm: false,
        leg: false,
        shoulder: true,
        back: false,
        hand: false,
        feet: false,
      },
      {
        face: false,
        chest: false,
        arm: false,
        leg: true,
        shoulder: false,
        back: false,
        hand: false,
        feet: false,
      },
    ],
  },
  {
    id: 3,
    title: "라스트 서바이벌3",
    gatheringLocation: "서울특별시 종로구 광화문역 1번 출구",
    gatheringTime: "4시 30분까지 도착",
    status: true,
    hourPay: 9860,
    category: "MOVIE",
    companyName: "UMC",
    scheduleIdList: [2, 3],
    calenderList: ["2024-09-18", "2024-09-18"],
    roleIdList: [4, 5, 6],
    roleNameList: ["정보 분석가", "생존 전문가", "무기 전문가"],
    costumeList: [
      "가벼운 방탄 조끼, 모자, 방수 바지",
      "다목적 전투복, 군용 부츠, 다기능 벨트",
      "전투용 장갑, 방탄 조끼, 전술 헬멧",
    ],
    sexList: [false, true, true],
    roleAgeList: ["31 ~ 25", "41 ~ 30", "44 ~ 33"],
    limitPersonnelList: [3, 2, 1],
    currentPersonnelList: [1, 1, 1],
    seasonList: ["SUMMER", "SUMMER", "SUMMER"],
    tattooList: [
      {
        face: false,
        chest: false,
        arm: false,
        leg: false,
        shoulder: false,
        back: false,
        hand: false,
        feet: false,
      },
      {
        face: false,
        chest: false,
        arm: false,
        leg: false,
        shoulder: true,
        back: false,
        hand: false,
        feet: false,
      },
      {
        face: false,
        chest: false,
        arm: false,
        leg: true,
        shoulder: false,
        back: false,
        hand: false,
        feet: false,
      },
    ],
  },
  {
    id: 4,
    title: "라스트 서바이벌4",
    gatheringLocation: "서울특별시 종로구 광화문역 1번 출구",
    gatheringTime: "4시 30분까지 도착",
    status: true,
    hourPay: 9860,
    category: "MOVIE",
    companyName: "UMC",
    scheduleIdList: [2, 3],
    calenderList: ["2024-09-18", "2024-09-18"],
    roleIdList: [4, 5, 6],
    roleNameList: ["정보 분석가", "생존 전문가", "무기 전문가"],
    costumeList: [
      "가벼운 방탄 조끼, 모자, 방수 바지",
      "다목적 전투복, 군용 부츠, 다기능 벨트",
      "전투용 장갑, 방탄 조끼, 전술 헬멧",
    ],
    sexList: [false, true, true],
    roleAgeList: ["31 ~ 25", "41 ~ 30", "44 ~ 33"],
    limitPersonnelList: [3, 2, 1],
    currentPersonnelList: [1, 1, 1],
    seasonList: ["SUMMER", "SUMMER", "SUMMER"],
    tattooList: [
      {
        face: false,
        chest: false,
        arm: false,
        leg: false,
        shoulder: false,
        back: false,
        hand: false,
        feet: false,
      },
      {
        face: false,
        chest: false,
        arm: false,
        leg: false,
        shoulder: true,
        back: false,
        hand: false,
        feet: false,
      },
      {
        face: false,
        chest: false,
        arm: false,
        leg: true,
        shoulder: false,
        back: false,
        hand: false,
        feet: false,
      },
    ],
  },
];

/**
 * 지원자 정보 (임시)
 * - 역할 별 지원현황 / 상세페이지 모달 / 온도 평가
 */
const dummyUserRoleData = [
  {
    id: 1,
    userId: "1",
    name: "user1",
    category: "UMC 드라마",
    role: "학생 역할",
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    userId: "2",
    name: "user2",
    category: "UMC 영화",
    role: "학생 역할",
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    userId: "3",
    name: "user3",
    category: "UMC 연극",
    role: "주인공 역할",
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 4,
    userId: "4",
    name: "user4",
    category: "UMC 드라마",
    role: "조연 역할",
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 5,
    userId: "5",
    name: "user5",
    category: "UMC 영화",
    role: "조연 역할",
    imageUrl: "https://via.placeholder.com/100",
  },
];
