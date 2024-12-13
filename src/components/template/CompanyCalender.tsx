import { useDispatch, useSelector } from "react-redux";
import { setHomeDate } from "@redux/dateSlice";
import { AppDispatch, RootState } from "@redux/store";

import { useEffect } from "react";

import { ResponseStatus } from "@api/interface";
import Loading from "@components/Loading";
import NotFoundPage from "@pages/Error/NotFound";
import { fetchJobPostByCalenderForCom } from "@redux/company/companyJobPostSlice";
import convertYearMonthStringToInt from "@utills/parsedDateInfoToInt";
import HomeCalendar from "@components/organisms/HomeCalendar";
import {
  YearMonthAsNumber,
  DateDetailedInfoByString,
  CalenderTypeFor,
} from "@api/dateInteface";

type CalenderProps = {
  type?: CalenderTypeFor;
  showRecommand: boolean;
  clickedDateEvent: () => void;
};

/**
 * @param param0 CalenderProps
 * @returns Company 홈 화면 캘린더 UI
 */

export default function CompanyCalender({
  showRecommand,
  clickedDateEvent,
}: CalenderProps) {
  const dispatch = useDispatch<AppDispatch>();

  // 데이터
  const gotJob = useSelector(
    (state: RootState) => state.companyJobpost.jobPostByCalenderForCom,
  );

  const gotJobDataList = gotJob.data;

  // 캘린더의 Item을 선택했을때의 onClikcEvent;
  // 눌렀을때 모달 창 나오기 위함
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

  // TODO ResponseStatus 에 따른 분기처리 모듈화할 것
  const Component = () => {
    switch (gotJob.status) {
      case ResponseStatus.loading:
        return <Loading loading={true} />;

      case ResponseStatus.rejected:
        return <NotFoundPage />;

      case ResponseStatus.fullfilled:
        console.log(gotJob.status);
        return (
          // <div>removeCalender</div>
          <HomeCalendar
            type={CalenderTypeFor.company}
            showRecommand={showRecommand}
            clickedDateEvent={dateOnClick}
            gotJobDataList={gotJobDataList}
          />
        );

      default:
        return;
    }
  };

  return <>{Component()}</>;
}
