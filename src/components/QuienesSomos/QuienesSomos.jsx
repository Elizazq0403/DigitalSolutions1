import React, { useEffect, useState } from "react";
import "./QuienesSomos.css";

const QuienesSomos = ({ empresaId }) => {
  const [sesiones, setSesiones] = useState([]);

  useEffect(() => {
    const fetchSesiones = async () => {
      try {
        if (!empresaId) {
          console.warn("⚠️ empresaId no recibido en QuienesSomos");
          return;
        }

        const response = await fetch(`http://localhost:5000/sesiones/${empresaId}`);
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
            src={require(`../../assets/img/${
              [
                "Quienes-Somos.png",
                "Excelencia.png",
                "compromiso.png",
                "Otros_productos.png",
                "Otras_lineas.png"
              ][index]
            }`)}
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


