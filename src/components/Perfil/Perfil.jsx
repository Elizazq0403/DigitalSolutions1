import { useOutletContext } from "react-router-dom";
import Empresa from "../Empresa/Empresa"; // Ajusta la ruta según tu estructura

const Perfil = () => {
  // Obtenemos los datos del contexto
  const { equipos, colaboradores, actualizarColor } = useOutletContext();
  
  return (
    <div className='container'>
      {equipos.map((equipo) => (
        <Empresa
          datos={equipo}
          key={equipo.id}
          colaboradores={colaboradores.filter(
            colaborador => colaborador.equipo === equipo.titulo
          )}
          actualizarColor={actualizarColor}
        />
      ))}
    </div>
  );
};

export default Perfil;

