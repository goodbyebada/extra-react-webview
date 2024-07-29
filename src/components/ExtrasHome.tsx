import { styled } from "styled-components";
import ToggleBar from "./ToggleBar";
import TypeSelector from "./TypeSelector";
import Calender from "./Calender";
import { useState } from "react";

/**
 * 보조 출연자 홈화면
 */

/**
 * type initState(초기 상태): 전체
 * type True시 : 전체
 * type False시 : 추천
 */

export default function ExtrasHome() {
  /**임시
   * API 개발 후 처리할 예정
   */

  const name = "미뇽";

  /**
   * toggle 전환시, data 값 바뀌어야함
   * API 개발 후 처리할 예정
   */
  const [toggle, setToggled] = useState(true);

  const [type, setType] = useState(true);

  const listAll = `지금 당장 ${name}님이 필요해요 ⏰`;
  const recommandAll = `${name}님한테 딱 맞는 역할이 있어요 🤩`;

  return (
    <Container className="extras-home">
      <nav>
        <ToggleBar
          toggle={toggle}
          toggleHandler={() => setToggled((prev) => !prev)}
        />
        <TypeSelector
          type={type}
          changeTypeHandler={() => setType((prev) => !prev)}
        />
      </nav>

      <h1>{toggle ? listAll : recommandAll}</h1>

      {/* 리스트로 보기 content UI 임시 */}
      <div className="content">{type ? <Calender /> : "list"}</div>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 22px;
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
  }

  .content {
    margin-top: 23px;
  }
`;
