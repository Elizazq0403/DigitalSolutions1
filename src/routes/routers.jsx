import { Routes, Route } from "react-router-dom";
import App from "../App";
import Cliente from "../components/Cliente/Cliente";
import Servicios from "./pages/Servicios/Servicios";
import Business from "./pages/Business/Business";
import Contacto from "./pages/Contacto/Contacto";

function Router() {
  return (
    <Routes>
      <Route path="/cliente/:slug" element={<Layout />}>
        <Route index element={<Cliente />} />
        <Route path="perfil" element={<Cliente />} />
        <Route path="productos" element={<Servicios />} />
        <Route path="empresa" element={<Business />} />
        <Route path="contacto" element={<Contacto />} />
      </Route>
    </Routes>
  );
}

export default Router;

