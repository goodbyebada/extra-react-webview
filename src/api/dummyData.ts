import { MemberRoleFront } from "@api/interface";
/**
 * JobPost 공고 전체 조회
 * - 캘린더/ 리스트 공고 조회
 */
export const memberRoleFrontDummyData: MemberRoleFront[] = [
  {
    id: 1,
    jobPostId: 101,
    category: "Developer",
    title: "111",
    gatheringTime: "2024-08-20T10:00:00", // 시간
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
    jobPostId: 102,
    category: "Designer",
    title: "UI/UX Designer",
    gatheringTime: "2024-08-20T10:00:00",
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
    jobPostId: 103,
    category: "Manager",
    title: "Project Manager",
    gatheringTime: "2024-08-20T10:00:00",
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
    jobPostId: 103,
    category: "signle",
    title: "signeldfsdf",
    gatheringTime: "2024-08-20T10:00:00",
    gatheringLocation: "Incheon, Korea",
    companyName: "Global Solutions",
    status: "APPROVED",
    calender: {
      startDateNum: 10,
      endDateNum: 10, // 2일 행사
    },
  },
];
