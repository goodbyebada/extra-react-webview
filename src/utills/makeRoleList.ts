import { JobPost } from "@api/interface";
import { RoleItemToShow } from "@api/interface";

/**
 *
 * 모달창에 띄울 역할 리스트 생성
 * @param selectedJobPostItem
 * @returns
 */
const makeRoleList = (selectedJobPostItem: JobPost) => {
  const RoleList = [];

  const { roleIdList, roleNameList, roleAgeList, sexList } =
    selectedJobPostItem;

  for (let i = 0; i < selectedJobPostItem.roleNameList.length; i++) {
    // 현재 서버 값에 대한 임시처리
    let roleDefaultList = "나이 무관";
    if (roleAgeList !== null) {
      roleDefaultList = selectedJobPostItem.roleAgeList[i];
    }

    const Role: RoleItemToShow = {
      roleId: roleIdList[i],
      roleName: roleNameList[i],
      roleAge: roleDefaultList,
      sex: sexList[i],
    };
    RoleList.push(Role);
  }
  return RoleList;
};

export default makeRoleList;
