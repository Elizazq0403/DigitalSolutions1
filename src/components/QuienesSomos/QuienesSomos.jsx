import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // si usas slug en la ruta
import "./QuienesSomos.css";

const QuienesSomos = () => {
  const { slug } = useParams(); // empresa_id o slug
  const [sesiones, setSesiones] = useState([]);

  useEffect(() => {
    const fetchSesiones = async () => {
      try {
        // si tienes slug -> necesitas un endpoint que convierta slug -> empresa_id
        const empresaId = 2; // por ahora quemado para pruebas
        const response = await fetch(`http://localhost:5000/sesiones/${empresaId}`);
        const data = await response.json();
        setSesiones(data);
      } catch (error) {
        console.error("Error cargando sesiones:", error);
      }
    };

    fetchSesiones();
  }, [slug]);

  return (
    <div className="">
      {sesiones.map((sesion, index) => (
        <div
          key={index}
          className={`phase ${index % 2 === 0 ? "phase-right" : ""}`}
        >
          {/* Imagen opcional, puedes mapear un array de nombres de imágenes */}
          <img
            src={require(`../../assets/img/${["Quienes-Somos.png","Excelencia.png","compromiso.png","Otros_productos.png","Otras_lineas.png"][index]}`)}
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

