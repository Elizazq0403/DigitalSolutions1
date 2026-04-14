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
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "./api/config.js";
import { useNavigate } from 'react-router-dom';
import CargandoPagina from './components/Cargando_pagina/CargandoPagina.jsx';

// 🔹 NUEVO HOOK UNIFICADO PARA OBTENER EL SLUG (funciona con y sin #)
const useSlugUniversal = () => {
  const { slug } = useParams(); // Primero intentar con useParams (BrowserRouter)
  
  // Si useParams no devuelve slug, extraer de la URL
  if (slug) {
    console.log('✅ Slug obtenido de useParams():', slug);
    return slug;
  }
  
  // Fallback: extraer de la URL actual
  const { pathname, hash } = window.location;
  console.log('🔍 URL actual - pathname:', pathname, 'hash:', hash);
  
  // Intentar desde pathname (BrowserRouter): /cliente/mi-slug/perfil
  if (pathname.includes('/cliente/')) {
    const pathParts = pathname.split('/');
    const slugFromPath = pathParts[2]; // ["", "cliente", "mi-slug", "perfil"]
    if (slugFromPath) {
      console.log('✅ Slug extraído de pathname:', slugFromPath);
      return slugFromPath;
    }
  }
  
  // Intentar desde hash (HashRouter legacy): #/cliente/mi-slug/perfil
  if (hash.includes('/cliente/')) {
    const hashParts = hash.split('/');
    const slugFromHash = hashParts[2]; // ["#", "cliente", "mi-slug", "perfil"]
    if (slugFromHash) {
      console.log('✅ Slug extraído de hash:', slugFromHash);
      return slugFromHash;
    }
  }
  
  console.warn('⚠️ No se pudo extraer slug de la URL');
  return '';
};

// 🔹 Componente de Debug (opcional)
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
    <p><strong>Slug:</strong> {slug || 'NO ENCONTRADO'}</p>
    <p><strong>URL completa:</strong> {window.location.href}</p>
    <p><strong>Pathname:</strong> {window.location.pathname}</p>
    <p><strong>Hash:</strong> {window.location.hash || '(vacío)'}</p>
    <p><strong>Loading:</strong> {loading ? 'true' : 'false'}</p>
    <p><strong>Active Tab:</strong> {activeTab}</p>
  </div>
);

