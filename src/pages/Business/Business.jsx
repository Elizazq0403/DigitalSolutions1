import "./Business.css"
import QuienesSomos from "../../components/QuienesSomos/QuienesSomos";
import fotoProductos from "../../assets/img/empresa.png"
import hexToRgba from 'hex-to-rgba';

const Servicios = (props) => {
  if (!props.datos) {
    return <div>No se han proporcionado datos</div>;
  }

  const { colorPrimario, colorSecundario, foto, nombre, link_logo } = props.datos;
  const { empresaId } = props; // 👈 aquí recibes el id de la empresa

  const obj = {
    // backgroundColor: hexToRgba(colorPrimario, 0.6)
  };

  return (
    <section className="equipo" style={obj}>
      <div className="colaborador">
        <div
          className="encabezado"
          style={{ backgroundColor: colorPrimario, position: "relative" }}
        >
          <h2 className="cliente-titulo">Mi empresa</h2>
          <img
            src={link_logo}
            alt={nombre}
            className="colaborador-imagen"
            style={{ border: `4px solid ${colorSecundario}` }}
          />
        </div>
        <div className="info">
          {/* ✅ ahora QuienesSomos recibe empresaId */}
          <QuienesSomos empresaId={empresaId} />
        </div>
      </div>
    </section>
  );
};

export default Servicios;
