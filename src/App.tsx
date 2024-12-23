import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManagerDashboard from "./pages/ManagerDashboard";
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
import LoginPage from "@pages/Sign/LoginPage";
// import MainPage from "@pages/Sign/MainPage";
import MainFormPage from "@pages/Sign/MainFormPage";
import AuthenticationPage from "@pages/Sign/AuthenticationPage";
import SelectUserTypePage from "@pages/Sign/SelectUserTypePage";
import MemberInfoFormPage from "@pages/Sign/MemberInfoFormPage";
import AccountFormPage from "@pages/Sign/AccountFormPage";
import TattooFormPage from "@pages/Sign/TattooFormPage";
import TattooSelectFormPage from "@pages/Sign/TattooSelectFormPage";
import CompanyInfoFormPage from "@pages/Sign/CompanyInfoFormPage";
import CompanyShootManageDetailPage from "@pages/Manage/CompanyShootManageDetailPage";
import ActorListPage from "@pages/Manage/ActorListPage";

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

          {/* sign process */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main-form" element={<MainFormPage />} />
          <Route path="/auth" element={<AuthenticationPage />} />
          <Route path="/user-type" element={<SelectUserTypePage />} />
          <Route path="/member-info-form" element={<MemberInfoFormPage />} />
          <Route path="/tattoo-form" element={<TattooFormPage />} />
          <Route
            path="/tattoo-select-form"
            element={<TattooSelectFormPage />}
          />
          <Route path="/company-info-form" element={<CompanyInfoFormPage />} />
          <Route path="/account-form" element={<AccountFormPage />} />

          {/* management */}
          <Route
            path="/company-shoot-manage-detail"
            element={<CompanyShootManageDetailPage />}
          />
          <Route path="/actor-list" element={<ActorListPage />} />

          {/* for testing theme */}
          <Route path="/theme-preview" element={<ThemePreviewPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
