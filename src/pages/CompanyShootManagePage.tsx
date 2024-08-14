/**
 * 업체 현장관리 화면
 * @returns
 */

import styled from "styled-components";
import { dummyMonthJobList } from "@api/dummyData";
import AdminManageRecruitBox from "@components/AdminManageRecruitBox";
import { sendMessage } from "@api/utils";

export default function CompanyShootManagePage() {
  const jobPostList = dummyMonthJobList;

  return (
    <ItemWrapper>
      {jobPostList.map((_, key) => {
        return (
          <AdminManageRecruitBox
            key={key}
            navigate={() => {
              sendMessage({
                type: "NAVIGATION_MANAGE",
                payload: {
                  job_post_id: 1,
                },
                version: "1.0",
              });
            }}
          />
        );
      })}
    </ItemWrapper>
  );
}

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;
