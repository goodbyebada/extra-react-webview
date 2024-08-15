export default function getDayList(year: number, month: number) {
  const DEFAULT_TRASH_VALUE = 0;
  const DAY_OF_WEEK = 7;

  // 이번달의 첫 날의 날짜 정보
  const first = new Date(year, month, 1);
  // 이번달의 마지막 날짜 정보
  const last = new Date(year, month + 1, 0);

  const prevDayList = Array.from(
    { length: Math.max(0, first.getDay()) },
    () => DEFAULT_TRASH_VALUE,
  );

  const currentDayList = Array.from(
    { length: last.getDate() },
    (_, i) => i + 1,
  );

  const nextDayList = Array.from(
    {
      length: DAY_OF_WEEK - (last.getDay() + 1),
    },
    () => DEFAULT_TRASH_VALUE,
  );

  // 한 month의 날짜들의 리스트 00 1~31
  const calenderDateLists = prevDayList.concat(currentDayList, nextDayList);

  return calenderDateLists;
}
