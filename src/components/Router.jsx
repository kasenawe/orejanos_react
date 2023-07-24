import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Coordinators from "../pages/Coordinators";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coordinadores" element={<Coordinators />} />
    </Routes>
  );
}

export default Router;
