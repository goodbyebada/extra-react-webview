<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ManagerDashboard from "./pages/ManagerDashboard";
import DetailPage from "./pages/DetailPage";
import AddNotice from "./pages/AddNotice";
import ShowApplicant from "./pages/ShowApplicant";


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<ManagerDashboard />} />
              <Route path="/detail" element={<DetailPage />} /> 
              <Route path="/applicants" element={<ShowApplicant />} />
              <Route path="/add-notice" element={<AddNotice />} />
          </Routes>
      </Router>
=======
import ExtrasHome from "@pages/ExtrasHome";
import ExtraCastingBoard from "@pages/ExtraCastingBoard";
import DateSelectedNoticeList from "@pages/DateSelectedNoticeList";
import Scheduler from "@pages/Scheduler";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompanyHome from "@pages/CompanyHome";

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
        </Routes>
      </BrowserRouter>
    </>
>>>>>>> d4b43e5e1bad0fbc529e1c9004daa172a732b614
  );
}

export default App;
