import { useState } from 'react';
import { v4 as uuid } from "uuid";
import './App.css';
import Formulario from './components/Formulario/Formulario';
import Empresa from './components/Empresa/Empresa';
import TabsCard from './components/Tabs/TabsCard';
import './TabsCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap";




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

  const[activeTab,setActiveTab] = useState("1");

  const cambiarTab = (numeroTab) =>{
    if(activeTab !== numeroTab){
      setActiveTab(numeroTab);
    }
  }


  return (
    <div>
          <div className="App">
       <Nav tabs>
         <NavItem>
           <NavLink 
           className={(activeTab=="1" ? "activeTab baseTab" : "baseTab" )}
           onClick={()=>cambiarTab("1")}>
             MI PERFIL
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink 
              className={(activeTab=="2" ? "activeTab baseTab" : "baseTab" )}
           onClick={()=>cambiarTab("2")}>
             MI EMPRESA
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink 
              className={(activeTab=="3" ? "activeTab baseTab" : "baseTab" )}
           onClick={()=>cambiarTab("3")}>
            PRODUCTOS
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink 
              className={(activeTab=="4" ? "activeTab baseTab" : "baseTab" )}
           onClick={()=>cambiarTab("4")}>
            EVENTOS
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink 
              className={(activeTab=="5" ? "activeTab baseTab" : "baseTab" )}
           onClick={()=>cambiarTab("5")}>
            CONTACTOS
           </NavLink>
         </NavItem>

       </Nav>

       <TabContent activeTab={activeTab}>
         <TabPane tabId="1">
           <div className='container'>
             <br />
             {equipos.map((equipo) => (
              <Empresa
                datos={equipo}
                key={equipo.titulo}
                colaboradores={colaboradores.filter(colaborador => colaborador.equipo === equipo.titulo)}
                actualizarColor={actualizarColor}

              />
        
      ))}
           </div>

         </TabPane>

         <TabPane tabId="2">
           {/*<div className='container'>
             <br />
             <img src='https://lh3.googleusercontent.com/a-/AOh14GjjMfH-BpCvLrIU7AoboHTinGSIgLowZtLIGrJTFg=s360-p-rw-no'
              width={300} height={300}
              />
           </div>*/}

         </TabPane>
         


         <TabPane tabId="3">
           
         {/*<Productos/>*/}
         </TabPane>

         <TabPane tabId="4">
           {/*<div className='container'>
             <br />
             <p>Este es un evento</p>
           </div>*/}
         </TabPane>

         <TabPane tabId="5">
           {/*<div className='container'>
             <br />
             <Contacto/>
           </div>*/}
         </TabPane>

       </TabContent>
    </div>
      
    </div>
    
  );
}

export default App;



