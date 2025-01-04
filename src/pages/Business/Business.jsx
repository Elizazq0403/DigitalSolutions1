import "./Business.css"
import QuienesSomos from "../../components/QuienesSomos/QuienesSomos";
import hexToRgba from 'hex-to-rgba';
import fotoProductos from "../../assets/img/icono empresa.png"


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
        <div className="encabezado" style={{ backgroundColor: colorPrimario }}>
        <img src={fotoProductos} alt={nombre} />
        </div>
        <div className="info">
          <QuienesSomos />
        </div>
      </div>
    </section>
  );
};

export default Servicios;