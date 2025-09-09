import "./Cliente.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from 'antd';

const Cliente = ({ slug, colorPrimario }) => {
  console.log("📌 Slug recibido en Cliente:", slug);

  const [persona, setPersona] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarQR, setMostrarQR] = useState(false); // Estado para controlar la visibilidad del QR

  // Función para compartir en WhatsApp sin ventana de confirmación
const handleWhatsAppShare = () => {
  // Usar el emoji directamente (no el código hexadecimal)
  const message = `Hola somos ${empresa.razon_social}. Te comparto nuestra tarjeta digital https://elizazq0403.github.io/DigitalSolutions1/`;
  
  // encodeURIComponent codificará correctamente el emoji para la URL
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
};

  // Función para mostrar/ocultar el código QR
  const toggleQR = () => {
    setMostrarQR(!mostrarQR);
  };

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        if (!slug) {
          console.warn("⚠️ No se recibió un slug válido para buscar el perfil.");
          return;
        }

        const response = await axios.get(`http://localhost:5000/personas/${slug}`);

        if (!response.data.persona || !response.data.empresa) {
          throw new Error(response.data.error || "No se encontraron datos para este perfil");  
        }

        setPersona(response.data.persona);
        setEmpresa(response.data.empresa);

      } catch (err) {
        console.error("Error al obtener perfil:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerPerfil();
  }, [slug]);

  if (loading) return <Spin tip="Cargando datos..." size="large" />;

  if (error) return <div className="error-message">Error: {error}</div>;

  if (!persona && !empresa) return <p>No se encontró el perfil.</p>;

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
      <div className="cliente-header" style={{ backgroundColor: colorPrimario, position: "relative" }}>
        <h2 className="cliente-titulo">{empresa.razon_social}</h2>
        <img
          src={link_foto}
          alt={nombre}
          style={{ border: `4px solid ${colorPrimario}` }}
        />
      </div>

      <div className="cliente-info">
        <h4 style={{ color: colorPrimario }}>{nombre}</h4>
        <hr style={{ backgroundColor: colorPrimario }} />
        <h5><strong>{cargo}</strong></h5>

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

          <a
          href={`http://localhost:5000/contacto/${slug}.vcf`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="social-icon-box">
            <img
              src={require('../../assets/img/descarga.png')}
              alt="Icono Descargar"
              className="iphone"
            />
            <span className="icon-label"><strong>Contacto</strong></span>    
          </div>
        </a>

          {/* Botón de Compartir Wp modificado */}
          <div className="social-icon-box" onClick={handleWhatsAppShare} style={{ cursor: 'pointer' }}>
            <img
              src={require("../../assets/img/compartir2.png")}
              alt="Icono Compartir"
              className="iphone"
            />
            <span className="icon-label">
              <strong>Compartir Wp</strong>
            </span>
          </div>
          
          {/* Botón de Compartir QR - Ahora con funcionalidad para mostrar/ocultar QR */}
          <div className="social-icon-box" onClick={toggleQR} style={{ cursor: 'pointer' }}>
            <img src={require('../../assets/img/compartir.png')} alt="Icono Compartir" className="iphone" />
            <span className="icon-label"><strong>Compartir QR</strong></span>
          </div>
        </div>
      </div>

      {/* 📱 QR de contacto - Solo visible cuando mostrarQR es true */}
      {mostrarQR && (
        <section className="seccion-codigo-qr">
          <div className="cliente-inf">
            <div className="social-redes">
              <div className="cuadrado-con-borde-int">
                <div 
                  className="borde-interno-rojo" 
                  style={{ border: `3px solid ${colorPrimario}` }}
                >
                  <img
                    src={require('../../assets/img/CODIGO QR.jpg')}
                    alt="QR de contacto"
                    className="tarjeta-qr-imagen"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Cliente;







