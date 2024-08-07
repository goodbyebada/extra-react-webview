import ExtrasHome from "@pages/ExtrasHome";
import ExtraCastingBoard from "@pages/ExtraCastingBoard";
import DateSelectedNoticeList from "@pages/DateSelectedNoticeList";
import Scheduler from "@pages/Scheduler";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompanyHome from "@pages/CompanyHome";
import ExtraShootManagePage from "@pages/ExtraShootManagePage";

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

          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/member/manage" element={<ExtraShootManagePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
