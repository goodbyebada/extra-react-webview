import React from "react";
import { styled } from "styled-components";

type SchedulerProps = {
  height: number;
  key?: number;
  item: number[];
  selectedDateEvent: (elem: number, key: number) => void;
  CheckGotJob: (elem: number) => React.ReactNode;
};
export default function SchedulerSingleWeek({
  height,
  item,
  selectedDateEvent,
  CheckGotJob,
}: SchedulerProps) {
  return (
    <Week $weekcnt={height}>
      {item.map((dateNumber, key) => {
        if (!dateNumber) {
          return <DateItem key={key}></DateItem>;
        }

        return (
          <DateItem
            key={key}
            onClick={() => selectedDateEvent(dateNumber, key)}
          >
            <DateNumber>{dateNumber}</DateNumber>
            {CheckGotJob(dateNumber)}
          </DateItem>
        );
      })}
    </Week>
  );
}

const DateItem = styled.div`
  position: relative;
  /* width: var(--__dateWidth); */
  width: var(--__dateWidth);

  box-sizing: border-box;
  border: none;
  border-right: solid 2px #333;
  background-color: transparent;

  font-weight: 900;
  overflow-y: hidden;
  > * {
    box-sizing: border-box;
  }

  &:last-child {
    border-right: 0;
  }
`;

const DateNumber = styled.div`
  padding-left: 0.3em;
  text-align: left;
  color: #fff;
  box-sizing: content-box;
  height: 20px;
`;

const Week = styled.div<{ $weekcnt: number }>`
  display: flex;
  border-top: solid 2px #333;
  height: ${(props) => `calc(100% / ${props.$weekcnt})`};
  box-sizing: border-box;
  width: 100%;

  ${DateNumber} {
    padding-top: ${(props) => (props.$weekcnt > 5 ? "0em" : "0.3em")};
  }
`;
