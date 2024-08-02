import { styled } from "styled-components";

/**
 * UI 초기상태 :리스트로 보기
 * type true : 리스트로 보기
 * type false: 캘린더로 보기
 */

export default function TypeSelector({
  type,
  changeTypeHandler,
}: {
  type: boolean;
  changeTypeHandler: () => void;
}) {
  return (
    <Container onClick={changeTypeHandler}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="11"
        viewBox="0 0 16 11"
        fill="none"
      >
        <path
          d="M7.79423 10.2488L0 1.72246H15.5885L7.79423 10.2488Z"
          fill="white"
        />
        <path
          d="M7.79423 8.52632L0 0H15.5885L7.79423 8.52632Z"
          fill="#211F25"
        />
      </svg>
      <span id="selected-type">{type ? "캘린더" : "리스트"}</span>
      <span>로 보기</span>
    </Container>
  );
}

const Container = styled.div`
  color: #adadad;
  font-weight: 500;
  letter-spacing: 0.14px;
  font-size: 14px;
  line-height: 142.857%;

  svg {
    margin-right: 4px;
  }
  & #selected-type {
    color: #f5c001;
  }
`;
