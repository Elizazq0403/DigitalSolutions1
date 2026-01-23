import React, { useEffect, useState } from "react";
import "./QuienesSomos.css";
import { getApiUrl } from "../../../src/api/config";

// 🔽 IMPORTAR TODAS LAS IMÁGENES NECESARIAS
import quienesSomosImg from "../../assets/img/Quienes-Somos.png";
import excelenciaImg from "../../assets/img/Excelencia.png";
import compromisoImg from "../../assets/img/compromiso.png";
import otrosProductosImg from "../../assets/img/Otros_productos.png";
import otrasLineasImg from "../../assets/img/Otras_lineas.png";

const QuienesSomos = ({ empresaId }) => {
  const [sesiones, setSesiones] = useState([]);

  // 🔽 ARRAY DE IMÁGENES IMPORTADAS
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


