// Calender, date 관련

export interface YearMonthAsNumber {
  year: number;
  month: number;
}

export interface DateFieldsAsNumber extends YearMonthAsNumber {
  dateNum: number;
}

export interface DateYearMonth {
  year: number;
  month: number;
}

export interface QuryTypesWithPage extends DateYearMonth {
  pageNum: number;
}

export type ObjectType = {
  [key: string]: number[];
};
export enum CalenderTypeFor {
  "user" = 0,
  "company" = 1,
}

export const DateSelctedType = {
  home: "HOME",
  scheduler: "SCHEDULER",
};

export interface DateDetailedInfo {
  year: number;
  month: number;
  dateNum: number;
  weekDayLabel: string;
}
