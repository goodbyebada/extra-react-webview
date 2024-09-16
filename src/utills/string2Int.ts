export default function string2Int({
  year,
  month,
  dateNum,
}: {
  year: string;
  month: string;
  dateNum?: string;
}) {
  if (!dateNum) {
    return {
      year: parseInt(year),
      month: parseInt(month),
    };
  }

  return {
    year: parseInt(year),
    month: parseInt(month),
    dateNum: parseInt(dateNum),
  };
}
