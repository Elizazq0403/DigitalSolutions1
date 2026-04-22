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
  const [persona, setPersona] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarMapa, setMostrarMapa] = useState(false);
  
  const [hoverStates, setHoverStates] = useState({
    facebook: false,
    web: false,
    instagram: false,
    maps: false,
    direccion: false,
    telefono: false,
    correo: false,
  });

  const mapaRef = useRef(null);
  const link_logo = datos?.link_logo || fotoProductos;

  const toggleMapa = () => setMostrarMapa((prev) => !prev);

  // --- LÓGICA DE SCROLL AUTOMÁTICO ---
  useEffect(() => {
    if (mostrarMapa && mapaRef.current) {
      // Usamos un pequeño delay para asegurar que el componente ya se renderizó en el DOM
      setTimeout(() => {
        mapaRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [mostrarMapa]); // Se ejecuta cada vez que cambia el estado del mapa

  useEffect(() => {
    let isMounted = true;
    const ejecutarSecuencia = async () => {
      if (loading || !persona || !empresa) return;

      const keys = ["facebook", "web", "instagram", "maps", "direccion", "telefono", "correo"];
      await new Promise(resolve => setTimeout(resolve, 1000));

      for (const key of keys) {
        if (!isMounted) return;
        setHoverStates(prev => ({ ...prev, [key]: true }));
        await new Promise(resolve => setTimeout(resolve, 900)); 
        if (!isMounted) return;
        setHoverStates(prev => ({ ...prev, [key]: false }));
        await new Promise(resolve => setTimeout(resolve, 150)); 
      }
    };
    ejecutarSecuencia();
    return () => { isMounted = false; };
  }, [loading, persona, empresa]);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        if (!slug) return;
        const response = await axios.get(getApiUrl(`/personas/${slug}`));
        setPersona(response.data.persona);
        setEmpresa(response.data.empresa);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    obtenerPerfil();
  }, [slug]);

  if (loading) return <Spin tip="Cargando..." size="large" />;
  if (error) return <div className="error-message">Error: {error}</div>;

  const { razon_social, nit, direccion, telefono, correo_electronico, link_ubicacion_maps } = empresa;
  const { link_facebook, link_instagram, link_pagina_web } = persona;

  return (
    <section className="equipo-contacto">
      <div className="cliente-card">
        <div className="cliente-header" style={{ backgroundColor: colorPrimario }}>
          <h2 className="cliente-titulo" style={{ color: colorSecundario }}>Datos de Contacto</h2>
          <img src={link_logo} alt="Logo" style={{ border: `4px solid ${colorSecundario}` }} />
        </div>

        <div className="cliente-info">
          <div className="colaborador-card">
            <h4 style={{ color: colorPrimario }}>{razon_social}</h4>
            <h5><strong>{nit}</strong></h5>
          </div>

          <div className="contacto-fuente">
            <h5 style={{ fontSize: "1.5rem" }}><strong>Contáctenos en:</strong></h5>
          </div>

          <div className="social-icons-row">
            {[
              { key: "facebook", icon: <FaFacebookF />, link: link_facebook, tool: "Facebook" },
              { key: "web", icon: <FaGlobe />, link: link_pagina_web, tool: "Web" },
              { key: "instagram", icon: <FaInstagram />, link: link_instagram, tool: "Instagram" },
              { key: "maps", icon: <FaMapMarkerAlt />, onClick: toggleMapa, tool: "Maps" }
            ].map((item) => (
              <div 
                key={item.key} 
                className={`social-hover-wrapper ${hoverStates[item.key] ? "auto-hover" : ""}`}
              >
                <SocialIcon
                  icon={item.icon}
                  color={colorPrimario}
                  link={item.link}
                  onClick={item.onClick}
                  tooltip={item.tool}
                  visible={hoverStates[item.key]} 
                />
              </div>
            ))}
          </div>

          <div className="contacto-container">
            <div className={`contacto-hover-wrapper ${hoverStates.direccion ? "auto-hover" : ""}`}>
              <IconoContacto icono={<FaMapLocationDot color="#fff" size={22} />} texto={direccion} color={colorPrimario} />
            </div>
            <div className={`contacto-hover-wrapper ${hoverStates.telefono ? "auto-hover" : ""}`}>
              <IconoContacto icono={<MdPhoneIphone color="#fff" size={22} />} texto={telefono} color={colorPrimario} />
            </div>
            <div className={`contacto-hover-wrapper ${hoverStates.correo ? "auto-hover" : ""}`}>
              <IconoContacto icono={<MdOutlineAttachEmail color="#fff" size={22} />} texto={correo_electronico} color={colorPrimario} />
            </div>
          </div>

          {mostrarMapa && (
            <section className="seccion-codigo-qr-" ref={mapaRef}>
              <div className="cliente-inf">
                <div className="social-redes">
                  <div className="cuadrado-con-borde-int">
                    <div className="borde-interno-rojo" style={{ border: `3px solid ${colorPrimario}` }}>
                      <iframe
                        title="Google Maps"
                        className="google-maps"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
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





