import { useState } from "react";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";
import Item from "./Item";

interface SwipeableItemProps {
  title: string;
  category: string;
  date: string[];
  dDay: string;
  company: string;
  time: string;
  location: string;
  status?: "applied" | "rejected" | "approved";
  statusText?: string;
  onClick: () => void;
  onDelete: () => void;
}

/**
 * Swipeable List Item
 * @param title string (title)
 * @param category string (category)
 * @param date string[] (date: 배열로 변경)
 * @param dDay string (dDate: deadline Date)
 * @param company string (company name)
 * @param time string (time: 01:00)
 * @param location string (location)
 * @param status "applied" | "rejected" | "approved" (status)
 * @param statusText string (status text)
 */

const SwipeableItem = ({
  title,
  category,
  date,
  dDay,
  company,
  time,
  location,
  status = "applied",
  statusText = "승인대기",
  onClick,
  onDelete,
}: SwipeableItemProps) => {
  const [translateX, setTranslateX] = useState(0);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (status !== "approved") setTranslateX(-100);
    },
    onSwipedRight: () => {
      if (status !== "approved") setTranslateX(0);
    },
    delta: 50,
  });

  const deleteButtonText = status === "applied" ? "지원\n취소하기" : "삭제하기";

  return (
    <SwipeableContainer {...(status !== "approved" && swipeHandlers)}>
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
