import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
`;

const ErrorCode = styled.h1`
  font-size: 5em;
  margin: 0;
  color: #f5c001;
`;

const Message = styled.p`
  font-size: 2em;
  margin: 0em 0 2em 0;
  color: #f5c001;
`;

const HomeLink = styled.a`
  text-decoration: none;
  color: #fff;
  font-size: 1.2em;

  &:hover {
    text-decoration: underline;
  }
`;

const InternetConnectError = () => {
  return (
    <Container>
      <ErrorCode>000</ErrorCode>
      <Message>Internet Connect Error</Message>
      <HomeLink href="/">홈으로 돌아가기</HomeLink>
    </Container>
  );
};

export default InternetConnectError;
