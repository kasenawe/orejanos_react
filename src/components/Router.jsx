import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Coordinators from "../pages/Coordinators";
import Gallery from "../pages/Gallery";
import Horarios from "../pages/Horarios";
import Contact from "../pages/Contact";
import Album from "../pages/Album";
import Articles from "../pages/Articles";
import Login from "../pages/Login";
import Admins from "../pages/Admins";
import ArticlesMgt from "../pages/ArticlesMgt";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coordinadores" element={<Coordinators />} />
      <Route path="/galeria" element={<Gallery />} />
      <Route path="/album/:name" element={<Album />} />
      <Route path="/publicaciones" element={<Articles />} />
      <Route path="/horarios" element={<Horarios />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admins" element={<Admins />} />
        <Route path="/admins/publicaciones" element={<ArticlesMgt />} />
      </Route>
      {/* Ruta de captura para manejar rutas desconocidas */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
