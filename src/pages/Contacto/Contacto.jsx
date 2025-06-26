import "./Contacto.css";
import hexToRgba from "hex-to-rgba";
import fotoProductos from "../../assets/img/Contacto_3D.png";
import correo from "../../assets/img/correo ok.png";
import llamar from "../../assets/img/llamar ok.png";
import ubicacion from "../../assets/img/ubicacion ok.png";

const Contacto = ({ datos, colaboradores }) => {
  console.log("Props recibidos:", datos);

  if (!datos) {
    return <div>No se han proporcionado datos</div>;
  }

  const { colorPrimario} = datos;

  const iconData = [
    {
      src: correo,
      alt: "Email Icon",
      text: "/ elizazq@hotmail.com",
    },
    {
      src: ubicacion,
      alt: "Location Icon",
      text: "/ Cra 49 calle 144 sur 29",
    },
    {
      src: llamar,
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
                <h4 style={{ color: colorPrimario }}>{colaborador.empresa}</h4>
                
                <h5><strong>{colaborador.nit}</strong></h5>
              </div>
            ))}
          </div>
          <div>
            <div className="contacto-fuente">
              <h5 style={{ fontSize: 50 }}><strong>Síguenos</strong></h5>
            </div>
          </div>
          {/* Redes sociales */}
          <div className="social-redes">
            <a href="https://www.facebook.com/profile.php?id=100028578147179">
              <div className="social-icon-normal">
                <img src={require("../../assets/img/facebook.png")} alt="Icono facebook" className="iphone" />
              </div>
            </a>
            <a href="https://www.instagram.com/asherindustriales/" target="_blank" rel="noopener noreferrer">
              <div className="social-icon-normal">
                <img src={require("../../assets/img/instagram.png")} alt="Icono instagram" className="iphone" />
              </div>
            </a>
            <a href="https://www.asherindustriales.com" target="_blank" rel="noopener noreferrer">
              <div className="social-icon-normal">
                <img src={require("../../assets/img/icono internet.png")} alt="Icono internet" className="iphone" />
              </div>
            </a>
          </div>
          <div className="contacto-fuente">
              <h5 style={{ fontSize: 50 }}><strong>Visítenos en</strong></h5>
            </div>
          {/* Datos de contacto*/} 
          <div className="social-redes">
            <div className="cuadrado-con-borde-interno">
            <div >
                {/*
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
                */}
                <div className="icono-con-texto">
                  <img src={require("../../assets/img/ubicacion ok.png")} alt="Icono ubicación" className="img-contacto" />
                </div>
                <p className="texto-superpuesto">Carrera 49 Calle 144 Sur 29</p>
                <div className="icono-con-texto">
                  <img src={require("../../assets/img/llamar ok.png")} alt="Icono llamar" className="img-contacto" />
                </div>
                <p className="texto-superpuesto">300 860 07 40</p>
                <div className="icono-con-texto">
                <img src={require("../../assets/img/correo ok.png")} alt="Icono correo" className="img-contacto" />
              </div>
                <p className="texto-superpuesto">elizazq@hotmail.com</p>
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
                            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15867.407608035515!2d-75.62711974193282!3d6.150582551382924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sasher%20industriales%20s.a.s%20ofc%202803%20sabaneta%20antioquia!5e0!3m2!1ses!2sco!"
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

