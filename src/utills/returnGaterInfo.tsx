/**
 * @param responseGatheringTime
 * @returns string -> 시간 관련한
 */

export default function gatheringTimeString(responseGatheringTime: string) {
  const splited = responseGatheringTime.split("T");

  if (!splited[1].includes(":")) {
    // "공지예정"과 같은 string일시
    const gatheringTime = splited[1];
    return gatheringTime;
  }
  const [hour, min] = splited[1].split(":");
  const gatheringTime = `${hour}/${min}`;

  return gatheringTime;
}
