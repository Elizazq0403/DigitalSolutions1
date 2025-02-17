import "./Contacto.css"
import ListProductos from "../../pages/Productos/ListProductos";
import hexToRgba from 'hex-to-rgba';
import fotoProductos from "../../assets/img/ubicacion.png"


const Servicios = (props) => {
  if (!props.datos) {
    return <div>No se han proporcionado datos</div>;
  }

  const { colorPrimario, nombre, puesto } = props.datos;
  

  const obj = {
    //backgroundColor: hexToRgba(colorPrimario, 0.6)
  };

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
    <section className="equipo" style={obj}>
        <div className="cliente-card ">
        <div className="cliente-header" style={{ backgroundColor: colorPrimario, position: "relative" }}>
                <h2 className="cliente-titulo">Datos de Contacto</h2>
                <img src={fotoProductos} alt={nombre} />
            </div>
            <div className="cliente-info">
                    <div>
                    <h4>{nombre}</h4>
                    <h5><strong>{puesto}</strong></h5>
                    </div>
                <div className="social-redes">
                    <a href="https://www.facebook.com/profile.php?id=100067087870686">
                    <div className="social-icon-box">
                        <img 
                            src={require('../../assets/img/facebook.png')} 
                            alt="Icono facebook" 
                            className="iphone"
                        />
                    </div>                    
                    </a>
                    <a href="https://www.instagram.com/eliza.bethzq/" target="_blank" rel="noopener noreferrer">
                        <div className="social-icon-box">
                            <img 
                                src={require('../../assets/img/instagram.png')} 
                                alt="Icono instagram" 
                                className="iphone" 
                            />
                        </div>
                    </a>

                    <a href="https://elizazq0403.github.io/Curriculo-Vitae/" target="_blank" rel="noopener noreferrer">
                        <div className="social-icon-box">
                            <img 
                                src={require('../../assets/img/icono internet.png')} 
                                alt="Icono internet" 
                                className="iphone" 
                            />
                        </div>
                    </a>
                </div>
                <div className="social-redes">
                    <div class="cuadrado-con-borde-interno">
                        <div class="borde-interno-rojo">
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
                <div>
                    
            </div>   
            </div>
               
        </div>
    </section>
  );
};

export default Servicios;