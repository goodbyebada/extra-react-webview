/**
 * 업체 현장관리 화면
 * @returns
 */

import styled from "styled-components";
import { dummyMonthJobList } from "@api/dummyData";
import HomeRecruitBox from "@/components/HomeRecruitBox";
import { sendMessage } from "@api/message";

export default function CompanyShootManagePage() {
  const jobPostList = dummyMonthJobList;

  return (
    <ItemWrapper>
      {jobPostList.map((elem, key) => {
        return (
          <HomeRecruitBox
            navigate={() => {
              sendMessage({
                type: "NAVIGATION_MANAGE",
                payload: {
                  job_post_id: 1,
                },
                version: "1.0",
              });
            }}
            key={key}
            recruitInfo={elem}
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
