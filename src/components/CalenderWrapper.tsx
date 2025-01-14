import DateSelectorBar from "@components/organisms/DateSelectorBar";
import { ReactNode } from "react";
import { CenteredLayoutComponent } from "@components/atoms/Layout";

/* 년도 월일 선택 바
 * {childeren}
 */
export default function CalenderWrapper({
  dateSelctedType,
  children,
}: {
  dateSelctedType: string;
  children: ReactNode;
}) {
  return (
    <CenteredLayoutComponent>
      <DateSelectorBar dateSelctedType={dateSelctedType} yearsAhead={30} />
      {children}
    </CenteredLayoutComponent>
  );
}
