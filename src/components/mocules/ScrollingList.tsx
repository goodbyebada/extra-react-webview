import styled from "styled-components";

interface ScrollingListProps {
  children: React.ReactNode;
}

const ScrollingListWrapper = styled.div`
  width: 100%;
  height: 100%;

  overflow-x: hidden;
  overflow-y: scroll;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledScrollingList = styled.ul`
  width: 100%;

  list-style: none;
`;

const ScrollingList = ({ children }: ScrollingListProps) => {
  return (
    <ScrollingListWrapper>
      <StyledScrollingList>{children}</StyledScrollingList>
    </ScrollingListWrapper>
  );
};

export default ScrollingList;
