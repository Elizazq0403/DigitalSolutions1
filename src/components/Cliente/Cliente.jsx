import "./Cliente.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { getApiUrl } from "../../../src/api/config";

// 🔽 🔽 🔽 **CAMBIAR TODAS ESTAS RUTAS** 🔽 🔽 🔽
// De: '../assets/img/...' 
// A: '../../assets/img/...'
import llamarIcon from '../../assets/img/icono_llamar.png';
import emailIcon from '../../assets/img/email.png';
import whatsappIcon from '../../assets/img/whatsapp.png';
import descargaIcon from '../../assets/img/descarga.png';
import compartir2Icon from '../../assets/img/compartir2.png';
import compartirIcon from '../../assets/img/compartir.png';

const Cliente = ({ slug, colorPrimario }) => {
  console.log("📌 Slug recibido en Cliente:", slug);

  const [persona, setPersona] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [error, setError] = useState(null);
  const [mostrarQR, setMostrarQR] = useState(false);

  // 🔽 Referencia para hacer scroll al QR
  const qrRef = useRef(null);

  // Función para compartir en WhatsApp (tarjeta)
  const handleWhatsAppShare = () => {
    if (!empresa) return;

    const message = `Hola somos ${empresa.razon_social}. Te comparto nuestra tarjeta digital https://elizazq0403.github.io/DigitalSolutions1/#/cliente/${slug}/perfil`;

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

        const response = await axios.get(getApiUrl(`/personas/${slug}`));

        if (!response.data.persona || !response.data.empresa) {
          throw new Error("No se encontraron datos para este perfil");
        }

        setPersona(response.data.persona);
        setEmpresa(response.data.empresa);
      } catch (err) {
        console.error("Error al obtener perfil:", err);
        setError(err.message);
      }
    };

    obtenerPerfil();
  }, [slug]);

  if (!persona || !empresa) return null;

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
          {/*¡Bienvenid@, {razon_social}!*/}
          ¡Bienvenido a D-Card, tu tarjeta digital!
        </h2>

        <img
          src={link_foto}
          alt={nombre}
          style={{ border: `4px solid ${colorPrimario}` }}
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
              />
              <span className="icon-label">
                <strong>WhatsApp</strong>
              </span>
            </div>
          </a>

          {/* Descargar contacto */}
          <a
            href={getApiUrl(`/contacto/${slug}.vcf`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="social-icon-box">
              <img
                src={descargaIcon}
                alt="Contacto"
                className="iphone"
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









