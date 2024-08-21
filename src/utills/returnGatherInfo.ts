/**
 *촬영관리 API 호출시 timestamp의 gatheringTime 응답값  
  time / date 형식으로 반환
 *
 * @param responseGatheringTime
 * @returns gatheringInfo 객체
 */

export default function returnGatherInfo(responseGatheringTime: string) {
  const splited = responseGatheringTime.split("T");
  const gatheringDate = splited[0].split("-");
  const gatheringTime = splited[1].split(":");

  const timeLastIndex = gatheringTime.length - 1;
  const dateLastIndex = gatheringDate.length - 1;

  const hour = gatheringTime[0];
  const min = gatheringTime[timeLastIndex - 1];

  const year = gatheringDate[0];
  const month = gatheringDate[1];
  const date = gatheringDate[dateLastIndex];

  const gatheringInfo = {
    time: {
      hour: hour,
      min: min,
    },

    date: {
      year: parseInt(year),
      month: parseInt(month, 10),
      dateNum: parseInt(date),
    },
  };

  return gatheringInfo;
}
