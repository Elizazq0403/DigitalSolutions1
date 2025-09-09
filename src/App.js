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
import axios from "axios";

const useSlug = () => {
  const { slug } = useParams();
  if (slug) return slug; 
  const pathParts = window.location.pathname.split('/');
  return pathParts[2] || ''; 
};

// 🔹 Componente de Debug
const DebugInfo = ({ slug, empresaData, loading, activeTab }) => (
  <div style={{
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    background: 'rgba(255,0,0,0.8)',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    zIndex: 1000,
    fontSize: '12px',
    maxWidth: '300px'
  }}>
    <h4>🐛 DEBUG INFO</h4>
    <p><strong>Slug:</strong> {slug}</p>
    <p><strong>empresaData:</strong> {empresaData ? 'EXISTE' : 'NULL'}</p>
    <p><strong>id_empresa:</strong> {empresaData?.id_empresa || 'NO DISPONIBLE'}</p>
    <p><strong>Loading:</strong> {loading ? 'true' : 'false'}</p>
    <p><strong>Active Tab:</strong> {activeTab}</p>
  </div>
);

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

  const [equipos, actualizarEquipos] = useState([{
    id: uuid(),
    titulo: "Front End",
    colorPrimario: "#cccccc",
    colorSecundario: "#E8F8FF"
  }]);

  // 🔹 Estado para almacenar los datos de la empresa
  const [empresaData, setEmpresaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // 🔹 Obtener datos completos de la empresa
  useEffect(() => {
    const obtenerEmpresaCompleta = async () => {
      try {
        setLoading(true);
        setApiError(null);
        console.log("🌐 Haciendo fetch a:", `http://localhost:5000/personas/${slug}`);
        
        const response = await axios.get(`http://localhost:5000/personas/${slug}`);
        
        // 🔹 DEPURACIÓN DETALLADA: Verifica la respuesta completa
        console.log("📦 Respuesta completa de la API:", response.data);
        console.log("🏢 Datos de empresa:", response.data.empresa);
        
        if (response.data.empresa) {
          const empresa = response.data.empresa;
          setEmpresaData(empresa);
          
          // 🔹 DEPURACIÓN: Verifica todos los campos de la empresa
          console.log("🔍 Campos disponibles en empresa:", Object.keys(empresa));
          console.log("📌 id_empresa:", empresa.id_empresa);
          console.log("📌 id:", empresa.id);
          console.log("📌 empresa_id:", empresa.empresa_id);
          console.log("📌 pantone1:", empresa.pantone1);
          
          // Actualizar color de equipos
          const pantone1 = empresa.pantone1 || "#00c02e";
          actualizarEquipos((prevEquipos) =>
            prevEquipos.map((eq) => ({ ...eq, colorPrimario: pantone1 }))
          );
        } else {
          console.warn("⚠️ No se encontró data.empresa en la respuesta");
          setApiError("No se encontraron datos de empresa en la respuesta");
        }
      } catch (error) {
        console.error("❌ Error obteniendo empresa:", error);
        console.error("❌ Detalles del error:", error.response?.data || error.message);
        setApiError(error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      obtenerEmpresaCompleta();
    } else {
      console.warn("⚠️ No hay slug para hacer la petición");
      setLoading(false);
    }
  }, [slug]);

  // 🔹 DEPURACIÓN: Verifica el estado de empresaData
  useEffect(() => {
    console.log("📊 Estado de empresaData:", empresaData);
    console.log("📊 empresaData?.id_empresa:", empresaData?.id_empresa);
    console.log("📊 Tipo de id_empresa:", typeof empresaData?.id_empresa);
  }, [empresaData]);

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

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando datos de empresa...</div>;
  }

  if (apiError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h2 className="font-bold">Error al cargar datos</h2>
          <p>{apiError}</p>
          <p className="text-sm mt-2">Slug: {slug}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* 🔹 Componente de Debug */}
      <DebugInfo 
        slug={slug} 
        empresaData={empresaData} 
        loading={loading} 
        activeTab={activeTab} 
      />

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
              <Cliente 
                slug={slug} 
                colorPrimario={equipos[0].colorPrimario} 
              />
            </div>
          )}

          {activeTab === "empresa" && (
            console.log("🔍 Equipos a mapear:", equipos),
            console.log("🔍 empresaData.id_empresa:", empresaData.id_empresa),
            <div className='container'>
              {equipos.map((equipo, index) => (
                console.log(`🔍 Renderizando Business ${index} - empresaId:`, empresaData.id_empresa),
                <Business
                  slug={slug} 
                  datos={equipo} 
                  key={equipo.id} 
                  empresaId={empresaData.id_empresa} // ✅ Quita el optional chaining si existe
                />
              ))}
            </div>
          )}

          {activeTab === "productos" && (
            console.log("🔍 Renderizando Servicios - empresaId a pasar:", empresaData?.id_empresa),
            <div className='container'>
              {equipos.map((equipo) => (
                <Servicios 
                  datos={equipo} 
                  key={equipo.id} 
                  empresaId={empresaData?.id_empresa}
                />
              ))}
            </div>
          )}

          {activeTab === "contacto" && (
            console.log("🔍 Renderizando Contacto - empresaId a pasar:", empresaData?.id_empresa),
            <div className='container'>
              {equipos.map((equipo) => (
                // App.js
                <Contacto
                  slug={slug}
                  datos={equipo}
                  key={equipo.id}
                  colorPrimario={equipos[0].colorPrimario}
                  colaboradores={colaboradores.filter(colaborador => colaborador.equipo === equipo.titulo)}
                  empresaId={empresaData.id_empresa} // ✅ PASANDO a Contacto
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



