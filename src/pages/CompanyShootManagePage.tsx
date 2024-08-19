/**
 * 업체 현장관리 화면
 * @returns
 */

import styled from "styled-components";
import AdminManageRecruitBox from "@components/AdminManageRecruitBox";
import { sendMessage } from "@api/utils";
import { useEffect, useState } from "react";
import { JobPost } from "@api/interface";

export default function CompanyShootManagePage() {
  const [jobPostList, setJobPostList] = useState<JobPost[]>([]);

  // jobPost API 호출
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      return;
    }

    fetch(`${import.meta.env.VITE_SERVER_URL}api/v1/jobposts?page=0`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Failed to fetch job posts", response.statusText);
          return [];
        }
      })
      .then((data: JobPost[]) => {
        setJobPostList(data);
      })
      .catch((error) => {
        console.error("Failed to fetch job posts", error);
      });
  });

  return (
    <ItemWrapper>
      {jobPostList.map((jobPostInfo, key) => (
        <AdminManageRecruitBox
          key={key}
          jobPostInfo={jobPostInfo}
          navigate={() => {
            sendMessage({
              type: "NAVIGATION_MANAGE",
              payload: {
                job_post_id: jobPostInfo.id,
              },
              version: "1.0",
            });
          }}
        />
      ))}
    </ItemWrapper>
  );
}

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;
