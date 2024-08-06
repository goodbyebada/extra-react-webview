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
  );
}

export default App;
