import { AUTH_TYPE_CONST } from "@constants/const";

// TODO 사용자 정보 Auth RTK 에 저장해 수정할 것
export const getAuthType = (type: string) => {
  if (type === AUTH_TYPE_CONST.COMPANY) {
    return AUTH_TYPE_CONST.COMPANY;
  }

  return AUTH_TYPE_CONST.MEMBER;
};
