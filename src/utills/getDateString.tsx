/**
 * 날짜를 MM/DD 형식으로 변환하는 함수
 * @param date - Date 객체
 * @returns MM/DD 형식의 문자열
 */
const formatDate = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${month}/${day}`;
};

/**
 * 날짜 배열을 MM/DD - MM/DD 형식으로 변환하는 함수
 * @param dates - 날짜 문자열 배열
 * @returns MM/DD - MM/DD 형식의 문자열
 */
export default function getDateString(dates: string[]): string {
  if (dates.length === 1) {
    return formatDate(new Date(dates[0]));
  } else {
    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[dates.length - 1]);
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  }
}
