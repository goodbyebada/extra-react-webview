import DateSelectorBar from "@components/organisms/DateSelectorBar";
import { ReactNode } from "react";
import Container from "@components/atoms/Container";

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
    <Container style={{ height: "fit-content" }}>
      <DateSelectorBar dateSelctedType={dateSelctedType} yearsAhead={30} />
      {children}
    </Container>
  );
}
