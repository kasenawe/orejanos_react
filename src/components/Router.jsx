import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Coordinators from "../pages/Coordinators";
import Gallery from "../pages/Gallery";
import Salidas from "../pages/Salidas";
import Contact from "../pages/Contact";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coordinadores" element={<Coordinators />} />
      <Route path="/galeria" element={<Gallery />} />
      <Route path="/salidas" element={<Salidas />} />
      <Route path="/contacto" element={<Contact />} />
    </Routes>
  );
}

export default Router;
