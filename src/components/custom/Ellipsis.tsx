import { styled } from "styled-components";

export default function Ellipsis() {
  return (
    <Wrapper>
      <CheckerWrapper>
        <Checker />
        <Checker />
        <Checker />
      </CheckerWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* height: 20px; */
  /* height: var(--__scheduledItemHeigth); */
  height: 20px;
  background-color: yellow;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  align-self: center;
`;

const CheckerWrapper = styled.div``;

const Checker = styled.div`
  display: flex;
  justify-items: center;
  width: 2px;
  height: 2px;
  margin: 1px;

  border-radius: 50%;
  background-color: #f8f8f8;
`;
