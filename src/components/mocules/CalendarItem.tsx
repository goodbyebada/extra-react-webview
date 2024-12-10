import React from "react";
import styled from "styled-components";
import Text from "@components/atoms/Text";
import { CalendarItemWrapper } from "@components/atoms/Wrapper";

interface CalendarItemProps {
  children: React.ReactNode;
  count?: number;
  highlight?: boolean;
  onClick?: () => void;
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

const CalendarItem: React.FC<CalendarItemProps> = ({
  children,
  count = 0,
  highlight = false,
  onClick = () => {},
}) => {
  return (
    <StyledCalendarItem onClick={onClick}>
      {count > 0 && (
        <CounterWrapper>
          <Text size={16} weight={900}>
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
