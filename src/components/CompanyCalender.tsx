import { styled } from "styled-components";
import useCalendar from "@/customHook/useCalendar";

import { useDispatch, useSelector } from "react-redux";
import { setHomeDate } from "@redux/dateSlice";
import { AppDispatch, RootState } from "@redux/store";

import { CalenderTypeFor } from "@api/interface";
import { useEffect } from "react";

import { ResponseStatus } from "@api/interface";
import Loading from "@components/Loading";
import NotFoundPage from "@pages/Error/NotFound";
import { fetchJobPostByCalenderForCom } from "@redux/company/companyJobPostSlice";

import { DateSelctedType } from "@api/interface";
import Template from "@components/Template";
import HomeCalenderSingleWeek from "@components/Calender/HomeCalenderSingleWeek";
import DayList from "@components/Calender/DayList";
import string2Int from "@utills/string2Int";

type CalenderProps = {
  type?: CalenderTypeFor;
  showRecommand: boolean;
  clickedDateEvent: () => void;
};

/**
 * @param param0 CalenderProps
 * @returns 사용자/ 업체 홈 화면 캘린더 UI
 */

/**
 * status에 따른 분기처리 yet
 */

export default function CompanyCalender({
  showRecommand,
  clickedDateEvent,
}: CalenderProps) {
  const DAYLIST_HEIGHT_PERCENT = 8;
  const dispatch = useDispatch<AppDispatch>();

  // 날짜 정보
  const dateYM = useSelector((state: RootState) => state.date.selectedByHome);
  const { year, month } = string2Int(dateYM);
  const weeklists = useCalendar(year, month);

  const gotJob = useSelector(
    (state: RootState) => state.companyJobpost.jobPostByCalenderForCom,
  );
  const gotJobDataList = gotJob.data;

  useEffect(() => {
    dispatch(fetchJobPostByCalenderForCom({ year, month }));
  }, [dispatch, dateYM]);

  // Only Calender
  const dateOnClick = (dateNum: number) => {
    const stringDate = dateNum.toString();
    const jobLength = gotJobDataList[stringDate].length;

    if (!jobLength) return;

    if (jobLength > 0) {
      const dateNum = stringDate;
      dispatch(setHomeDate(dateNum));
      clickedDateEvent();
    }
  };

  // 인피니트 스크롤링 관련

  const Component = () => {
    switch (gotJob.status) {
      case ResponseStatus.loading:
        return <Loading loading={true} />;

      case ResponseStatus.rejected:
        return <NotFoundPage />;

      case ResponseStatus.fullfilled:
        return (
          <>
            <Template dateSelctedType={DateSelctedType.home}>
              {/* 캘린더 컨테이너의 캘린더(달력) */}
              <Container>
                <DayList
                  HeightPercent={DAYLIST_HEIGHT_PERCENT}
                  dateSelctedType={DateSelctedType.home}
                />

                <DatesWrapper $HeightPercent={DAYLIST_HEIGHT_PERCENT}>
                  {weeklists.map((item, key) => {
                    return (
                      <HomeCalenderSingleWeek
                        key={key}
                        height={weeklists.length}
                        item={item}
                        gotJobDataList={gotJobDataList}
                        dateOnClick={dateOnClick}
                        showRecommand={showRecommand}
                      />
                    );
                  })}
                </DatesWrapper>
              </Container>
            </Template>
          </>
        );

      default:
        return;
    }
  };

  return <>{Component()}</>;
}

const DatesWrapper = styled.div<{ $HeightPercent: number }>`
  height: ${({ $HeightPercent }) => `calc(100% - ${$HeightPercent}%)`};
`;

const Container = styled.div`
  background-color: black;
  width: 372px;
  height: 430px;

  font-size: 16px;
  font-weight: 900;
  line-height: 125%;
  letter-spacing: 0.16px;

  @media all and (max-width: 375px) {
    width: 300px;
    //스타일 설정
  }
`;
