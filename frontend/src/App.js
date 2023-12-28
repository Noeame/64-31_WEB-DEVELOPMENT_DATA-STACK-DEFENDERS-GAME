import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Description from "./pages/Description";
import Introduction from "./pages/Introduction";
import Links from "./pages/Links";
import Logbook from "./pages/Logbook";
import Others from "./pages/Others";
import Result from "./pages/Result";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/description" element={<Description />} />
        <Route path="/links" element={<Links />} />
        <Route path="/logbook" element={<Logbook />} />
        <Route path="/Others" element={<Others />} />
        <Route path="/result" element={<Result />} />
        <Route path="/*" element={<Introduction />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
