import "./Contacto.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Spin } from "antd";
import fotoProductos from "../../assets/img/Contacto_3D.png";
import IconoContacto from "../../components/ButtonContacto/IconoContacto";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineAttachEmail, MdPhoneIphone } from "react-icons/md";
import SocialIcon from "../../components/SocialIcon/SocialIcon";
import { FaFacebookF, FaInstagram, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import { getApiUrl } from "../../../src/api/config.js";

const Contacto = ({ slug, colorPrimario, colorSecundario, datos }) => {
  console.log("📌 Slug recibido en Contacto:", slug);
  console.log("📌 Datos recibidos en Contacto:", datos);
  console.log("📌 link_logo desde datos:", datos?.link_logo);

  const [persona, setPersona] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarMapa, setMostrarMapa] = useState(false);
  
  // Estados para controlar el hover automático
  const [hoverStates, setHoverStates] = useState({
    facebook: false,
    web: false,
    instagram: false,
    maps: false,
    direccion: false,
    telefono: false,
    correo: false,
  });

  // 🔽 Ref para scroll al mapa
  const mapaRef = useRef(null);

  // Referencias para los elementos
  const facebookRef = useRef(null);
  const webRef = useRef(null);
  const instagramRef = useRef(null);
  const mapsRef = useRef(null);
  const direccionRef = useRef(null);
  const telefonoRef = useRef(null);
  const correoRef = useRef(null);

  // Extraer link_logo de datos (si no existe, usar fotoProductos)
  const link_logo = datos?.link_logo || fotoProductos;

  // Mostrar / ocultar Google Maps
  const toggleMapa = () => {
    setMostrarMapa((prev) => !prev);
  };

  // 🔽 Scroll automático cuando el mapa aparece
  useEffect(() => {
    if (mostrarMapa && mapaRef.current) {
      mapaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [mostrarMapa]);

  // 🔽 FUNCIÓN PARA ACTIVAR HOVER AUTOMÁTICO SECUENCIAL
  useEffect(() => {
    if (!loading && persona && empresa) {
      // Lista de keys en orden: Facebook, Web, Instagram, Maps, Dirección, Teléfono, Correo
      const keys = [
        "facebook",
        "web",
        "instagram",
        "maps",
        "direccion",
        "telefono",
        "correo",
      ];
      
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex >= keys.length) {
          clearInterval(interval);
          // Opcional: resetear todos los estados después de terminar
          setTimeout(() => {
            setHoverStates({
              facebook: false,
              web: false,
              instagram: false,
              maps: false,
              direccion: false,
              telefono: false,
              correo: false,
            });
          }, 500);
          return;
        }

        const currentKey = keys[currentIndex];
        
        // Activar hover del elemento actual
        setHoverStates((prev) => ({ ...prev, [currentKey]: true }));
        
        // Desactivar hover después de 800ms (para que se vea la animación)
        setTimeout(() => {
          setHoverStates((prev) => ({ ...prev, [currentKey]: false }));
        }, 800);

        currentIndex++;
      }, 1000); // 1 segundo entre cada icono

      return () => clearInterval(interval);
    }
  }, [loading, persona, empresa]);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        if (!slug) return;

        const response = await axios.get(getApiUrl(`/personas/${slug}`));

        if (!response.data.persona || !response.data.empresa) {
          throw new Error(
            response.data.error || "No se encontraron datos para este perfil"
          );
        }

        setPersona(response.data.persona);
        setEmpresa(response.data.empresa);
      } catch (err) {
        console.error("❌ Error al obtener perfil:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerPerfil();
  }, [slug]);

  // 🌀 Loader
  if (loading) return <Spin tip="Cargando datos..." size="large" />;

  // ❌ Error
  if (error) return <div className="error-message">Error: {error}</div>;

  if (!persona && !empresa) return <p>No se encontró el perfil.</p>;

  // Empresa
  const {
    razon_social,
    nit,
    direccion,
    telefono,
    correo_electronico,
    link_ubicacion_maps,
  } = empresa;

  // Persona
  const { link_facebook, link_instagram, link_pagina_web } = persona;

  return (
    <section className="equipo-contacto">
      <div className="cliente-card">
        {/* HEADER */}
        <div
          className="cliente-header"
          style={{ backgroundColor: colorPrimario, position: "relative" }}
        >
          <h2 
            className="cliente-titulo"
            style={{ color: colorSecundario }}
          >
            Datos de Contacto
          </h2>
          <img
            src={link_logo}
            alt={datos?.nombre || "Logo de la empresa"}
            style={{ border: `4px solid ${colorSecundario}` }}
            onError={(e) => {
              console.error("❌ Error cargando logo:", link_logo);
              e.target.src = fotoProductos;
            }}
          />
        </div>

        {/* INFO */}
        <div className="cliente-info">
          <div className="colaborador-card">
            <h4 style={{ color: colorPrimario }}>{razon_social}</h4>
            <h5>
              <strong>{nit}</strong>
            </h5>
          </div>

          <div className="contacto-fuente">
            <h5 style={{ fontSize: 50 }}>
              <strong>Contáctenos en:</strong>
            </h5>
          </div>

          {/* REDES SOCIALES */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              ref={facebookRef}
              className={`social-hover-wrapper ${hoverStates.facebook ? "auto-hover" : ""}`}
            >
              <SocialIcon
                icon={<FaFacebookF />}
                color={colorPrimario}
                link={link_facebook}
                tooltip="Facebook"
              />
            </div>
            <div
              ref={webRef}
              className={`social-hover-wrapper ${hoverStates.web ? "auto-hover" : ""}`}
            >
              <SocialIcon
                icon={<FaGlobe />}
                color={colorPrimario}
                link={link_pagina_web}
                tooltip="Web"
              />
            </div>
            <div
              ref={instagramRef}
              className={`social-hover-wrapper ${hoverStates.instagram ? "auto-hover" : ""}`}
            >
              <SocialIcon
                icon={<FaInstagram />}
                color={colorPrimario}
                link={link_instagram}
                tooltip="Instagram"
              />
            </div>
            <div
              ref={mapsRef}
              className={`social-hover-wrapper ${hoverStates.maps ? "auto-hover" : ""}`}
            >
              <SocialIcon
                icon={<FaMapMarkerAlt />}
                color={colorPrimario}
                onClick={toggleMapa}
                tooltip="Maps"
              />
            </div>
          </div>

          {/* DATOS DE CONTACTO */}
          <div className="contacto-container">
            <div
              ref={direccionRef}
              className={`contacto-hover-wrapper ${hoverStates.direccion ? "auto-hover" : ""}`}
            >
              <IconoContacto
                icono={<FaMapLocationDot color="#fff" size={22} />}
                texto={direccion}
                color={colorPrimario}
              />
            </div>
            <div
              ref={telefonoRef}
              className={`contacto-hover-wrapper ${hoverStates.telefono ? "auto-hover" : ""}`}
            >
              <IconoContacto
                icono={<MdPhoneIphone color="#fff" size={22} />}
                texto={telefono}
                color={colorPrimario}
              />
            </div>
            <div
              ref={correoRef}
              className={`contacto-hover-wrapper ${hoverStates.correo ? "auto-hover" : ""}`}
            >
              <IconoContacto
                icono={<MdOutlineAttachEmail color="#fff" size={22} />}
                texto={correo_electronico}
                color={colorPrimario}
              />
            </div>
          </div>

          {/* 🔽 GOOGLE MAPS */}
          {mostrarMapa && (
            <section className="seccion-codigo-qr-" ref={mapaRef}>
              <div className="cliente-inf">
                <div className="social-redes">
                  <div className="cuadrado-con-borde-int">
                    <div
                      className="borde-interno-rojo"
                      style={{ border: `3px solid ${colorPrimario}` }}
                    >
                      <iframe
                        title="Google Maps"
                        className="google-maps"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={link_ubicacion_maps}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contacto;





