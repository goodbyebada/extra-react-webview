import { styled } from "styled-components";
import { JobPostList } from "@api/interface";
import HomeRecruitBox from "@components/HomeRecruitBox";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

type CompanyModalType = {
  jobList: JobPostList;
};

/**
 * 추후 수정 예정
 * 1. 음력 날짜 치환 로직
 * 2. HomeRecruitBox click시 이동할 navigate path 확정시 수정 예정
 *
 *
 *
 * @param param0
 * @returns 홈 업체 화면에서 날짜 선택시의 모달창
 */

// TODO CompanyModal atoms 이용해 분리해야함
export default function CompanyModal({ jobList }: CompanyModalType) {
  // 임시 경로
  const path = "company-job-list/";

  const navigate = useNavigate();
  // 선택된 날짜
  const selectedDate = useSelector((state: RootState) => state.date);
  const { month, dateNum, dayOfWeek } = selectedDate.selectedByHome;
  const dayOfWeekString = dayOfWeek + "요일";

  return (
    <Container>
      <Top className="top">
        <div className="date">
          <span id="date-num">{dateNum}</span>
          <span id="day-of-week">{dayOfWeekString}</span>
        </div>
        <svg
          width="100%"
          height="12"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <circle cx="6" cy="6" r="5.3333" fill="white" />
          <line x1="6" y1="6" x2="100%" y2="6" stroke="white" strokeWidth="2" />
        </svg>
      </Top>

      <JobListContainer className="job-list-container">
        {jobList.map((elem, key) => {
          return (
            <Wrapper key={key}>
              <HomeRecruitBox
                navigate={() => {
                  navigate(path + `${elem.id}`);
                }}
                recruitInfo={elem}
              />
            </Wrapper>
          );
        })}
      </JobListContainer>

      <BottomBarWrapper>
        <BottomBarInput>
          <p>
            {month}월 {dateNum}일에 추가
          </p>
        </BottomBarInput>

        <BottomBarButton>+</BottomBarButton>
      </BottomBarWrapper>
    </Container>
  );
}

const Container = styled.div`
  --__top_bar: 162px;
  --__container_height: 618px;
  --__border-radius: 25px;
  --__bottom_bar_height: 70px;

  width: 326px;
  height: var(--__container_height);
  border-radius: var(--__border-radius);
  background: #302e34;

  .top {
    height: var(--__top_bar);
  }

  .job-list-container {
    height: calc(100% - var(--__top_bar) - var(--__bottom_bar_height));
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }
`;

const JobListContainer = styled.ol`
  overflow-y: scroll;
  box-sizing: border-box;
`;

const Top = styled.div`
  padding-left: 20px;
  padding-right: 20px;

  .date {
    display: flex;
    align-self: center;

    padding-top: 40px;
    padding-bottom: 22px;
    font-weight: 600;

    /* 날짜 */
    #date-num {
      font-size: 32px;
      line-height: 62.5%;
      letter-spacing: 0.32px;
      padding-right: 27px;
      padding-left: 3px;
    }

    /* 요일 */
    #day-of-week {
      font-size: 20px;
      line-height: 100%;
      letter-spacing: 0.2px;
    }
  }

  .lunar-calendar {
    padding-top: 16px;
  }
`;

const Wrapper = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: center;
`;

const BottomBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  height: var(--__bottom_bar_height);
`;

// 만약 기능 구현시 tag input으로 수정해야함
const BottomBarInput = styled.span`
  vertical-align: middle;

  color: #7b7b7b;

  border-radius: 5px;
  border: 1px solid #fff;
  width: 223px;
  height: 26px;

  display: flex;
  align-items: center;

  p {
    padding-left: 10px;
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.1px;
  }
`;

const BottomBarButton = styled.button`
  color: #7b7b7b;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 0.32px;
  display: flex;
  align-self: center;
`;
