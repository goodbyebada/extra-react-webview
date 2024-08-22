/**
 *촬영관리 API 호출시 timestamp의 gatheringTime 응답값  
  time / date 형식으로 반환
 *
 * @param responseGatheringTime
 * @returns gatheringInfo 객체
 */

export default function convertToDateNum(calenderItem: string) {
  const splited = calenderItem.split("-");
  const dateNum = parseInt(splited[2]);
  return dateNum;
}
