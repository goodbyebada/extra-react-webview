import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { fetchJobPostByIdForCom } from "@redux/company/companyJobPostSlice";
import { useEffect } from "react";
import { ResponseStatus } from "@type/shared";
import Loading from "@components/Loading";
import NotFoundPage from "@pages/Error/NotFound";
import RecruitmentStatus from "@components/organisms/RecruitmentStatus";
import MainWindow from "@components/mocules/MainWindow";

export default function RecruitmentStatusPage() {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const selectedJobPost = useSelector(
    (state: RootState) => state.companyJobpost.jobPostItem,
  );

  useEffect(() => {
    dispatch(fetchJobPostByIdForCom(Number(id)));
  }, [dispatch, id]);

  const Component = () => {
    switch (selectedJobPost.status) {
      case ResponseStatus.loading:
        return <Loading loading={true} />;
      case ResponseStatus.fullfilled: {
        const selectedJobPostItem = selectedJobPost.data;
        return <RecruitmentStatus selectedJobPostItem={selectedJobPostItem} />;
      }
      case ResponseStatus.rejected:
        return <NotFoundPage />;
    }
  };

  return <MainWindow headerShown={false}>{Component()}</MainWindow>;
}
