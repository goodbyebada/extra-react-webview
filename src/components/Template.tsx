import { styled } from "styled-components";
import DateSelectorBar from "@components/calender/DateSelectorBar";
import { ReactNode } from "react";

{
  /* 년도 월일 선택 바 */
}
export default function Template({
  dateSelctedType,
  children,
}: {
  dateSelctedType: string;
  children: ReactNode;
}) {
  return (
    <>
      <CalenderContainer>
        <TopWrapper>
          <DateSelectorBar dateSelctedType={dateSelctedType} />
        </TopWrapper>
        {children}
      </CalenderContainer>
    </>
  );
}

const CalenderContainer = styled.div`
  width: 100%;
  max-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  /* 드래그 방지  */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const TopWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;

  font-style: normal;
  font-weight: 900;
  color: #fff;
  line-height: 142.857%;
`;
