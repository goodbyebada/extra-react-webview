export const ReturnDateOfShooting = (calenderList: string[]) => {
  if (calenderList.length === 1) {
    const [_, startMonth, startDateNum] = calenderList[0].split("-");
    return `${startMonth}/${startDateNum}`;
  }

  if (calenderList.length > 1) {
    const [_, startMonth, startDateNum] = calenderList[0].split("-");
    const [endYear, endMonth, endDateNum] = calenderList[1].split("-");

    const date = {
      startDate: `${startMonth}/${startDateNum}`,
      endDate: `${endMonth}/${endDateNum}`,
    };

    const dateOfShottingString = `${date.startDate}-${date.endDate}`;

    return dateOfShottingString;
  }
};
