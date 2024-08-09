import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManagerDashboard from "./pages/ManagerDashboard";
import DetailPage from "./pages/DetailPage";
import AddNotice from "./pages/AddNotice";
import ShowApplicant from "./pages/ShowApplicant";

import ExtrasHome from "@pages/ExtrasHome";
import ExtraCastingBoard from "@pages/ExtraCastingBoard";
import DateSelectedNoticeList from "@pages/DateSelectedNoticeList";
import Scheduler from "@pages/Scheduler";
import CompanyHome from "@pages/CompanyHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ExtrasHome />} />
          <Route path="/company-home" element={<CompanyHome />} />

          {/* 임시, 추후 주디님 관리자 화면으로 연결할 route */}
          <Route
            path="company-home/company-job-list/:jobPostId"
            element={<ExtraCastingBoard />}
          />
          <Route
            path="/extra-casting-board/:jobPostId"
            element={<ExtraCastingBoard />}
          />

          <Route
            path="/date-selected-notice-list"
            element={<DateSelectedNoticeList />}
          />

          <Route path="/scheduler" element={<Scheduler />} />

          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/applicants" element={<ShowApplicant />} />
          <Route path="/add-notice" element={<AddNotice />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
