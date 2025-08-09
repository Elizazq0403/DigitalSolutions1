import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Cliente from "../pages/Cliente/Cliente";
import Servicios from "../pages/Servicios/Servicios";
import Business from "../pages/Business/Business";
import Contacto from "../pages/Contacto/Contacto";

function Router() {
  return (
    <Routes>
      <Route path="/cliente/:slug" element={<Layout />}>
        <Route index element={<Cliente />} /> {/* /cliente/:slug */}
        <Route path="perfil" element={<Cliente />} /> {/* /cliente/:slug/perfil */}
        <Route path="productos" element={<Servicios />} />
        <Route path="empresa" element={<Business />} />
        <Route path="contacto" element={<Contacto />} />
      </Route>
    </Routes>
  );
}

export default Router;


