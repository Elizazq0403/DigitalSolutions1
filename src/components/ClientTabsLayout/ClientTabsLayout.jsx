import React, { useState, useEffect } from 'react';
import { useLocation, Outlet, useParams, Link } from 'react-router-dom';
import './ClientTabsLayout.css';

const ClientTabsLayout = () => {
  const { slug } = useParams();
  const location = useLocation();

  const getActiveTab = () => {
    const pathParts = location.pathname.split('/');
    // Obtiene la parte de la URL después del slug (por ejemplo, "perfil" o "productos")
    const tab = pathParts[3] || 'perfil'; 
    return tab;
  };
  const [activeTab, setActiveTab] = useState(getActiveTab());

  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl overflow-x-auto border rounded-lg p-4 shadow-xl" style={{ backgroundColor: 'rgba(240, 100, 76, 0.2)' }}>
        <div className="flex justify-around border-b border-gray-300">
          <Link
            to={`/cliente/${slug}/perfil`}
            className={`px-2 py-3 transition-all duration-300 ${activeTab === 'perfil' ? 'border-b-2 border-blue-500 font-semibold text-blue-600' : 'text-gray-600'}`}
          >
            👤
            Perfil
          </Link>
          <Link
            to={`/cliente/${slug}/productos`}
            className={`px-2 py-3 transition-all duration-300 ${activeTab === 'productos' ? 'border-b-2 border-blue-500 font-semibold text-blue-600' : 'text-gray-600'}`}
          >
            🛒
            Productos
          </Link>
          <Link
            to={`/cliente/${slug}/empresa`}
            className={`px-2 py-3 transition-all duration-300 ${activeTab === 'empresa' ? 'border-b-2 border-blue-500 font-semibold text-blue-600' : 'text-gray-600'}`}
          >
            🏢
            Empresa
          </Link>
          <Link
            to={`/cliente/${slug}/contacto`}
            className={`px-2 py-3 transition-all duration-300 ${activeTab === 'contacto' ? 'border-b-2 border-blue-500 font-semibold text-blue-600' : 'text-gray-600'}`}
          >
            📞
            Contacto
          </Link>
        </div>
        <div className="mt-4">
          <Outlet /> {/* Aquí se renderiza el componente de la pestaña activa */}
        </div>
      </div>
    </div>
  );
};

export default ClientTabsLayout;