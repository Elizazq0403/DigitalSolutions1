import "./Cliente.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const Cliente = ({ slug, colorPrimario }) => {
  console.log("📌 Slug recibido en Cliente:", slug);

  // 🔽 TODAS LAS URLs SEGÚN ENTORNO
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
  
  
  // 🔽 URLs de las imágenes
  const llamarIcon = `${baseUrl}/img/icono_llamar.png`;
  const emailIcon = `${baseUrl}/img/email.png`;
  const whatsappIcon = `${baseUrl}/img/whatsapp.png`;
  const descargaContact = `${baseUrl}/img/descarga-ok.png`;
  const compartirIcon = `${baseUrl}/img/compartir.png`;
  const compartir2Icon = `${baseUrl}/img/compartir2.png`;

  console.log("🔧 Variables de entorno:");
  console.log("📁 Base URL:", baseUrl);
  console.log("🔌 API Base URL:", apiBaseUrl);
  console.log("📡 API URL:", apiUrl);
  console.log("🖼️ Ruta llamarIcon:", llamarIcon);

  const [persona, setPersona] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [error, setError] = useState(null);
  const [mostrarQR, setMostrarQR] = useState(false);

  // 🔽 Referencia para hacer scroll al QR
  const qrRef = useRef(null);

  // Función para obtener URL de API completa
  const getApiUrl = (endpoint) => {
    // Asegura que el endpoint empiece con /
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${apiBaseUrl}${path}`;
  };

  // Función para compartir en WhatsApp (tarjeta)
  const handleWhatsAppShare = () => {
    if (!empresa) return;

    const message = `Hola somos ${empresa.razon_social}. Te comparto nuestra tarjeta digital ${baseUrl}/#/cliente/${slug}/perfil`;

    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // Función WhatsApp "Hecho por..."
  const handleWhatsApp = () => {
    const message =
      "Hola WEB-Z Soluciones Digitales, estoy interesad@ en una tarjeta de presentación digital.";

    window.open(
      `https://api.whatsapp.com/send?phone=+573216921887&text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  // Mostrar / ocultar QR
  const toggleQR = () => {
    setMostrarQR((prev) => !prev);
  };

  // 🔽 Scroll automático cuando el QR aparece
  useEffect(() => {
    if (mostrarQR && qrRef.current) {
      qrRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [mostrarQR]);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        if (!slug) return;

        console.log("🌐 Solicitando perfil desde:", getApiUrl(`/personas/${slug}`));
        
        const response = await axios.get(getApiUrl(`/personas/${slug}`));

        console.log("✅ Respuesta API:", response.data);

        if (!response.data.persona || !response.data.empresa) {
          throw new Error("No se encontraron datos para este perfil");
        }

        setPersona(response.data.persona);
        setEmpresa(response.data.empresa);
      } catch (err) {
        console.error("❌ Error al obtener perfil:", err);
        setError(err.message || "Error desconocido");
      }
    };

    obtenerPerfil();
  }, [slug]);

  // Función para descargar VCF
  const getVcfUrl = () => {
    return getApiUrl(`/contacto/${slug}.vcf`);
  };

  // ✅ ELIMINADO: Los mensajes de error y loading que se mostraban en el frontend
  // if (error) { ... }
  // if (!persona || !empresa) { ... }

  // Ahora directamente continuamos, pero si no hay datos, no renderizamos nada
  if (!persona || !empresa) {
    return null; // No muestra nada mientras carga
  }

  const {
    nombre,
    cargo,
    celular,
    correo_electronico,
    link_whatsapp,
    link_foto,
  } = persona;

  const { link_qr, razon_social } = empresa;

  return (
    <div className="cliente-card">
      {/* HEADER */}
      <div
        className="cliente-header"
        style={{ backgroundColor: colorPrimario }}
      >
        <h2 className="cliente-titulo marquee">
          ¡Bienvenido a D-Card, tu tarjeta digital!
        </h2>

        <img
          src={link_foto}
          alt={nombre}
          className="cliente-foto"
          style={{ border: `4px solid ${colorPrimario}` }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `${baseUrl}/img/avatar-default.png`;
          }}
        />
      </div>

      {/* INFO */}
      <div className="cliente-info">
        <h4 style={{ color: colorPrimario }}>{nombre}</h4>
        <h5>
          <strong>{cargo}</strong>
        </h5>


        <div className="social-links">
          {/* Llamar */}
          <a href={`tel:${celular}`}>
            <div className="social-icon-box">
              <img
                src={llamarIcon}
                alt="Llamar"
                className="iphone"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `${baseUrl}/img/icono-default.png`;
                }}
              />
              <span className="icon-label">
                <strong>Llamar</strong>
              </span>
            </div>
          </a>

          {/* Correo */}
          <a href={`mailto:${correo_electronico}`}>
            <div className="social-icon-box">
              <img
                src={emailIcon}
                alt="Correo"
                className="iphone"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `${baseUrl}/img/icono-default.png`;
                }}
              />
              <span className="icon-label">
                <strong>Correo</strong>
              </span>
            </div>
          </a>

          {/* WhatsApp */}
          <a href={link_whatsapp} target="_blank" rel="noopener noreferrer">
            <div className="social-icon-box">
              <img
                src={whatsappIcon}
                alt="WhatsApp"
                className="iphone"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `${baseUrl}/img/icono-default.png`;
                }}
              />
              <span className="icon-label">
                <strong>WhatsApp</strong>
              </span>
            </div>
          </a>

          {/* Descargar contacto */}
          
            <a href={getVcfUrl()} target="_blank" rel="noopener noreferrer">
            <div className="social-icon-box">
              <img
                src={descargaContact}
                alt="Contacto"
                className="iphone"
                onError={(e) => {
                  e.target.onerror = null;
                  //e.target.src = `${baseUrl}/img/icono-default.png`;
                }}
              />
              <span className="icon-label">
                <strong>Contacto</strong>
              </span>
            </div>
          </a>

          {/* Compartir WhatsApp */}
          <div
            className="social-icon-box"
            onClick={handleWhatsAppShare}
            style={{ cursor: "pointer" }}
          >
            <img
              src={compartir2Icon}
              alt="Compartir"
              className="iphone"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${baseUrl}/img/icono-default.png`;
              }}
            />
            <span className="icon-label">
              <strong>Compartir Wp</strong>
            </span>
          </div>

          {/* Compartir QR */}
          <div
            className="social-icon-box"
            onClick={toggleQR}
            style={{ cursor: "pointer" }}
          >
            <img
              src={compartirIcon}
              alt="QR"
              className="iphone"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${baseUrl}/img/icono-default.png`;
              }}
            />
            <span className="icon-label">
              <strong>Escanear QR</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 🔽 SECCIÓN QR */}
      {mostrarQR && (
        <section className="seccion-codigo-qr" ref={qrRef}>
          <div className="cliente-inf">
            <div className="social-redes">
              <div className="cuadrado-con-borde-int">
                <div
                  className="borde-interno-rojo"
                  style={{ border: `3px solid ${colorPrimario}` }}
                >
                  <img
                    src={link_qr}
                    alt="QR de contacto"
                    className="tarjeta-qr-imagen"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${baseUrl}/img/icono-default.png`;
                    }}
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









