import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { useEffect } from "react";
// import Loading from "@components/Loading";
// import NotFoundPage from "@pages/Error/NotFound";
import { fetchJobPostByCalenderForCom } from "@redux/company/companyJobPostSlice";
import HomeCalendar from "@components/organisms/HomeCalendar";
import { DateDetailedInfo, CalenderTypeFor } from "@/type/dateInteface";
import { setHomeDate } from "@redux/dateSlice";
import { ResponseStatus } from "@type/shared";
import Loading from "@components/Loading";
import NotFoundPage from "@pages/Error/NotFound";

type CalenderProps = {
  type?: CalenderTypeFor;
  showRecommand: boolean;
  clickedDateEvent: () => void;
};

/**
 * @param param0 CalenderProps
 * @returns Company 홈 화면 캘린더 UI
 */

//CHECK
// [ ] 데이터 로직이 분리 되어있는가?
// [ ] 그렇다면 굳이 CompanyCalender 컴포넌트를 만들 필요가 있는가?
// [ ] 어느 폴더에 들어가야하는가? 확장성은 없다.
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

  const dateDetailedInfo: DateDetailedInfo = useSelector(
    (state: RootState) => state.date.selectedByHome,
  );
  const { year, month } = dateDetailedInfo;

  // 데이터 요청
  useEffect(() => {
    dispatch(fetchJobPostByCalenderForCom({ year, month }));
  }, [dispatch, year, month]);

  // 캘린더의 Item을 선택했을때의 onClikcEvent;
  // 눌렀을때 모달 창 나오기 위함
  const dateOnClick = (dateNum: number) => {
    const jobList = gotJobDataList[dateNum];

    if (!jobList || !jobList.length) return;

    if (jobList.length > 0) {
      dispatch(setHomeDate({ dateNum }));
      clickedDateEvent();
    }
  };

  // // TODO ResponseStatus 에 따른 분기처리 모듈화할 것
  const Component = () => {
    switch (gotJob.status) {
      case ResponseStatus.loading:
        return <Loading loading={true} />;

      case ResponseStatus.fullfilled:
        return (
          <HomeCalendar
            dateYearMonth={{ year, month }}
            gotJobDataList={gotJobDataList}
            showRecommand={showRecommand}
            clickedDateEvent={dateOnClick}
          />
        );
      case ResponseStatus.rejected:
        return <NotFoundPage />;
    }
  };

  return <>{Component()}</>;
}
