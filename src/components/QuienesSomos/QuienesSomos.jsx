import React, { useEffect, useState } from "react";
import "./QuienesSomos.css";
import { getApiUrl } from "../../../src/api/config";

const QuienesSomos = ({ empresaId }) => {
  const [sesiones, setSesiones] = useState([]);

  // 🔽 BASE URL según entorno
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

  
  // 🔽 URLs de las imágenes usando baseUrl (SOLO ESTO CAMBIA)
  const quienesSomosImg = `${baseUrl}/img/Quienes-Somos.png`;
  const excelenciaImg = `${baseUrl}/img/Excelencia.png`;
  const compromisoImg = `${baseUrl}/img/compromiso.png`;
  const otrosProductosImg = `${baseUrl}/img/Otros_productos.png`;
  const otrasLineasImg = `${baseUrl}/img/Otras_lineas.png`;

  // 🔽 ARRAY DE IMÁGENES CON LAS NUEVAS URLS
  const imagenes = [
    quienesSomosImg,
    excelenciaImg,
    compromisoImg,
    otrosProductosImg,
    otrasLineasImg
  ];

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

  return (
    <div>
      {sesiones.map((sesion, index) => (
        <div
          key={index}
          className={`phase ${index % 2 === 0 ? "phase-right" : ""}`}
        >
          <img
            src={imagenes[index] || imagenes[0]} // Usa la imagen correspondiente o fallback
            alt="Icono representativo"
            className="phase-icon"
          />
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


