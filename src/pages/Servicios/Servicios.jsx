import "./Servicios.css";
import ListProductos from "../../pages/Productos/ListProductos";
import hexToRgba from "hex-to-rgba";

const Servicios = (props) => {
  if (!props.datos) {
    return <div>No se han proporcionado datos</div>;
  }

  const { colorPrimario, link_logo, nombre } = props.datos;
  const { empresaId } = props;

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
          <h2 className="cliente-titulo">Nuestros Productos</h2>

          <img
            src={link_logo}
            alt={nombre}
            className="producto-imagen"
            style={{ border: `4px solid ${colorPrimario}` }}
          />
        </div>

        <div className="info-pdtos">
          <ListProductos empresaId={empresaId} />
        </div>
      </div>
    </section>
  );
};

export default Servicios;




