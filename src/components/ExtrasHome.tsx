import { styled } from "styled-components";
import ToggleBar from "@components/ToggleBar";
import TypeSelector from "@components/TypeSelector";
import Calender from "@components/Calender";
import { useState } from "react";
import { dummyMonthJobList } from "@api/dummyData";
import HomeRecruitBox from "@components/HomeRecruitBox";
import { useNavigate } from "react-router-dom";

/**임시
 * API 개발 후 처리할 예정
 */
const name = "미뇽";

/**
 * 보조 출연자 홈화면
 *
 * type initState(초기 상태): 캘린더
 * type True시 : 캘린더
 * type False시 : 리스트
 *
 * @returns 보조 출연자 홈화면 UI
 */
export default function ExtrasHome() {
  // date 관련
  const date = new Date();
  const today = {
    year: date.getFullYear(),
    month: date.getMonth(),
  };

  /**
   * date.getMonth는 항상 원래 월보다 -1이다.
   * useCaleder에 들어가는 값도 원래  month보다 -1 이어야한다.
   */
  const [dateYM, setDateYM] = useState(today);

  const dateYMHandler = (type: string, value: number) => {
    setDateYM((prev) => {
      return type === "month"
        ? { ...prev, [type]: value - 1 }
        : { ...prev, [type]: value };
    });
  };

  // dummydata
  const jobPostList = dummyMonthJobList;

  // navigate
  const path = "/date-selected-notice-list";
  const navigate = useNavigate();

  // 전체 / 추천 토글 state 관리
  const [isListAll, setListAll] = useState(true);

  // 캘린더 / 리스트 버튼 state 관리
  const [type, setType] = useState(true);

  const listAll = `지금 당장 ${name}님이 필요해요 ⏰`;
  const listRecommand = `${name}님한테 딱 맞는 역할이 있어요 🤩`;

  return (
    <Container className="extras-home">
      <TopBar>
        <nav>
          <ToggleBar
            toggle={isListAll}
            toggleHandler={() => setListAll((prev) => !prev)}
          />
          <TypeSelector
            type={type}
            changeTypeHandler={() => setType((prev) => !prev)}
          />
        </nav>

        <h1>{isListAll ? listAll : listRecommand}</h1>
      </TopBar>

      <Content className="content">
        {type ? (
          <Calender
            dateYM={dateYM}
            dateYMHandler={dateYMHandler}
            jobPostList={jobPostList}
            isListAll={isListAll}
          />
        ) : (
          <ItemWrapper>
            {jobPostList.map((elem, key) => {
              return (
                <HomeRecruitBox
                  navigate={() => navigate(path)}
                  key={key}
                  recruitInfo={elem}
                />
              );
            })}
          </ItemWrapper>
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 22px;
`;

const Content = styled.div``;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const TopBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 9;
  background-color: #000000;
  margin-top: 43px;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    color: #fff;
    font-size: 20px;
    font-weight: 900;
    line-height: 100%;
    letter-spacing: 0.2px;
    margin-top: 21px;
    top: 30px;
  }

  padding-bottom: 23px;
`;
