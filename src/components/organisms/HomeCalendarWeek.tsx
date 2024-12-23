/**
 *
 * @returns 한 주에 대한 UI return
 */
import { ObjectType } from "@api/dateInteface";
import CalendarItem from "@components/mocules/calender/CalendarItem";
import { styled } from "styled-components";

export default function HomeCalendarWeek({
  height,
  item,
  gotJobDataList,
  dateOnClick,
  showRecommand,
}: {
  height: number;
  item: number[];
  gotJobDataList: ObjectType;
  dateOnClick: (dateNum: number, key: number) => void;
  showRecommand: boolean;
}) {
  return (
    <Week $weekcnt={height}>
      {item.map((dateNumber, key) => {
        if (dateNumber > 0) {
          return (
            <CalendarItem
              key={key}
              onClick={() => {
                dateOnClick(dateNumber, key);
              }}
              highlight={showRecommand}
              count={gotJobDataList[dateNumber]?.length}
            >
              {dateNumber}
            </CalendarItem>
          );
        }

        return (
          <HideWrapper key={key}>
            <CalendarItem
              onClick={() => dateOnClick(dateNumber, key)}
              highlight={showRecommand}
              count={gotJobDataList[dateNumber]?.length}
            >
              {dateNumber}
            </CalendarItem>
          </HideWrapper>
        );
      })}
    </Week>
  );
}

const HideWrapper = styled.div`
  visibility: hidden;
`;

const Week = styled.div<{ $weekcnt: number }>`
  display: flex;
  height: ${(props) => `calc(100% / ${props.$weekcnt})`};
  box-sizing: border-box;
  width: 100%;
  color: white;
  justify-content: space-around;
`;
