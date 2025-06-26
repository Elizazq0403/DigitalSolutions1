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

function App() {
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

  const [equipos, actualizarEquipos] = useState([{
    id: uuid(),
    titulo: "Front End",
    colorPrimario: "#F0644C",
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
  const [activeTab, setActiveTab] = useState(location.pathname.replace("/", "") || "Perfil");

  useEffect(() => {
    const rutaActual = location.pathname.replace("/", "") || "Perfil";
    setActiveTab(rutaActual);
  }, [location]);

  const cambiarTab = (tab) => {
    navigate(`/${tab}`);
    setActiveTab(tab);
  };

  // ⏱ Recorrido automático por tabs y regreso a Perfil
  useEffect(() => {
    const tabs = ['Perfil', 'Productos', 'Empresa', 'Contacto'];
    let index = 0;

    const intervalo = setInterval(() => {
      if (index < tabs.length) {
        cambiarTab(tabs[index]);
        index++;
      } else {
        clearInterval(intervalo);
        setTimeout(() => cambiarTab('Perfil'), 2000); // regresa a Perfil luego de ver Contacto
      }
    }, 3000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="overflow-x-auto border rounded-lg p-4 shadow-md" style={{ backgroundColor: hexToRgba(equipos[0].colorPrimario, 0.6) }}>
        <div className="flex justify-around border-b border-gray-300">
          <button onClick={() => cambiarTab("Perfil")}
                  className={`px-2 py-3 ${activeTab === "Perfil" ? "border-b-2 border-blue-500 font-semibold" : ""}`}>
            <MdAdUnits className="inline mr-2" />
            Perfil
          </button>

          <button onClick={() => cambiarTab("Productos")}
                  className={`px-2 py-3 ${activeTab === "Productos" ? "border-b-2 border-blue-500 font-semibold animate-bounce" : ""}`}>
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
