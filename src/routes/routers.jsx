import { Routes, Route } from "react-router-dom";
import App from "./App";
import Perfil from "../components/Perfil/Perfil";
import Productos from "./pages/Productos";
import Empresa from "./pages/Empresa";
import Contacto from "./pages/Contacto";

function Router() {
  return (
    <Routes>
      <Route path="/cliente/:slug" element={<App />}>
        <Route index element={<Perfil />} /> {/* Ruta por defecto */}
        <Route path="perfil" element={<Perfil />} />
        <Route path="productos" element={<Productos />} />
        <Route path="empresa" element={<Empresa />} />
        <Route path="contacto" element={<Contacto />} />
      </Route>
    </Routes>
  );
}

export default Router;

