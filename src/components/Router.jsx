import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Coordinators from "../pages/Coordinators";
import Photos from "../pages/Photos";
import Salidas from "../pages/Salidas";
import Contact from "../pages/Contact";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coordinadores" element={<Coordinators />} />
      <Route path="/fotos" element={<Photos />} />
      <Route path="/salidas" element={<Salidas />} />
      <Route path="/contacto" element={<Contact />} />
    </Routes>
  );
}

export default Router;
