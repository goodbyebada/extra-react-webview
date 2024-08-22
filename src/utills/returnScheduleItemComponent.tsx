import { styled } from "styled-components";
import { MemberRoleFront } from "@api/interface";
import { ScheduleTypeStatusLabel } from "@api/interface";

const ScheduleItem = styled.div`
  /* 스케줄표 border width 만큼 늘림 */
  position: relative;
  display: block;
  z-index: 2;
  height: var(--__scheduledItemHeigth);
  width: 100%;
  padding-left: 5px;
  background: #4f4f4f;
  text-overflow: ellipsis;
  color: #a7a7a7;
  font-size: 10px;
  font-style: normal;
  font-weight: 900;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;

  &.approve {
    background: #49e300;
    color: #fff;
  }
`;

const StartScheduleItem = styled(ScheduleItem)`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-right: 2px;
  border-color: #4f4f4f;
  border-color: red;
`;

const EndScheduleItem = styled(ScheduleItem)`
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const SingleScheduleItem = styled(ScheduleItem)`
  border-radius: 20px;
`;

/**
 *
 * 미완성 임시 구현
 *
 * @param date 일
 * @param title 드라마 제목
 * @returns 스케줄 표시 item
 */

// Gathering
// 왜 gatheringTime?
// CALENDER 항목 없음

const returnSchduleItemComponent = (
  scheduleType: number,
  elem: MemberRoleFront,
) => {
  // date 날짜
  //  idx를 기억하거나
  // 순회 안하고 싶은데

  const { status, title } = elem;
  let approve;

  if (status === ScheduleTypeStatusLabel.APPROVED) {
    approve = true;
  } else {
    approve = false;
  }

  const titleString = title.replace(/\s+/g, "");

  // switch 문 사용
  switch (scheduleType) {
    // single일때
    case 0:
      return (
        <SingleScheduleItem className={`${approve ? "approve" : ""} `}>
          {titleString}
        </SingleScheduleItem>
      );
    case 1:
      return (
        <StartScheduleItem className={`${approve ? "approve" : ""} `}>
          {titleString}
        </StartScheduleItem>
      );
    case 2:
      return <EndScheduleItem className={`${approve ? "approve" : ""} `} />;
    case 3:
      return <ScheduleItem className={`${approve ? "approve" : ""} `} />;
  }
};

export default returnSchduleItemComponent;
