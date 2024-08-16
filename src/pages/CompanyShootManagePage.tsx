/**
 * 업체 현장관리 화면
 * @returns
 */

import styled from "styled-components";
import AdminManageRecruitBox from "@components/AdminManageRecruitBox";
import { sendMessage, requestGetFetch } from "@api/utils";
import { useEffect, useState } from "react";
import { JobPost } from "@api/interface";

export default function CompanyShootManagePage() {
  const [jobPostList, setJobPostList] = useState<JobPost[]>([]);

  useEffect(() => {
    requestGetFetch("jobposts?page=1", (res) => {
      if (res) {
        if (res.status === 200) {
          res.json().then((data) => {
            setJobPostList(data);
          });
        }
      }
    });
  }, []);

  return (
    <ItemWrapper>
      {jobPostList.map((jobPostInfo, key) => {
        return (
          <AdminManageRecruitBox
            key={key}
            jobPostInfo={jobPostInfo}
            navigate={() => {
              sendMessage({
                type: "NAVIGATION_MANAGE",
                payload: {
                  job_post_id: jobPostInfo.id,
                  roleIdList: jobPostInfo.roleIdList,
                  roleNameList: jobPostInfo.roleNameList,
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
