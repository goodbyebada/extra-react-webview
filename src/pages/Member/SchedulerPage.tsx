import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@redux/store";
import { AppDispatch } from "@redux/store";
import Loading from "@components/Loading";
import NotFoundPage from "@pages/Error/NotFound";
import { ResponseStatus } from "@/types/shared";
import { getMemberAppliedRoles } from "@redux/memberRoles/memberRolesSlice";
import Scheduler from "@components/organisms/Scheduler";

export default function SchedulerPage() {
  const dispatch = useDispatch<AppDispatch>();

  // 날짜 정보
  const dateYM = useSelector(
    (state: RootState) => state.date.selectedBySchedule,
  );
  const { year, month } = dateYM;

  useEffect(() => {
    dispatch(getMemberAppliedRoles({ year, month }));
  }, [dispatch, year, month]);

  // 데이터
  const appliedList = useSelector((state: RootState) => {
    return state.appliedRoles.getMemberApplies;
  });

  const Component = () => {
    switch (appliedList.status) {
      case ResponseStatus.loading:
        return <Loading loading={true} />;
      case ResponseStatus.fullfilled:
        return <Scheduler dateYM={dateYM} appliedListData={appliedList.data} />;
      case ResponseStatus.rejected:
        return <NotFoundPage />;
      default:
        return null;
    }
  };

  return (
    <>
      <Component />
    </>
  );
}
