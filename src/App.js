import { useState, useEffect } from 'react';
import { v4 as uuid } from "uuid";
import './App.css';
import Empresa from './components/Empresa/Empresa';
import Servicios from './pages/Servicios/Servicios';
import { MdAdUnits, MdOutlineStorefront, MdAssignmentInd } from "react-icons/md";
import { HiShoppingCart } from "react-icons/hi";
import hexToRgba from 'hex-to-rgba';
import Business from './pages/Business/Business';
import Contacto from './pages/Contacto/Contacto';
import { useNavigate, useLocation } from "react-router-dom"; 
import Routers from './routes/routers'; 

function App() {
  const [colaboradores, actualizarColaboradores] = useState([{
    id: uuid(),
    equipo: "Front End",
    foto: "https://firebasestorage.googleapis.com/v0/b/cv-elizabethzapataq.appspot.com/o/WhatsApp%20Image%202024-10-19%20at%205.07.00%20PM.jpeg?alt=media&token=fd10feaf-8efd-49df-8cad-c4d5797b89f9",
    nombre: "Elizabeth Zapata Quiceno",
    puesto: "Desarrolladora de Software",
    fav: true
  }]);

  const [equipos, actualizarEquipos] = useState([{
    id: uuid(),
    titulo: "Front End",
    colorPrimario: "#CA21C4",
    colorSecundario: "#E8F8FF"
  }]);

  const actualizarColor = (color, id) => {
    const equiposActualizados = equipos.map((equipo) => {
      if (equipo.id === id) {
        return { ...equipo, colorPrimario: color };
      }
      return equipo;
    });
    actualizarEquipos(equiposActualizados);
  };

  const navigate = useNavigate();
  const location = useLocation();

  // Estado para el tab activo
  const [activeTab, setActiveTab] = useState(location.pathname.replace("/", "") || "Perfil");

  // Sincronizar el estado activeTab con la ruta
  useEffect(() => {
    const rutaActual = location.pathname.replace("/", "") || "Perfil";
    setActiveTab(rutaActual);
  }, [location]);

  // Cambiar el tab activo
  const cambiarTab = (tab) => {
    if (activeTab !== tab) {
      navigate(`/${tab}`);
      setActiveTab(tab);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="overflow-x-auto border rounded-lg p-4 shadow-md" style={{ backgroundColor: hexToRgba(equipos[0].colorPrimario, 0.6) }}>
        <div className="flex justify-around border-b border-gray-300" >
          <button onClick={() => cambiarTab("Perfil")}
                  className={`px-2 py-3 ${activeTab === "Perfil" ? "border-b-2 border-blue-500 font-semibold" : ""}`}>
            <MdAdUnits className="inline mr-2" />
            Perfil
          </button>
          <button onClick={() => cambiarTab("Productos")}
                  className={`px-2 py-3 ${activeTab === "Productos" ? "border-b-2 border-blue-500 font-semibold" : ""}`}>
            <HiShoppingCart className="inline mr-2" />
            Productos
          </button>
          <button onClick={() => cambiarTab("Empresa")}
                  className={`px-2 py-3 ${activeTab === "Empresa" ? "border-b-2 border-blue-500 font-semibold" : ""}`}>
            <MdOutlineStorefront className="inline mr-2" />
            Empresa
          </button>
          <button onClick={() => cambiarTab("Contacto")}
                  className={`px-2 py-3 ${activeTab === "Contacto" ? "border-b-2 border-blue-500 font-semibold" : ""}`}>
            <MdAssignmentInd className="inline mr-2" />
            Contacto
          </button>
        </div>

        <div className="mt-4 text-center">
          {activeTab === "Perfil" && (
            <div className='container'>
              {equipos.map((equipo) => (
                <Empresa
                  datos={equipo}
                  key={equipo.id}
                  colaboradores={colaboradores.filter(colaborador => colaborador.equipo === equipo.titulo)}
                  actualizarColor={actualizarColor}
                />
              ))}
            </div>
          )}
          {activeTab === "Empresa" && (
            <div className='container'>
              {equipos.map((equipo) => (
                <Business datos={equipo} key={equipo.id} />
              ))}
            </div>
          )}
          {activeTab === "Productos" && (
            <div className='container'>
              {equipos.map((equipo) => (
                <Servicios datos={equipo} key={equipo.id} />
              ))}
            </div>
          )}
          {activeTab === "Contacto" && (
            <div className='container'>
              {equipos.map((equipo) => (
                <Contacto 
                  datos={equipo} 
                  key={equipo.id} 
                  colaboradores={colaboradores.filter(colaborador => colaborador.equipo === equipo.titulo)} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

