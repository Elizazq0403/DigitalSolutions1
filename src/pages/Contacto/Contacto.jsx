import "./Contacto.css";
import hexToRgba from "hex-to-rgba";
import fotoProductos from "../../assets/img/ubicacion.png";

const Contacto = ({ datos, colaboradores }) => {
  console.log("Props recibidos:", datos);

  if (!datos) {
    return <div>No se han proporcionado datos</div>;
  }

  const { colorPrimario, nombre, puesto } = datos;

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
          <img src={fotoProductos} alt="Ubicación" />
        </div>

        {/* Información del contacto principal */}
        <div className="cliente-info">
          <div>
          {colaboradores.map((colaborador) => (
              <div key={colaborador.id} className="colaborador-card">
                <h4>{colaborador.nombre}</h4>
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
              <div className="social-icon-box">
                <img src={require("../../assets/img/facebook.png")} alt="Icono facebook" className="iphone" />
              </div>
            </a>
            <a href="https://wa.me/573044698664" target="_blank" rel="noopener noreferrer">
              <div className="social-icon-box">
                <img src={require("../../assets/img/instagram.png")} alt="Icono instagram" className="iphone" />
              </div>
            </a>
            <a href="https://www.hotmail.com" target="_blank" rel="noopener noreferrer">
              <div className="social-icon-box">
                <img src={require("../../assets/img/icono internet.png")} alt="Icono internet" className="iphone" />
              </div>
            </a>
          </div>

          {/* Datos de contacto */}
          <div className="social-redes">
            <div className="cuadrado-con-borde-interno">
              <div className="borde-interno-rojo">
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
                        <div className="borde-interno-rojo">
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
      </div>
    </section>
  );
};

export default Contacto;

