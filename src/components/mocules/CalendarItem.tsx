import React from "react";
import styled from "styled-components";
import Text from "@components/atoms/Text";
import { CalendarItemWrapper } from "@components/atoms/Wrapper";

interface CalendarItemProps {
  children: React.ReactNode;
  count?: number;
  highlight?: boolean;
  onClick?: () => void;
  fontSize?: number;
}

const StyledCalendarItem = styled.div`
  margin: 0;
  padding: 0;
  position: relative;
  display: inline-block;
`;

const CounterWrapper = styled.div`
  width: 24px;
  height: 24px;
  background: #f00;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  position: absolute;
  top: -5px;
  right: -5px;
`;

/**
 * Recruitment Calendar Item
 * count: 공고 갯수
 * highlight: 추천 공고 여부
 * @param count number (the number of recruitment)
 * @param highlight boolean (specify when posting a recommendation)
 * @param onClick () => void (onClick method)
 * @param fontSize number (font size)
 * @returns
 */
const CalendarItem = ({
  children,
  count = 0,
  highlight = false,
  onClick = () => {},
  fontSize = 16,
}: CalendarItemProps) => {
  return (
    <StyledCalendarItem onClick={onClick}>
      {count > 0 && (
        <CounterWrapper>
          <Text size={fontSize} weight={900}>
            {count}
          </Text>
        </CounterWrapper>
      )}
      <CalendarItemWrapper highlight={highlight} isActive={count > 0}>
        <Text size={24} weight={900} color={count > 0 ? "#fff" : "#3d3d3d"}>
          {children}
        </Text>
      </CalendarItemWrapper>
    </StyledCalendarItem>
  );
};

export default CalendarItem;
