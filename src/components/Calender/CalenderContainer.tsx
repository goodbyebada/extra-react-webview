import { styled } from "styled-components";

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

  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  color: #fff;
  line-height: 142.857%;

  /* 드래그 방지  */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
