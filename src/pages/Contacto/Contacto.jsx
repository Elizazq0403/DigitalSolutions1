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

  return (
    <section className="equipo" style={obj}>
        <div className="cliente-card ">
        <div className="cliente-header" style={{ backgroundColor: colorPrimario, position: "relative" }}>
                <h2 className="cliente-titulo">Contacto</h2>
                <img src={fotoProductos} alt={nombre} />
            </div>
            <div className="cliente-info">
                    <div>
                    <h4>{nombre}</h4>
                    <h5><strong>{puesto}</strong></h5>
                    </div>
                <div className="social-redes">
                    <a href="tel:+573008600740">
                    <div className="social-icon-box">
                        <img 
                            src={require('../../assets/img/facebook.png')} 
                            alt="Icono facebook" 
                            className="iphone"
                        />
                    </div>                    
                    </a>
                    <a href="https://wa.me/573044698664" target="_blank" rel="noopener noreferrer">
                        <div className="social-icon-box">
                            <img 
                                src={require('../../assets/img/instagram.png')} 
                                alt="Icono instagram" 
                                className="iphone" 
                            />
                        </div>
                    </a>

                    <a href="https://www.hotmail.com" target="_blank" rel="noopener noreferrer">
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
                    <div class="">
                        <div class="fila">300 860 07 40</div>
                        <div class="fila">Cra 49 calle 144 sur 29</div>
                        <div class="fila">elizazq@hotmail.com</div>
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