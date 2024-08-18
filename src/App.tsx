import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManagerDashboard from "./pages/ManagerDashboard";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import AddNotice from "./pages/AddNotice";
import ShowApplicant from "./pages/ShowApplicant";

import ExtrasHome from "@pages/ExtrasHome";
import ExtraCastingBoard from "@pages/ExtraCastingBoard";
import DateSelectedNoticeList from "@pages/DateSelectedNoticeList";
import Scheduler from "@pages/Scheduler";
import CompanyHome from "@pages/CompanyHome";
import ExtraShootManagePage from "@pages/ExtraShootManagePage";
import CompanyShootManagePage from "@pages/CompanyShootManagePage";
import CompanyDateSelectedPage from "@pages/CompanyDateSelectedPage";
import { ApplicantDetail } from "@pages/ApplicantDetail";
import DetailPage from "@pages/DetailPage";
import NotFound from "@pages/Error/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ExtrasHome />} />
          <Route path="/company-home" element={<CompanyHome />} />

          {/* 임시, 추후 주디님 관리자 화면으로 연결할 route */}
          <Route
            path="/company-home/company-job-list/:jobPostId"
            element={<CompanyDetailPage />}
          />
          <Route
            path="/extra-casting-board/:jobPostId"
            element={<ExtraCastingBoard />}
          />

          <Route
            path="/date-selected-notice-list"
            element={<DateSelectedNoticeList />}
          />

          <Route
            path="/company-date-selected-notice-list"
            element={<CompanyDateSelectedPage />}
          />

          <Route path="/scheduler" element={<Scheduler />} />

          <Route
            path="/extra-shoot-manage"
            element={<ExtraShootManagePage />}
          />

          <Route
            path="/company-shoot-manage"
            element={<CompanyShootManagePage />}
          />

          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/applicants" element={<ShowApplicant />} />
          <Route path="/applicants/detail" element={<ApplicantDetail />} />
          <Route path="/detail/:title" element={<DetailPage />} />
          <Route path="/detail/:title/applicants" element={<ShowApplicant />} />
          <Route path="/add-notice" element={<AddNotice />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
