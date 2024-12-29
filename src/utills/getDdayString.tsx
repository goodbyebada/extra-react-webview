/**
 * Dday를 계산하는 함수
 * @param DDay
 * @returns string -> D-Day 문자열 반환
 */
export default function getDdayString(dDate: string) {
  const today = new Date();
  const targetDate = new Date(dDate);

  // 시간을 00:00:00으로 설정
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  // 날짜 차이 계산 (밀리초 단위로 계산 후 일 단위로 변환)
  const differenceInTime = targetDate.getTime() - today.getTime();
  const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

  if (differenceInDays === 0) {
    return "D-day";
  } else if (differenceInDays > 0) {
    return `D-${Math.ceil(differenceInDays)}`;
  } else {
    return "종료";
  }
}
