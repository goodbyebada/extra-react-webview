import React from "react";
import { styled } from "styled-components";

type SchedulerProps = {
  week: number;
  key?: number;
  item: number[];
  selectedDateEvent: (elem: number, key: number) => void;
  CheckGotJob: (elem: number) => React.ReactNode;
};
export default function SchedulerSingleWeek({
  week,
  item,
  selectedDateEvent,
  CheckGotJob,
}: SchedulerProps) {
  return (
    <Week $weekcnt={week} className="week">
      {item.map((elem, key) => {
        if (!elem) {
          return <DateItem key={key}></DateItem>;
        }
        return (
          <DateItem key={key} onClick={() => selectedDateEvent(elem, key)}>
            <DateNumber>{!elem ? "" : elem}</DateNumber>
            {CheckGotJob(elem)}
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
