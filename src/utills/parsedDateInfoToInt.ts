//TODO naming 정확하지 않음
//TODO dateNum을 따로 받는애랑 분리하자.

import { YearMonthAsNumber, DateFieldsAsNumber } from "@api/dateInteface";

export function converStringToInt(elem: string) {
  return Number(elem);
}

export default function convertYearMonthStringToInt(
  yearStr: string,
  monthStr: string,
  dateNumStr = null,
): YearMonthAsNumber | DateFieldsAsNumber {
  if (!dateNumStr) {
    return {
      year: parseInt(yearStr),
      month: parseInt(monthStr),
    };
  }

  return {
    year: parseInt(yearStr),
    month: parseInt(monthStr),
    dateNum: parseInt(dateNumStr),
  };
}

// export default function convertYearMonthStringToInt(
//   yearStr: string,
//   monthStr: string,
//   dateNumStr = null,
// ): YearMonthAsNumber | DateFieldsAsNumber {
//   if (!dateNumStr) {
//     return {
//       year: parseInt(yearStr),
//       month: parseInt(monthStr),
//     };
//   }

//   return {
//     year: parseInt(yearStr),
//     month: parseInt(monthStr),
//     dateNum: parseInt(dateNumStr),
//   };
// }
