// Router.js
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import ConfigLayout from "../components/ConfigLayout"; // 👈 Nuevo layout
import Cliente from "../pages/Cliente/Cliente";
import Servicios from "../pages/Servicios/Servicios";
import Business from "../pages/Business/Business";
import Contacto from "../pages/Contacto/Contacto";
import CodigoQR from "../pages/CodigoQR/CodigoQR";
import VideoQR from "../pages/VideoQR/VideoQR";

function Router() {
  return (
    <Routes>
      {/* Ruta INDEPENDIENTE para CodigoQR - CON SU PROPIO LAYOUT */}
      <Route path="/codigoqr" element={<ConfigLayout />}>
        <Route index element={<CodigoQR />} />
      </Route>
      
      {/* Rutas específicas de cliente - CON EL LAYOUT DE APP */}
      <Route path="/cliente/:slug" element={<Layout />}>
        <Route index element={<Cliente />} />
        <Route path="perfil" element={<Cliente />} />
        <Route path="productos" element={<Servicios />} />
        <Route path="empresa" element={<Business />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="generar-qr" element={<CodigoQR />} />
        <Route path="video-qr" element={<VideoQR />} />
      </Route>
    </Routes>
  );
}

export default Router;


