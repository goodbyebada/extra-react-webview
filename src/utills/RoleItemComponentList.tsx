import { JobPost } from "@/types/shared";
import RoleDetailItem from "@utills/RoleDetailInfo";
import { SeasonLabel } from "@/types/shared";

/**
 *
 * @param selectedJobPostItem
 * @returns 역할 UI를 담은 UILIST 반환
 */
const RoleItemComponentList = (selectedJobPostItem: JobPost) => {
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
    let roleDefaultList = null;

    if (roleAgeList !== null) {
      roleDefaultList = selectedJobPostItem.roleAgeList[i];
    }

    roleComponents.push(
      RoleDetailItem(
        i,
        roleNameList[i],
        costumeList[i].split(","),
        sexList[i],
        roleDefaultList,
        SeasonLabel[seasonList[i]],
      ),
    );
  }

  return <>{roleComponents}</>;
};

export default RoleItemComponentList;
