import "./Servicios.css";
import ListProductos from "../../pages/Productos/ListProductos";
import hexToRgba from "hex-to-rgba";
import fotoProductos from "../../assets/img/Compras (2).jpg";

const Servicios = (props) => {
  if (!props.datos) {
    return <div>No se han proporcionado datos</div>;
  }

  const { colorPrimario, foto, nombre } = props.datos;
  const { empresaId } = props; // 👈 lo recibimos igual que en Business

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
            src={fotoProductos}
            alt={nombre}
            className="producto-imagen"
            style={{ border: `4px solid ${colorPrimario}` }}
          />
        </div>

        <div className="info">
          {/* ✅ ahora lo pasamos tal cual como en Business */}
          <ListProductos empresaId={empresaId} />
        </div>
      </div>
    </section>
  );
};

export default Servicios;



