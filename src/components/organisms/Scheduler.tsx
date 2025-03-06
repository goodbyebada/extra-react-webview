import { styled } from "styled-components";
import { useEffect, useState } from "react";
import useCalendar from "@customHook/useCalendar";
import returnSchduleItemComponent from "@utills/returnScheduleItemComponent";
import SchedulerSingleWeek from "@components/mocules/calender/SchedulerSingleWeek";
import CalenderWrapper from "@components/CalenderWrapper";
import { MemberRoleFront, ScheduleType } from "@type/shared";
import Ellipsis from "@components/custom/Ellipsis";
import { DateDetailedInfo, DateSelctedType } from "@type/dateInteface";
import { SchedulerWeekdayLabels } from "@components/mocules/WeekdayLabels";
import ScheduleModal from "@components/Modal/ScheduleModal";

interface SchedulerPageProps {
  dateYM: DateDetailedInfo;
  appliedListData: MemberRoleFront[];
}

export default function Scheduler({
  dateYM,
  appliedListData,
}: SchedulerPageProps) {
  const DAYLIST_HEIGHT_PERCENT = 8;

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  // const [weeklists, setWeeklists] = useState<number[][]>([]);
  const [scheduledJobsByDate, setScheduledJobsByDate] = useState<
    MemberRoleFront[][]
  >([]);
  const [selectedDateInfo, setSelectedDateInfo] =
    useState<DateDetailedInfo>(dateYM);

  const weekList = useCalendar(dateYM.year, dateYM.month);

  useEffect(() => {
    const filtered = weekList.flat().filter((dateNum) => dateNum !== 0);
    const newWeeklist = new Array(filtered.length).fill(0);

    for (let i = 0; i < filtered.length; i++) {
      const dateNum = i + 1;
      const ShootJobList = appliedListData.filter(
        (elem) =>
          elem.calender.startDateNum === dateNum ||
          elem.calender.endDateNum === dateNum,
      );

      newWeeklist[dateNum] = ShootJobList;
    }

    setScheduledJobsByDate(newWeeklist);
  }, [weekList, appliedListData]);

  // NOTE dispatch시 openModal 안되는 버그 있음
  const selectedDateEvent = (elem: number) => {
    openModal();
    // console.log("selectedDateEvent called");
    // dispatch(setScheduleDate({ ...dateYM, dateNum: elem }));

    setSelectedDateInfo({ ...dateYM, dateNum: elem });
  };

  // FullCalender -> 일반 캘린더 UI 수정
  const CheckGotJob = (dateNum: number) => {
    const ComponentList = [];

    const ShootJobList = appliedListData.filter(
      (elem) =>
        elem.calender.startDateNum === dateNum ||
        elem.calender.endDateNum === dateNum,
    );

    // 들어갈 수 있는 컴포넌트 수 2로 고정 추후 리팩토링
    for (let i = 0; i < ShootJobList.length; i++) {
      if (i == 2) {
        ComponentList.push(<Ellipsis />);
        break;
      }
      ComponentList.push(
        returnSchduleItemComponent(ScheduleType.SINGLE, ShootJobList[i]),
      );
    }

    return (
      <>
        {ComponentList.map((elem, idx) => {
          return <div key={idx}>{elem}</div>;
        })}
      </>
    );
  };

  return (
    <CalenderWrapper dateSelctedType={DateSelctedType.scheduler}>
      <Container $daylistHeight={DAYLIST_HEIGHT_PERCENT}>
        <Wrapper>
          <SchedulerWeekdayLabels HeightPercent={DAYLIST_HEIGHT_PERCENT} />
          <DatesWrapper>
            {weekList.map((item, key) => {
              return (
                <SchedulerSingleWeek
                  height={weekList.length}
                  key={key}
                  item={item}
                  CheckGotJob={CheckGotJob}
                  selectedDateEvent={selectedDateEvent}
                />
              );
            })}
          </DatesWrapper>
        </Wrapper>
      </Container>

      <ScheduleModal
        isVisible={modalOpen}
        selectedDateInfo={selectedDateInfo}
        closeModal={closeModal}
        scheduledJobsByDate={scheduledJobsByDate}
      />
    </CalenderWrapper>
  );
}

const DatesWrapper = styled.div``;

const Container = styled.div<{ $daylistHeight: number }>`
  width: 372px;
  height: 412px;
  border: 3px solid transparent;
  background-image: linear-gradient(#5d4900, #333333);
  background-origin: border-box;
  border-radius: 20px;

  font-size: 16px;
  font-weight: 900;
  line-height: 125%;
  letter-spacing: 0.16px;

  ${DatesWrapper} {
    height: ${(props) => `${100 - props.$daylistHeight}%`};
  }
`;

const Wrapper = styled.div`
  background-color: black;
  height: 100%;
  border-radius: 20px;
`;
