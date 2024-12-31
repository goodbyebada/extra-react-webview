import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddNotice from "./pages/AddNotice";
import ShowApplicant from "./pages/ShowApplicant";

import ExtrasHome from "@pages/ExtrasHome";
import ExtraCastingBoard from "@pages/ExtraCastingBoard";
import DateSelectedNoticeList from "@pages/DateSelectedNoticeList";
// import Scheduler from "@pages/Scheduler";
import CompanyHome from "@pages/CompanyHome";
import ExtraShootManagePage from "@pages/ExtraShootManagePage";
import CompanyShootManagePage from "@pages/CompanyShootManagePage";
import { ApplicantDetail } from "@pages/ApplicantDetail";
import DetailPage from "@pages/DetailPage";
import NotFound from "@pages/Error/NotFound";
import DateSelectedNoticeListForCom from "@pages/DateSelectedNoticeListForCom";
import SchedulerPage from "@pages/Scheduler";

import ThemePreviewPage from "@pages/ThemePreview";
import PostOverViewPage from "@pages/PostOverviewPage";
import RecruitmentStatus from "@pages/RecruitmentStatus";
import ManageOverViewPage from "@pages/ManageOverviewPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ExtrasHome />} />
          <Route path="/company-home" element={<CompanyHome />} />

          <Route
            path="/extra-casting-board/:jobPostId"
            element={<ExtraCastingBoard />}
          />

          <Route
            path="/date-selected-notice-list"
            element={<DateSelectedNoticeList />}
          />

          <Route
            path="/date-selected-notice-list-company"
            element={<DateSelectedNoticeListForCom />}
          />

          <Route path="/scheduler" element={<SchedulerPage />} />

          <Route
            path="/extra-shoot-manage"
            element={<ExtraShootManagePage />}
          />

          <Route
            path="/company-shoot-manage"
            element={<CompanyShootManagePage />}
          />

          {/* 업체 측 공고 리스트 페이지 화면*/}
          <Route path="/company/notice/" element={<PostOverViewPage />} />

          {/* 추후 수정 예정, UI 보이기 위해 임시로 id 값 고정 시킴*/}
          <Route
            path="/company/notice/post-status/2"
            element={<RecruitmentStatus />}
          />
          {/* <Route
            path="/company/notice/post-status/:id"
            element={<PostOverviewPage />}
          /> */}

          <Route path="/company/manage" element={<ManageOverViewPage />} />

          <Route path="/applicants" element={<ShowApplicant />} />
          <Route path="/applicants/detail" element={<ApplicantDetail />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route
            path="/detail/:jobPostId/applicants"
            element={<ShowApplicant />}
          />
          <Route path="/add-notice" element={<AddNotice />} />

          <Route path="/*" element={<NotFound />} />

          <Route path="/theme-preview" element={<ThemePreviewPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
