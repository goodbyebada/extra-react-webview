import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { dummyMonthJobList } from "@api/dummyData";
import { useEffect } from "react";
import { sendMessage } from "@api/utils";
import CompanyRecruitMiniBox from "@components/CompanyRecruitMiniBox";

export default function CompanyDateSelectedPage() {
  const jobList = dummyMonthJobList;

  // 선택된 날짜
  const selectedDate = useSelector(
    (state: RootState) => state.homeSelectedDate,
  );

  useEffect(() => {
    sendMessage({
      type: "POST_DATA",
      payload: {
        date: selectedDate,
      },
      version: "1.0",
    });
  }, [selectedDate]);

  return (
    <JobListContainer>
      {jobList.map((elem, key) => {
        return (
          <Wrapper key={key}>
            <CompanyRecruitMiniBox
              navigate={() => {
                sendMessage({
                  type: "NAVIGATION_DETAIL",
                  payload: {
                    uri: "/company-home/company-job-list/" + elem.job_post_id,
                  },
                  version: "1.0",
                });
              }}
              recruitInfo={elem}
            />
          </Wrapper>
        );
      })}
    </JobListContainer>
  );
}

const JobListContainer = styled.ol`
  overflow-y: scroll;
  box-sizing: border-box;
  background: #302e34;
  padding: 0 20px;
`;

const Wrapper = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: center;
`;
