import { useState } from 'react';
import { v4 as uuid } from "uuid";
import './App.css';
import Formulario from './components/Formulario/Formulario';
import Empresa from './components/Empresa/Empresa';
import TabsCard from './components/Tabs/TabsCard';

function App() {
  const [mostrarFormulario, actualizarMostrar] = useState(false);
  
  // Colaborador específico: Harland Lohora
  const [colaboradores, actualizarColaboradores] = useState([{
    id: uuid(),
    equipo: "Front End",
    foto: "https://github.com/harlandlohora.png",
    nombre: "Harland Lohora",
    puesto: "Instructor",
    fav: true
  }]);

  // Equipo específico: Front End
  const [equipos, actualizarEquipos] = useState([{
    id: uuid(),
    titulo: "Front End",
    colorPrimario: "#82CFFA",
    colorSecundario: "#E8F8FF"
  }]);


  // Actualizar color de equipo
  const actualizarColor = (color, id) => {
    console.log("Actualizar: ", color, id);
    const equiposActualizados = equipos.map((equipo) => {
      if (equipo.id === id) {
        equipo.colorPrimario = color;
      }
      return equipo;
    });
    actualizarEquipos(equiposActualizados);
  };


  return (
    <div>
      <TabsCard />
      {equipos.map((equipo) => (
        <Empresa
          datos={equipo}
          key={equipo.titulo}
          colaboradores={colaboradores.filter(colaborador => colaborador.equipo === equipo.titulo)}
          actualizarColor={actualizarColor}

        />
        
      ))}
    </div>
    
  );
}

export default App;



