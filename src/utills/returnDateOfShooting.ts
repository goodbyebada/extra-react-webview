export const ReturnDateOfShooting = (calenderList: string[]) => {
  if (calenderList.length === 1) {
    const startMonth = calenderList[0].split("-")[1];
    const startDateNum = calenderList[0].split("-")[2];
    return `${startMonth}/${startDateNum}`;
  }

  if (calenderList.length > 1) {
    const startMonth = calenderList[0].split("-")[1];
    const startDateNum = calenderList[0].split("-")[2];
    const endMonth = calenderList[1].split("-")[1];
    const endDateNum = calenderList[1].split("-")[2];

    const date = {
      startDate: `${startMonth}/${startDateNum}`,
      endDate: `${endMonth}/${endDateNum}`,
    };

    const dateOfShottingString = `${date.startDate}-${date.endDate}`;

    return dateOfShottingString;
  }
};