function App() {
  // 🔹 Obtener slug con el nuevo hook universal
  const slug = useSlugUniversal();
  console.log("📌 Slug detectado en App:", slug);
  
  const location = useLocation();
  console.log("📍 useLocation():", location);
  
  const [colaboradores] = useState([{
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

  const navigate = useNavigate();
  
  // 🔹 Redirección si es necesaria
  useEffect(() => {
    const redirectPath = sessionStorage.redirect;
    if (redirectPath && redirectPath !== window.location.pathname) {
      sessionStorage.removeItem('redirect');
      navigate(redirectPath);
    }
  }, [navigate]);

  // 🔹 Obtener datos completos de la empresa
  useEffect(() => {
    const obtenerEmpresaCompleta = async () => {
      // Si no hay slug, no hacer nada
      if (!slug) {
        console.warn("⚠️ No hay slug para hacer la petición");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setApiError(null);
        console.log("🌐 Haciendo fetch a:", getApiUrl(`/personas/${slug}`));
        
        const response = await axios.get(getApiUrl(`/personas/${slug}`));
        
        console.log("📦 Respuesta completa de la API:", response.data);
        
        if (response.data.empresa) {
          const empresa = response.data.empresa;
          setEmpresaData(empresa);
          
          console.log("🔍 Campos disponibles en empresa:", Object.keys(empresa));
          console.log("📌 id_empresa:", empresa.id_empresa);
          console.log("🎨 pantone1:", empresa.pantone1);
          console.log("🎨 pantone2:", empresa.pantone2);
          
          // Actualizar colores de equipos con pantone1 y pantone2
          const pantone1 = empresa.pantone1 || "#00c02e";
          const pantone2 = empresa.pantone2 || "#E8F8FF"; // Valor por defecto si no existe
          
          actualizarEquipos((prevEquipos) =>
            prevEquipos.map((eq) => ({ 
              ...eq, 
              colorPrimario: pantone1,
              colorSecundario: pantone2 // Asignar pantone2 a colorSecundario
            }))
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

    obtenerEmpresaCompleta();
  }, [slug]);

  // 🔹 Función para obtener la pestaña activa (actualizada para BrowserRouter)
  const getActiveTab = () => {
    const pathname = location.pathname; // Ej: /cliente/mi-slug/productos
    
    // Extraer la última parte de la ruta
    const pathParts = pathname.split('/');
    const tab = pathParts[3]; // ["", "cliente", "mi-slug", "productos"]
    
    // Si no hay pestaña específica, usar 'perfil' por defecto
    return tab || 'perfil';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  // 🔹 Actualizar pestaña activa cuando cambia la ruta
  useEffect(() => {
    const newActiveTab = getActiveTab();
    console.log("🔄 Cambiando activeTab a:", newActiveTab);
    setActiveTab(newActiveTab);
  }, [location]);

  // 🔹 Actualizar color de equipos
  const actualizarColor = (color, id) => {
    const equiposActualizados = equipos.map((equipo) => {
      if (equipo.id === id) {
        return { ...equipo, colorPrimario: color };
      }
      return equipo;
    });
    actualizarEquipos(equiposActualizados);
  };

  // 🔹 Clase para pestañas activas
  const getTabClass = (tab) =>
    `px-2 py-3 ${activeTab === tab ? "border-b-2 border-blue-500 font-semibold" : ""}`;

  // 🔹 Estados de carga y error
  if (loading) {
    console.log("⏳ Loading es TRUE - Mostrando CargandoPagina");
    return <CargandoPagina />;
  } 

  if (apiError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h2 className="font-bold">Error al cargar datos</h2>
          <p>{apiError}</p>
          <p className="text-sm mt-2">Slug: {slug || '(no detectado)'}</p>
          <p className="text-sm">URL: {window.location.href}</p>
        </div>
      </div>
    );
  }

  // 🔹 Si no hay slug, mostrar error
  if (!slug) {
    window.location.href = "https://tudcard.com/#/cliente/webz-elizabeth-zapata/productos";
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* 🔹 Componente de Debug (comentar en producción) 
      <DebugInfo 
        slug={slug} 
        empresaData={empresaData} 
        loading={loading} 
        activeTab={activeTab} 
      />
      */}
      <div
        className="overflow-x-auto border rounded-lg p-4 shadow-md"
        //style={{ backgroundColor: hexToRgba(equipos[0].colorPrimario, 0.6) }}
        style={{ backgroundColor: hexToRgba(equipos[0].colorSecundario) }}

      >
        {/* 🔹 Navegación - IMPORTANTE: Links SIN # */}
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
                  colaboradores={colaboradores.filter(
                    (colaborador) => colaborador.equipo === equipo.titulo
                  )}
                  actualizarColor={actualizarColor}
                  empresaNombreUsuario={empresaData?.nombre_usuario_url}
                />
              ))}
              <Cliente 
                slug={slug} 
                colorPrimario={equipos[0].colorPrimario} 
                colorSecundario={equipos[0].colorSecundario}
              />
            </div>
          )}

          {activeTab === "empresa" && (
            <div className='container'>
              {equipos.map((equipo, index) => (
                <Business
                  slug={slug} 
                  datos={{
                    ...equipo,
                    link_logo: empresaData?.link_logo,
                    nombre: empresaData?.razon_social,
                  }} 
                  key={equipo.id} 
                  empresaId={empresaData?.id_empresa}
                  colorPrimario={equipos[0].colorPrimario} 
                  colorSecundario={equipos[0].colorSecundario}
                />
              ))}
            </div>
          )}

          {activeTab === "productos" && (
            <div className='container'>
              {equipos.map((equipo) => (
                <Servicios 
                  datos={{
                    ...equipo,
                    link_logo: empresaData?.link_logo,
                    nombre: empresaData?.razon_social
                  }} 
                  key={equipo.id} 
                  empresaId={empresaData?.id_empresa}
                />
              ))}
            </div>
          )}

          {activeTab === "contacto" && (
            <div className='container'>
              {equipos.map((equipo) => (
                <Contacto
                  slug={slug}
                  datos={{
                    link_logo: empresaData?.link_logo,
                    nombre: empresaData?.razon_social,
                    direccion: empresaData?.direccion,
                    telefono: empresaData?.telefono,
                    correo_electronico: empresaData?.correo_electronico,
                    link_ubicacion_maps: empresaData?.link_ubicacion_maps,
                  }}
                  key={equipo.id}
                  colorPrimario={equipos[0].colorPrimario}
                  colorSecundario={equipos[0].colorSecundario}
                  colaboradores={colaboradores.filter(colaborador => colaborador.equipo === equipo.titulo)}
                  empresaId={empresaData?.id_empresa}
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



