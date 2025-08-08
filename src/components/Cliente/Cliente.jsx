import "./Cliente.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Cliente = (props) => {

  //const { puesto, foto, equipo, id, fav } = props.datos;
  const { colorPrimario } = props;

  const slug = "asher-adriana-giraldo"; // 🔥 URL quemada (ignora useParams)
  //const {slug} = useParams();


  const [persona, setPersona] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerPersona = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/personas/slug/${slug}`);
        setPersona(response.data);
      } catch (error) {
        console.error("Error al obtener persona:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerPersona();
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (!persona) return <p>No se encontró la persona.</p>;

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
      {/* Encabezado */}
      <div className="cliente-header" style={{ backgroundColor: colorPrimario, position: "relative" }}>
        <h2 className="cliente-titulo">Asher Industriales</h2>
        <img
          src={link_foto}
          alt={nombre}
          style={{ border: `4px solid ${colorPrimario}` }}
        />
      </div>

      {/* Información */}
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
          <a href="https://www.hotmail.com" target="_blank" rel="noopener noreferrer">
                        <div className="social-icon-box">
                            <img 
                                src={require('../../assets/img/descarga.png')} 
                                alt="Icono Descargar" 
                                className="iphone" 
                            />
                            <span className="icon-label"><strong>Contacto</strong></span>    
                        </div>
                    </a>
                    <a 
                        href="https://api.whatsapp.com/send?text=https://elizazq0403.github.io/DigitalSolutions1/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        >
                        <div className="social-icon-box">
                            <img 
                            src={require('../../assets/img/compartir2.png')} 
                            alt="Icono Compartir" 
                            className="iphone" 
                            />
                            <span className="icon-label"><strong>Compartir Wp</strong></span>
                        </div>
                        </a>

                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <div className="social-icon-box">
                            <img 
                                src={require('../../assets/img/compartir.png')} 
                                alt="Icono Compartir" 
                                className="iphone" 
                            />
                            <span className="icon-label"><strong>Compartir QR</strong></span>
                        </div>
                    </a>
        </div>
      </div>


      {/* QR */}
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



