/**
 * @param year
 * @param month
 * @returns 해당 year과 month의 dates list
 *
 * 모든 배열의 길이는 7로 이루어진다.
 * 저번달과,다음달의 정보는 0을 넣어 반환한다.
 */

export default function MonthList(year: number, month: number) {
  const DEFAULT_TRASH_VALUE = 0;
  const DAY_OF_WEEK = 7;

  // 이번달의 첫 날의 날짜 정보
  const firstDayOfMonth = new Date(year, month, 1);
  // 이번달의 마지막 날짜 정보
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const lastWeekDatesOfPreviousMonth = Array.from(
    { length: Math.max(0, firstDayOfMonth.getDay()) },
    () => DEFAULT_TRASH_VALUE,
  );

  const allDatesOfNowMonth = Array.from(
    { length: lastDayOfMonth.getDate() },
    (_, i) => i + 1,
  );

  const firstWeekDatesOfNextMonth = Array.from(
    {
      length: DAY_OF_WEEK - (lastDayOfMonth.getDay() + 1),
    },
    () => DEFAULT_TRASH_VALUE,
  );

  // 한 month의 날짜들의 리스트 00 1~31
  const monthList = [
    ...lastWeekDatesOfPreviousMonth,
    ...allDatesOfNowMonth,
    ...firstWeekDatesOfNextMonth,
  ];

  return monthList;
}
