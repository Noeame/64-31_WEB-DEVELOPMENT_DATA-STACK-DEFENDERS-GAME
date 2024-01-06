import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Description from "./pages/Description";
import Introduction from "./pages/Introduction";
import Links from "./pages/Links";
import Logbook from "./pages/Logbook";
import Result from "./pages/Result";

// Définition des routes des pages. Ce qui veut dire que chaque page est liée à un path. Exemple lorsque le path = /logbook c'est la page Logbook.js est appelée
// la route "/*" veut simplement dire que pour tout chemin différent des chémins définit dans la balise <Routes>, c'est la page Introduction.js qui est appelée
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/description" element={<Description />} />
        <Route path="/links" element={<Links />} />
        <Route path="/logbook" element={<Logbook />} />
        <Route path="/result" element={<Result />} />
        <Route path="/*" element={<Introduction />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
