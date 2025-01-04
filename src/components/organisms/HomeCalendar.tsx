import { styled } from "styled-components";
import useCalendar from "@/customHook/useCalendar";
import { useEffect, useState } from "react";
import { CalendarWeekdayLabels } from "@components/mocules/WeekdayLabels";
import HomeCalendarWeek from "@components/organisms/HomeCalendarWeek";
import CalenderWrapper from "@components/CalenderWrapper";
import { CALENDER_SIZE } from "@/styled/size";
import { DateYearMonth, DateSelctedType, ObjectType } from "@api/dateInteface";

type CalenderProps = {
  dateYearMonth: DateYearMonth;
  showRecommand: boolean;
  clickedDateEvent: (dateNum: number, key: number) => void;
  gotJobDataList: ObjectType;
};

/**
 *
 * @param param0 CalenderProps
 * @returns 사용자/ 업체 홈에서 쓰이는  dateSelector을 포함한 화면 캘린더 UI
 *
 * - UI로서의 역할
 * - 나머지 데이터는 부모 컴포넌트로부터 넘겨받는다.
 */

export default function HomeCalendar({
  dateYearMonth,
  showRecommand,
  clickedDateEvent,
  gotJobDataList,
}: CalenderProps) {
  const [weekLists, setWeekList] = useState<number[][]>([[]]);
  const { daylistHeigtPersent } = CALENDER_SIZE;

  //year,month에 따른 weekLists
  const { year, month } = dateYearMonth;
  useEffect(() => {
    setWeekList(useCalendar(year, month));
  }, [year, month]);

  return (
    <CalenderWrapper dateSelctedType={DateSelctedType.home}>
      <Container>
        <CalendarWeekdayLabels HeightPercent={daylistHeigtPersent} />
        <DatesWrapper $HeightPercent={daylistHeigtPersent}>
          {weekLists.map((item, key) => {
            return (
              <HomeCalendarWeek
                key={key}
                height={weekLists.length}
                item={item}
                gotJobDataList={gotJobDataList}
                dateOnClick={clickedDateEvent}
                showRecommand={showRecommand}
              />
            );
          })}
        </DatesWrapper>
      </Container>
    </CalenderWrapper>
  );
}

const DatesWrapper = styled.div<{ $HeightPercent: number }>`
  height: ${({ $HeightPercent }) => `calc(100% - ${$HeightPercent}%)`};
`;

// TODO 어디에 분리해야하는가?
const Container = styled.div`
  background-color: black;
  width: 372px;
  height: 430px;

  font-size: 16px;
  font-weight: 900;
  line-height: 125%;
  letter-spacing: 0.16px;
`;
