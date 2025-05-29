import "./Servicios.css"
import ListProductos from "../../pages/Productos/ListProductos";
import hexToRgba from 'hex-to-rgba';
import fotoProductos from "../../assets/img/Compras (2).png"



const Servicios = (props) => {
  if (!props.datos) {
    return <div>No se han proporcionado datos</div>;
  }

  const { colorPrimario, foto, nombre } = props.datos;
  

  const obj = {
    //backgroundColor: hexToRgba(colorPrimario, 0.6)
  };

  return (
    <section className="equipo" style={obj}>
      <div className="colaborador">
      <div className="encabezado" style={{ backgroundColor: colorPrimario, position: "relative" }}>
            <h2 className="cliente-titulo">Nuestros Productos</h2>
            <img src={fotoProductos} alt={nombre} className="producto-imagen" style={{ border: `4px solid ${colorPrimario}` }} />
          </div>
        
        <div className="info">
          <ListProductos />
        </div>
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
    </section>
  );
};

export default Servicios;