import ExtrasHome from "@components/ExtrasHome";
import ExtraCastingBoard from "@components/ExtraCastingBoard";
import DateSelectedNoticeList from "@components/DateSelectedNoticeList";
import Scheduler from "@components/Scheduler";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ExtrasHome />} />
          <Route
            path="/extra-casting-board/:jobPostId"
            element={<ExtraCastingBoard />}
          />

          <Route
            path="/date-selected-notice-list"
            element={<DateSelectedNoticeList />}
          />

          <Route path="/scheduler" element={<Scheduler />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
