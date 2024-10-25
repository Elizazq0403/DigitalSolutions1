import { useState } from 'react';
import { v4 as uuid } from "uuid";
import './App.css';
import Formulario from './components/Formulario/Formulario';
import Empresa from './components/Empresa/Empresa';
import TabsCard from './components/Tabs/TabsCard';
import './TabsCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap";
import ListProductos from './pages/Productos/ListProductos';
import Servicios from './pages/Servicios/Servicios';



function App() {
  const [mostrarFormulario, actualizarMostrar] = useState(false);
  
  // Colaborador específico: Harland Lohora
  const [colaboradores, actualizarColaboradores] = useState([{
    id: uuid(),
    equipo: "Front End",
    foto: "https://firebasestorage.googleapis.com/v0/b/cv-elizabethzapataq.appspot.com/o/WhatsApp%20Image%202024-10-19%20at%205.07.00%20PM.jpeg?alt=media&token=fd10feaf-8efd-49df-8cad-c4d5797b89f9",
    nombre: "Elizabeth Zapata Quiceno",
    puesto: " WEB-Z Digitals Solutions",
    fav: true
  }]);

  // Equipo específico: Front End
  const [equipos, actualizarEquipos] = useState([{
    id: uuid(),
    titulo: "Front End",
    colorPrimario: "#27D363", //si cambio este color del input-color y vuelvo a recargar la aplicacion, por defecto me toma este color definido aca #82CFFA
    colorSecundario: "#E8F8FF"
  }]);


  // Actualizar color de equipo, esta es la funcion que se conecta con el input y permite el cambio en el color primario del encabezado
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
                //key={equipo.titulo}
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
         <div className='container'>
          <br />
          {equipos.map((equipo) => (
            <Servicios
              datos={equipo} // se debe pasar el objeto datos como prop para poder actualizar el color primario
            />
          ))}
        </div>
         <TabPane/>
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



