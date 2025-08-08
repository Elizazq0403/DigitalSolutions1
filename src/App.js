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
import { useNavigate, useLocation, Outlet, useParams, Link } from "react-router-dom";
import PruebaConexion from './components/Utils/PruebaConexion';

function App() {
  //const { slug } = useParams();
  const slug = "asher-adriana-giraldo";
  const location = useLocation();
  
  // Estado para los equipos y colaboradores
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

  // Determina el tab activo basado en la URL
  const getActiveTab = () => {
    const pathParts = location.pathname.split('/');
    return pathParts[3] || 'perfil'; // ['', 'cliente', slug, tab]
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  // Sincroniza el tab activo cuando cambia la URL
  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location]);

  // Función para actualizar el color
  const actualizarColor = (color, id) => {
    const equiposActualizados = equipos.map((equipo) => {
      if (equipo.id === id) {
        return { ...equipo, colorPrimario: color };
      }
      return equipo;
    });
    actualizarEquipos(equiposActualizados);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="overflow-x-auto border rounded-lg p-4 shadow-md" style={{ backgroundColor: hexToRgba(equipos[0].colorPrimario, 0.6) }}>
        {/* Barra de navegación con Links */}
        <div className="flex justify-around border-b border-gray-300">
          <Link
            to={`/cliente/${slug}/perfil`}
            className={`px-2 py-3 ${activeTab === "perfil" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
          >
            <MdAdUnits className="inline mr-2" />
            Perfil
          </Link>

          <Link
            to={`/cliente/${slug}/productos`}
            className={`px-2 py-3 ${activeTab === "productos" ? "border-b-2 border-blue-500 font-semibold animate-bounce" : ""}`}
          >
            <HiShoppingCart className="inline mr-2" />
            Productos
          </Link>

          <Link
            to={`/cliente/${slug}/empresa`}
            className={`px-2 py-3 ${activeTab === "empresa" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
          >
            <MdOutlineStorefront className="inline mr-2" />
            Empresa
          </Link>

          <Link
            to={`/cliente/${slug}/contacto`}
            className={`px-2 py-3 ${activeTab === "contacto" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
          >
            <MdAssignmentInd className="inline mr-2" />
            Contacto
          </Link>
        </div>

        {/* Contenido de los tabs */}
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
                  datos={equipo}
                  key={equipo.id}
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
