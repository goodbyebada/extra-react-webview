import ExtrasHome from "./components/ExtrasHome";
import ExtraCastingBoard from "./components/ExtraCastingBoard";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <ExtrasHome /> */}
      {/* <ExtraCastingBoard /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ExtrasHome />} />
          <Route path="/extra-casting-board" element={<ExtraCastingBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
