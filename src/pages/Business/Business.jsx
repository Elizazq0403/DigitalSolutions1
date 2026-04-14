import "./Business.css"
import QuienesSomos from "../../components/QuienesSomos/QuienesSomos";
import fotoProductos from "../../assets/img/empresa.png"
import hexToRgba from 'hex-to-rgba';

const Servicios = (props) => {
  if (!props.datos) {
    return <div>No se han proporcionado datos</div>;
  }

  const { colorPrimario, colorSecundario, foto, nombre, link_logo } = props.datos;
  const { empresaId, colorPrimario: colorPrimarioDirect, colorSecundario: colorSecundarioDirect } = props;

  // Usar los colores directos si existen, si no, usar los que vienen en datos
  const finalColorPrimario = colorPrimarioDirect || colorPrimario;
  const finalColorSecundario = colorSecundarioDirect || colorSecundario;

  console.log("🎨 Servicios - colorPrimario:", finalColorPrimario);
  console.log("🎨 Servicios - colorSecundario:", finalColorSecundario);

  const obj = {
    // backgroundColor: hexToRgba(colorPrimario, 0.6)
  };

  return (
    <section className="equipo" style={obj}>
      <div className="colaborador">
        <div
          className="encabezado"
          style={{ backgroundColor: finalColorPrimario, position: "relative" }}
        >
          <h2 
            className="cliente-titulo"
            style={{ color: finalColorSecundario }}
          >
            Mi empresa
          </h2>
          <img
            src={link_logo}
            alt={nombre}
            className="colaborador-imagen"
            style={{ border: `4px solid ${finalColorSecundario}` }}
          />
        </div>
        <div className="info">
          {/* ✅ Ahora QuienesSomos recibe los colores */}
          <QuienesSomos 
            empresaId={empresaId}
            colorPrimario={finalColorPrimario}
            colorSecundario={finalColorSecundario}
          />
        </div>
      </div>
    </section>
  );
};

export default Servicios;
