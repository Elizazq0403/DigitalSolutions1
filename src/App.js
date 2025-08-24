import { useState, useEffect } from 'react';
import { v4 as uuid } from "uuid";
import './App.css';
import Empresa from './components/Empresa/Empresa';
import Cliente from './components/Cliente/Cliente';
import Servicios from './pages/Servicios/Servicios';
import { MdAdUnits, MdOutlineStorefront, MdAssignmentInd } from "react-icons/md";
import { HiShoppingCart } from "react-icons/hi";
import hexToRgba from 'hex-to-rgba';
import Business from './pages/Business/Business';
import Contacto from './pages/Contacto/Contacto';
import { useLocation, useParams, Link } from "react-router-dom";
import PruebaConexion from './components/Utils/PruebaConexion';
import axios from "axios";   // 🔹 importar axios

// 🔹 Hook para obtener slug con fallback
const useSlug = () => {
  const { slug } = useParams();
  if (slug) return slug; 
  const pathParts = window.location.pathname.split('/');
  return pathParts[2] || ''; 
};

function App() {
  const slug = useSlug();
  console.log("📌 Slug detectado en App:", slug);

  const location = useLocation();

  const [colaboradores, actualizarColaboradores] = useState([{
    id: uuid(),
    empresa: "Asher Industriales",
    nit: "900.811.757-1",
    equipo: "Front End",
    foto: require('./assets/img/ASHER INDUSTRIALES.png'),
    nombre: "Adriana Girado Granda",
    puesto: "Gerente",
    fav: true
  }]);

  // 🔹 Inicializar equipos sin color (pantone1 vendrá del backend)
  const [equipos, actualizarEquipos] = useState([{
    id: uuid(),
    titulo: "Front End",
    colorPrimario: "#cccccc",  // color por defecto mientras carga
    colorSecundario: "#E8F8FF"
  }]);

  // 🔹 Llamar backend para obtener datos de empresa (incluye pantone1)
  useEffect(() => {
    const obtenerEmpresa = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/personas/${slug}`);
        if (response.data.empresa) {
          const pantone1 = response.data.empresa.pantone1 || "#00c02e"; // fallback
          actualizarEquipos((prevEquipos) =>
            prevEquipos.map((eq) => ({ ...eq, colorPrimario: pantone1 }))
          );
        }
      } catch (error) {
        console.error("❌ Error obteniendo empresa:", error);
      }
    };

    if (slug) {
      obtenerEmpresa();
    }
  }, [slug]);

  const getActiveTab = () => {
    const pathParts = location.pathname.split('/');
    return pathParts[3] || 'perfil';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location]);

  const actualizarColor = (color, id) => {
    const equiposActualizados = equipos.map((equipo) => {
      if (equipo.id === id) {
        return { ...equipo, colorPrimario: color };
      }
      return equipo;
    });
    actualizarEquipos(equiposActualizados);
  };

  const getTabClass = (tab) =>
    `px-2 py-3 ${activeTab === tab ? "border-b-2 border-blue-500 font-semibold" : ""}`;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className="overflow-x-auto border rounded-lg p-4 shadow-md"
        style={{ backgroundColor: hexToRgba(equipos[0].colorPrimario, 0.6) }}
      >
        {/* 🔹 Navegación */}
        <div className="flex justify-around border-b border-gray-300">
          <Link to={`/cliente/${slug}/perfil`} className={getTabClass("perfil")}>
            <MdAdUnits className="inline mr-2" /> Perfil
          </Link>

          <Link to={`/cliente/${slug}/productos`} className={getTabClass("productos")}>
            <HiShoppingCart className="inline mr-2" /> Productos
          </Link>

          <Link to={`/cliente/${slug}/empresa`} className={getTabClass("empresa")}>
            <MdOutlineStorefront className="inline mr-2" /> Empresa
          </Link>

          <Link to={`/cliente/${slug}/contacto`} className={getTabClass("contacto")}>
            <MdAssignmentInd className="inline mr-2" /> Contacto
          </Link>
        </div>

        {/* 🔹 Contenido dinámico */}
        <div className="mt-4 text-center">
          {activeTab === "perfil" && (
            <div className='container'>
              {equipos.map((equipo) => (
                <Empresa
                  datos={equipo}
                  key={equipo.id}
                  colaboradores={colaboradores.filter(colaborador => colaborador.equipo === equipo.titulo)}
                  actualizarColor={actualizarColor}
                />
              ))}
              <Cliente slug={slug} colorPrimario={equipos[0].colorPrimario} />
            </div>
          )}

          {activeTab === "empresa" && (
            <div className='container'>
              {equipos.map((equipo) => (
                <Business datos={equipo} key={equipo.id} />
              ))}
            </div>
          )}

          {activeTab === "productos" && (
            <div className='container'>
              {equipos.map((equipo) => (
                <Servicios datos={equipo} key={equipo.id} />
              ))}
            </div>
          )}

          {activeTab === "contacto" && (
            <div className='container'>
              {equipos.map((equipo) => (
                <Contacto
                  slug={slug}
                  datos={equipo}
                  key={equipo.id}
                  colorPrimario={equipos[0].colorPrimario}
                  colaboradores={colaboradores.filter(colaborador => colaborador.equipo === equipo.titulo)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="App">
        <h1>Mi App Digital</h1>
        <PruebaConexion />
      </div>
    </div>
  );
}

export default App;



