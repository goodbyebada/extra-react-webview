import { styled } from "styled-components";

/**
 * 캘린더를 감싸는 container
 * calenderComponent Width랑 Height 결정하기 위해 설정
 * - Wrapper의 역할
 * @param param0
 * @returns
 */
export default function CalenderContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  width: 100%;
  max-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  /* 드래그 방지  */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
