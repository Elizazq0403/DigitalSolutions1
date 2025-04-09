import "./Contacto.css";
import hexToRgba from "hex-to-rgba";
import fotoProductos from "../../assets/img/ubicacion.png";

const Contacto = ({ datos, colaboradores }) => {
  console.log("Props recibidos:", datos);

  if (!datos) {
    return <div>No se han proporcionado datos</div>;
  }

  const { colorPrimario} = datos;

  const iconData = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Circle-icons-mail.svg",
      alt: "Email Icon",
      text: "/ elizazq@hotmail.com",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Circle-icons-mail.svg",
      alt: "Location Icon",
      text: "/ Cra 49 calle 144 sur 29",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Mobile_phone_%2889516%29_-_The_Noun_Project.svg",
      alt: "Phone Icon",
      text: "/ 300 860 07 40",
    },
  ];

  return (
    <section className="equipo">
      <div className="cliente-card">
        {/* Encabezado con imagen */}
        <div className="cliente-header" style={{ backgroundColor: colorPrimario, position: "relative" }}>
          <h2 className="cliente-titulo">Datos de Contacto</h2>
          <img src={fotoProductos} alt="Ubicación"style={{ border: `4px solid ${colorPrimario}` }} />
        </div>

        {/* Información del contacto principal */}
        <div className="cliente-info">
          <div>
          {colaboradores.map((colaborador) => (
              <div key={colaborador.id} className="colaborador-card">
                <h4 style={{ color: colorPrimario }}>{colaborador.nombre}</h4>
                
                <h5><strong>{colaborador.puesto}</strong></h5>
              </div>
            ))}
          </div>
          <div>
            <div className="contacto">
              <h5 style={{ fontSize: 50 }}><strong>Síguenos:</strong></h5>
            </div>
          </div>
          {/* Redes sociales */}
          <div className="social-redes">
            <a href="tel:+573008600740">
              <div className="social-icon-normal">
                <img src={require("../../assets/img/facebook.png")} alt="Icono facebook" className="iphone" />
              </div>
            </a>
            <a href="https://wa.me/573044698664" target="_blank" rel="noopener noreferrer">
              <div className="social-icon-normal">
                <img src={require("../../assets/img/instagram.png")} alt="Icono instagram" className="iphone" />
              </div>
            </a>
            <a href="https://www.hotmail.com" target="_blank" rel="noopener noreferrer">
              <div className="social-icon-normal">
                <img src={require("../../assets/img/icono internet.png")} alt="Icono internet" className="iphone" />
              </div>
            </a>
          </div>

          {/* Datos de contacto */}
          <div className="social-redes">
            <div className="cuadrado-con-borde-interno">
            <div className="borde-interno-rojo" style={{ border: `3px solid ${colorPrimario}` }}>
                <div className="iconos">
                  {iconData.map((item, index) => (
                    <div className="facebook-username" key={index}>
                      <div className="icon">
                        <img src={item.src} alt={item.alt} />
                      </div>
                      <div className="username-text">{item.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="cliente-inf">
        <div className="social-redes">
                <div className="cuadrado-con-borde-int">
                  <div className="borde-interno-rojo" style={{ border: `3px solid ${colorPrimario}` }}>
                        <iframe
                            title="Google Maps"
                            className="google-maps"
                            width="300%"
                            height="300%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.3732328504957!2d-75.63583762435954!3d6.080307293905855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e46870ca763c9e3%3A0xf1b38a9819d4b64b!2sWEB-Z%20Soluciones%20Digitales!5e0!3m2!1ses!2sco!4v1741743443486!5m2!1ses!2sco"
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

