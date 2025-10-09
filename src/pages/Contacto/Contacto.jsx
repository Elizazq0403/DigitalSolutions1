import "./Contacto.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import fotoProductos from "../../assets/img/Contacto_3D.png";
import IconoContacto from "../../components/ButtonContacto/IconoContacto";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineAttachEmail, MdPhoneIphone} from "react-icons/md";
import SocialIcon from "../../components/SocialIcon/SocialIcon";
import { FaFacebookF, FaInstagram, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

const Contacto = ({ slug, colorPrimario }) => {
  console.log("📌 Slug recibido en Contacto:", slug);

  const [persona, setPersona] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        if (!slug) {
          console.warn("⚠️ No se recibió un slug válido para buscar el perfil.");
          return;
        }

        // 🔹 Llamamos al endpoint unificado
        const response = await axios.get(`http://localhost:5000/personas/${slug}`);

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

  // ✅ Variables de empresa
  const {
    razon_social,
    nit,
    direccion,
    telefono,
    correo_electronico,
    link_ubicacion_maps,
  } = empresa;

  // ✅ Variables de persona
  const { link_facebook, link_instagram, link_pagina_web } = persona;

  return (
    <section className="equipo">
      <div className="cliente-card">
        {/* Encabezado */}
        <div
          className="cliente-header"
          style={{ backgroundColor: colorPrimario, position: "relative" }}
        >
          <h2 className="cliente-titulo">Datos de Contacto</h2>
          <img
            src={fotoProductos}
            alt="Ubicación"
            style={{ border: `4px solid ${colorPrimario}` }}
          />
        </div>

        {/* Info Empresa */}
        <div className="cliente-info">
          <div className="colaborador-card">
            <h4 style={{ color: colorPrimario }}>{razon_social}</h4>
            <h5>
              <strong>{nit}</strong>
            </h5>
          </div>

          {/* Redes sociales */}
          <div>
            <div className="contacto-fuente">
              <h5 style={{ fontSize: 50 }}>
                <strong>Síguenos</strong>
              </h5>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
      <SocialIcon
        icon={<FaFacebookF />}
        color={colorPrimario}
        link={link_facebook}
        tooltip="Facebook"
      />
      <SocialIcon
        icon={<FaGlobe />}
        color={colorPrimario}
        link={link_pagina_web}  
        tooltip="Web"
      />
      <SocialIcon
        icon={<FaInstagram />}
        color={colorPrimario}
        link={link_instagram}
        tooltip="Instagram"
      />
      <SocialIcon
        icon={<FaMapMarkerAlt />}
        color={colorPrimario}
        link={link_instagram}
        tooltip="Maps"
      />
    </div>

          {/* Datos de contacto */}
          <div className="contacto-fuente">
            <h5 style={{ fontSize: 50 }}>
              <strong>Visítenos en</strong>
            </h5>
          </div>

          <div className="contacto-container">
              <IconoContacto
                icono={<FaMapLocationDot color="#fff" size={22} />}
                texto={direccion}
                color={colorPrimario}
              />
              <IconoContacto
                icono={<MdPhoneIphone color="#fff" size={22} />}
                texto={telefono}
                color={colorPrimario}
              />
              <IconoContacto
                icono={<MdOutlineAttachEmail color="#fff" size={22} />}
                texto={correo_electronico}
                color={colorPrimario}
              />
            </div>


          {/* Google Maps */}
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
                    width="300%"
                    height="300%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={link_ubicacion_maps}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;




