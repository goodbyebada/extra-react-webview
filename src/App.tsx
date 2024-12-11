import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManagerDashboard from "./pages/ManagerDashboard";
import AddNotice from "./pages/AddNotice";
import ShowApplicant from "./pages/ShowApplicant";

import ExtrasHome from "@pages/ExtrasHome";
import ExtraCastingBoard from "@pages/ExtraCastingBoard";
import DateSelectedNoticeList from "@pages/DateSelectedNoticeList";
import Scheduler from "@pages/Scheduler";
import CompanyHome from "@pages/CompanyHome";
import ExtraShootManagePage from "@pages/ExtraShootManagePage";
import CompanyShootManagePage from "@pages/CompanyShootManagePage";
import { ApplicantDetail } from "@pages/ApplicantDetail";
import DetailPage from "@pages/DetailPage";
import NotFound from "@pages/Error/NotFound";
import DateSelectedNoticeListForCom from "@pages/DateSelectedNoticeListForCom";

import ThemePreviewPage from "@pages/ThemePreview";

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
