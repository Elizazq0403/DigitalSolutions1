import "./Contacto.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import fotoProductos from "../../assets/img/Contacto_3D.png";
import correo from "../../assets/img/correo ok.png";
import llamar from "../../assets/img/llamar ok.png";
import ubicacion from "../../assets/img/ubicacion ok.png";
import QuienesSomos from "../../components/QuienesSomos/QuienesSomos"; // ✅ Importa QuienesSomos

const Contacto = ({ slug, colorPrimario, empresaId }) => {
  console.log("✅ Contacto - Props recibidos:", { slug, colorPrimario, empresaId });

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
    id_empresa,
    razon_social,
    nit,
    direccion,
    telefono,
    correo_electronico,
    link_ubicacion_maps,
  } = empresa;

  console.log("📌 id_empresa recibido en Contacto:", id_empresa); // Aquí tienes el id_empresa disponible

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
            alt="Contacto"
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
          <div className="social-redes">
            {link_facebook && (
              <a href={link_facebook} target="_blank" rel="noopener noreferrer">
                <div className="social-icon-normal">
                  <img
                    src={require("../../assets/img/facebook.png")}
                    alt="Facebook"
                    className="iphone"
                  />
                </div>
              </a>
            )}
            {link_instagram && (
              <a href={link_instagram} target="_blank" rel="noopener noreferrer">
                <div className="social-icon-normal">
                  <img
                    src={require("../../assets/img/instagram.png")}
                    alt="Instagram"
                    className="iphone"
                  />
                </div>
              </a>
            )}
            {link_pagina_web && (
              <a href={link_pagina_web} target="_blank" rel="noopener noreferrer">
                <div className="social-icon-normal">
                  <img
                    src={require("../../assets/img/icono internet.png")}
                    alt="Web"
                    className="iphone"
                  />
                </div>
              </a>
            )}
          </div>

          {/* Datos de contacto */}
          <div className="contacto-fuente">
            <h5 style={{ fontSize: 50 }}>
              <strong>Visítenos en</strong>
            </h5>
          </div>

          <div className="social-redes">
            <div className="cuadrado-con-borde-interno">
              <div>
                <div className="icono-con-texto">
                  <img src={ubicacion} alt="Ubicación" className="img-contacto" />
                </div>
                <p className="texto-superpuesto">{direccion}</p>

                <div className="icono-con-texto">
                  <img src={llamar} alt="Teléfono" className="img-contacto" />
                </div>
                <p className="texto-superpuesto">{telefono}</p>

                <div className="icono-con-texto">
                  <img src={correo} alt="Correo" className="img-contacto" />
                </div>
                <p className="texto-superpuesto">{correo_electronico}</p>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          {link_ubicacion_maps && (
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
          )}
        </div>
      </div>
    </section>
  );
};

export default Contacto;




