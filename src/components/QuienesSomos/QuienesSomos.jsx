import React, { useEffect, useState } from "react";
import "./QuienesSomos.css";
import { getApiUrl } from "../../../src/api/config";
import PerfilIcons from "../../components/PerfilIcons/PerfilIcons";

// 📌 Iconos provisionales para cada sesión
const IconosProvicionales = {
  // Icono de libro/documentos (para Quienes Somos)
  libro: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
      <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
    </svg>
  ),
  
  // Icono de estrella (para Excelencia)
  estrella: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  ),
  
  // Icono de corazón (para Compromiso)
  corazon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg>
  ),
  
  // Icono de caja/productos (para Otros Productos)
  productos: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
    </svg>
  ),
  
  // Icono de líneas/gráfico (para Otras Líneas)
  lineas: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
      <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
    </svg>
  )
};

const QuienesSomos = ({ empresaId, colorPrimario, colorSecundario }) => {
  const [sesiones, setSesiones] = useState([]);

  useEffect(() => {
    const fetchSesiones = async () => {
      try {
        if (!empresaId) {
          console.warn("⚠️ empresaId no recibido en QuienesSomos");
          return;
        }

        const response = await fetch(getApiUrl(`/sesiones/${empresaId}`));
        const data = await response.json();
        setSesiones(data);
      } catch (error) {
        console.error("❌ Error cargando sesiones:", error);
      }
    };

    fetchSesiones();
  }, [empresaId]);

  // Array de iconos provisionales para cada sesión
  const iconosPorSesion = [
    { icon: IconosProvicionales.libro, text: "QUIENES   SOMOS" },      // Sesión 0
    { icon: IconosProvicionales.productos, text: "PRODUCTO CATÁLOGO " },      // Sesión 1
    { icon: IconosProvicionales.estrella, text: "NUESTRO PROPÓSITO" },       // Sesión 2
    { icon: IconosProvicionales.corazon, text: "MERCADO OBJETIVO" },      // Sesión 3
    { icon: IconosProvicionales.lineas, text: "LÍNEAS" }             // Sesión 4
  ];

  return (
    <div>
      {sesiones.map((sesion, index) => (
        <div
          key={index}
          className={`phase ${index % 2 === 0 ? "phase-right" : ""}`}
        >
          <div className="phase-icon-container">
            <PerfilIcons 
              text={iconosPorSesion[index]?.text || "MERCADO OBJETIVO"}
              icon={iconosPorSesion[index]?.icon || IconosProvicionales.libro}
              iconCopy={iconosPorSesion[index]?.icon || IconosProvicionales.libro}
              colorPrimario={colorPrimario}
              colorSecundario={colorSecundario}
            />
          </div>
          <div className="phase-content">
            <h2 className="phase-title">
              <strong>{sesion.titulo}</strong>
            </h2>
            <p>{sesion.descripcion}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuienesSomos; 


