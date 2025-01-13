import { useState } from "react";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";
import Item from "./Item";

const Status = {
  APPLIED: "applied",
  REJECTED: "rejected",
  APPROVED: "approved",
} as const;

type StatusType = (typeof Status)[keyof typeof Status];

interface SwipeableItemProps {
  title: string;
  category: string;
  date: string[];
  dDay: string;
  company: string;
  time: string;
  location: string;
  status?: StatusType;
  statusText?: string;
  onClick: () => void;
  onDelete: () => void;
}

const SwipeableItem = ({
  title,
  category,
  date,
  dDay,
  company,
  time,
  location,
  status = Status.APPLIED,
  statusText = "승인대기",
  onClick,
  onDelete,
}: SwipeableItemProps) => {
  const [translateX, setTranslateX] = useState(0);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (status !== Status.APPROVED) setTranslateX(-100);
    },
    onSwipedRight: () => {
      if (status !== Status.APPROVED) setTranslateX(0);
    },
    delta: 50,
  });

  const deleteButtonText =
    status === Status.APPLIED ? "지원\n취소하기" : "삭제하기";

  return (
    <SwipeableContainer {...(status !== Status.APPROVED && swipeHandlers)}>
      <DeleteButton onClick={onDelete}>{deleteButtonText}</DeleteButton>
      <SwipeableContent translateX={translateX}>
        <Item
          title={title}
          category={category}
          date={date}
          dDay={dDay}
          company={company}
          time={time}
          location={location}
          status={status}
          statusText={statusText}
          onClick={onClick}
        />
      </SwipeableContent>
    </SwipeableContainer>
  );
};

export default SwipeableItem;

const SwipeableContainer = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  width: 365px;
  height: 145px;
  will-change: transform;
  border-radius: 20px;
`;

const SwipeableContent = styled.div<{ translateX: number }>`
  transform: ${({ translateX }) => `translateX(${translateX}px)`};
  transition: transform 0.3s ease-out;
  width: 100%;
  z-index: 1;
  position: relative;
`;

const DeleteButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 150px;
  padding-right: 15px;
  background-color: #ff3b30;
  border: 2px solid #ad0000;
  display: flex;
  justify-content: right;
  align-items: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
  z-index: 0;
  white-space: pre-line;
  text-align: center;
  border-radius: 20px;
`;
