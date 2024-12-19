import { styled } from "styled-components";
import { FONT_COLORS } from "@/styled/colors";

export { CalendarWeekdayLabels, SchedulerWeekdayLabels };
/**
 * 요일을 나타내는 컴포넌트 UI
 *
 * @param param0 DayList의 높이 -> 부모의  %
 * @returns
 */

export const WEEK_DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

const { calender_label } = FONT_COLORS;

function CalendarWeekdayLabels({ HeightPercent }: { HeightPercent: number }) {
  return (
    <Wrapper $daylistHeight={HeightPercent}>
      {WEEK_DAY_LABELS.map((elem, key) => {
        return <WeekDayLabelItem key={key}>{elem}</WeekDayLabelItem>;
      })}
    </Wrapper>
  );
}

function SchedulerWeekdayLabels({ HeightPercent }: { HeightPercent: number }) {
  return (
    <Wrapper $daylistHeight={HeightPercent}>
      {WEEK_DAY_LABELS.map((elem, key) => {
        return <SchedulerWeekDayLabel key={key}>{elem}</SchedulerWeekDayLabel>;
      })}
    </Wrapper>
  );
}

const WeekDayLabelItem = styled.span`
  width: calc(100% / 7);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-child {
    color: ${calender_label.sunday};
  }
  &:last-child {
    border-right: 0;
    color: ${calender_label.saturday};
  }
`;

const SchedulerWeekDayLabel = styled(WeekDayLabelItem)`
  border-right: solid 2px #333;
  width: calc(100% / 7);
  box-sizing: border-box;
`;

const Wrapper = styled.div<{ $daylistHeight: number }>`
  display: flex;
  height: ${(props) => `${props.$daylistHeight}%`};
  width: 100%;
`;
