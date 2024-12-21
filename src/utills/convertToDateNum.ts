/**
 * year month dateNum 을 하나의 숫자로 return
 * ex ) 2024-09-02 => 20240902
 */

export default function converToDateObject(calenderItem: string): number {
  const dateNumber = calenderItem.split("-").join("");

  return +dateNumber;
}
