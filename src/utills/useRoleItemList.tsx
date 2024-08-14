import { JobPost } from "@api/interface";
import RoleDetailItem from "@utills/RoleDetailItem";

/**
 *
 * @param selectedJobPostItem
 * @returns 역할 UI를 담은 UILIST 반환
 */
const useRoleItemList = (selectedJobPostItem: JobPost) => {
  const {
    roleNameList,
    costumeList,
    sexList,
    roleAgeList,
    // limitPersonnelList,
    // currentPersonnelList,
    seasonList,
  } = selectedJobPostItem;

  const roleComponents = [];

  // 서버 나이 현재 null 로 되어있음 나이 임시처리
  for (let i = 0; i < selectedJobPostItem.roleNameList.length; i++) {
    let roleDefaultList = "나이 무관";

    if (roleAgeList !== null) {
      roleDefaultList = selectedJobPostItem.roleAgeList[i][0];
    }

    roleComponents.push(
      RoleDetailItem(
        i,
        roleNameList[i],
        costumeList[i],
        sexList[i],
        roleDefaultList,
        seasonList[i],
      ),
    );
  }

  return <>{roleComponents}</>;
};

export default useRoleItemList;
