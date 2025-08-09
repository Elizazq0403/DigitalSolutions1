import "./Cliente.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from 'antd';

const Cliente = ({ slug, colorPrimario }) => {
  console.log("📌 Slug recibido en Cliente:", slug);

  const [persona, setPersona] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPersona = async () => {
      try {
        // 🔍 Validación del slug
        // Si no se recibió un slug válido, evitamos hacer la petición
        // y dejamos que el flujo de errores se encargue de mostrar un mensaje
        if (!slug) {
          // ⚠️ Antes lanzábamos un error aquí para detener la ejecución
          // throw new Error("No se proporcionó un slug válido");
          console.warn("⚠️ No se recibió un slug válido para buscar el cliente.");
          return; // Salimos para no ejecutar la petición
        }
        
        // 🌐 Petición al backend usando el slug
        const response = await axios.get(`http://localhost:5000/personas/slug/${slug}`);
        
        // 📭 Validación de respuesta
        if (!response.data) {
          throw new Error("No se encontraron datos para este cliente");
        }
        
        // ✅ Guardamos la data en el estado
        setPersona(response.data);

      } catch (err) {
        // ❌ Capturamos y guardamos el error para mostrarlo en la UI
        console.error("Error al obtener persona:", err);
        setError(err.message);
      } finally {
        // ⏳ Siempre quitamos el loading al terminar
        setLoading(false);
      }
    };

    obtenerPersona();
  }, [slug]); // Dependencia del slug para recargar si cambia

  // 🌀 Loader mientras esperamos datos
  if (loading) return <Spin tip="Cargando datos..." size="large" />;

  // ❌ Si hay error, lo mostramos
  if (error) return <div className="error-message">Error: {error}</div>;

  // 📭 Si no hay persona encontrada, mostramos un mensaje específico
  //if (!persona) return <p>No se encontró la persona con el slug: {slug}</p>;
  if (!persona) return <p></p>;


  const {
    nombre,
    cargo,
    celular,
    correo_electronico,
    link_whatsapp,
    link_foto
  } = persona;

  return (
    <div className="cliente-card">
      {/* 🏷️ Encabezado con nombre y foto */}
      <div className="cliente-header" style={{ backgroundColor: colorPrimario, position: "relative" }}>
        <h2 className="cliente-titulo">Asher Industriales</h2>
        <img
          src={link_foto}
          alt={nombre}
          style={{ border: `4px solid ${colorPrimario}` }}
        />
      </div>

      {/* 📋 Información del cliente */}
      <div className="cliente-info">
        <h4 style={{ color: colorPrimario }}>{nombre}</h4>
        <hr style={{ backgroundColor: colorPrimario }} />
        <h5><strong>{cargo}</strong></h5>

        {/* 🔗 Sección de enlaces sociales */}
        <div className="social-links">
          <a href={`tel:${celular}`}>
            <div className="social-icon-box">
              <img src={require('../../assets/img/icono llamar.png')} alt="Llamar" className="iphone" />
              <span className="icon-label"><strong>Llamar</strong></span>
            </div>
          </a>

          <a href={`mailto:${correo_electronico}`} target="_blank" rel="noopener noreferrer">
            <div className="social-icon-box">
              <img src={require('../../assets/img/email.png')} alt="Email" className="whatsapp-icon" />
              <span className="icon-label"><strong>Correo</strong></span>
            </div>
          </a>

          <a href={link_whatsapp} target="_blank" rel="noopener noreferrer">
            <div className="social-icon-box">
              <img src={require('../../assets/img/whatsapp.png')} alt="WhatsApp" className="iphone" />
              <span className="icon-label"><strong>Whatsapp</strong></span>
            </div>
          </a>

          <a href="https://www.hotmail.com" target="_blank" rel="noopener noreferrer">
            <div className="social-icon-box">
              <img src={require('../../assets/img/descarga.png')} alt="Icono Descargar" className="iphone" />
              <span className="icon-label"><strong>Contacto</strong></span>    
            </div>
          </a>

          <a href="https://api.whatsapp.com/send?text=https://elizazq0403.github.io/DigitalSolutions1/" target="_blank" rel="noopener noreferrer">
            <div className="social-icon-box">
              <img src={require('../../assets/img/compartir2.png')} alt="Icono Compartir" className="iphone" />
              <span className="icon-label"><strong>Compartir Wp</strong></span>
            </div>
          </a>

          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <div className="social-icon-box">
              <img src={require('../../assets/img/compartir.png')} alt="Icono Compartir" className="iphone" />
              <span className="icon-label"><strong>Compartir QR</strong></span>
            </div>
          </a>
        </div>
      </div>

      {/* 📱 QR de contacto */}
      <div className="cliente-inf">
        <div className="social-redes">
          <div className="cuadrado-con-borde-int">
            <div className="borde-interno-rojo" style={{ border: `3px solid ${colorPrimario}` }}>
              <img
                src={require('../../assets/img/CODIGO QR.jpg')}
                alt="QR"
                className="tarjeta-qr-imagen"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cliente;





