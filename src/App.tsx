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
import ExtraShootManagePage from "@pages/ExtraShootManagePage";
import NotFound from "@pages/Error/NotFound";
import DateSelectedNoticeListForCom from "@pages/DateSelectedNoticeListForCom";

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
          <Route path="/member/manage" element={<ExtraShootManagePage />} />

          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
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
