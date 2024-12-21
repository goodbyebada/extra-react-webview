import MonthList from "@utills/MonthList";

/**
 *
 * @param year
 * @param month
 * @returns 2차원 배열 weeklists
 * 1차원 배열은 주, 2차원 배열은 각 주의 date list
 */
export default function useCalendar(year: number, month: number) {
  const DAY_OF_WEEK = 7;

  const calenderDateLists = MonthList(year, month);

  const weeklists = calenderDateLists.reduce((acc: number[][], cur, idx) => {
    const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(cur);
    return acc;
  }, []);

  return weeklists;
}
