import { styled } from "styled-components";
import React from "react";
import { DateSelctedType } from "@api/interface";
/**
 * 요일을 나타내는 컴포넌트 UI
 *
 * @param param0 DayList의 높이 -> 부모의  %
 * @returns
 */

const DayList = React.memo(
  ({
    HeightPercent,
    dateSelctedType,
  }: {
    HeightPercent: number;
    dateSelctedType: string;
  }) => {
    const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];
    return (
      <>
        <Wrapper className="day-list" $daylistHeight={HeightPercent}>
          {DAY_LIST.map((elem, key) => {
            return (
              <Item
                className={`day-item ${dateSelctedType === DateSelctedType.scheduler ? "scheduler" : ""}`}
                key={key}
              >
                {elem}
              </Item>
            );
          })}
        </Wrapper>
      </>
    );
  },
);

const Item = styled.span`
  width: calc(100% / 7);
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  &.scheduler {
    border-right: solid 2px #333;
    width: calc(100% / 7);
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:first-child {
    color: #ff0000;
  }
  &:last-child {
    border-right: 0;
    color: #0038ff;
  }
`;

const Wrapper = styled.div<{ $daylistHeight: number }>`
  display: flex;
  height: ${(props) => `${props.$daylistHeight}%`};
  width: 100%;
`;

// React.memo를 사용하여 내보내기
export default React.memo(DayList);
