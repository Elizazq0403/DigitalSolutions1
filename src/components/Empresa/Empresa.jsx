import "./Empresa.css";
import Cliente from "../Cliente/Cliente";
import hexToRgba from "hex-to-rgba";

const Empresa = (props) => {
  const { colorPrimario, colorSecundario, titulo, id } = props.datos;
  const { colaboradores, actualizarColor, empresaNombreUsuario } = props;

  const estiloTitulo = { borderColor: colorPrimario };

  return (
    <>
      {colaboradores.length > 0 && (
        <section className="equipo">
          {/* ✅ Condición: solo aparece el input si el nombre_usuario_url es "webz"*/}
          {empresaNombreUsuario === "webz" && (
            <input
              type="color"
              className="input-color"
              value={colorPrimario}
              onChange={(evento) => {
                actualizarColor(evento.target.value, id);
              }}
            />
          )} 

          <h3 style={estiloTitulo}></h3>
          <div className="colaboradores">
            {colaboradores.map((colaborador, index) => (
              <Cliente
                datos={colaborador}
                key={index}
                colorPrimario={colorPrimario}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Empresa;

   