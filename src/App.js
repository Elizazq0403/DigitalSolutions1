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
import { TabCard2 } from './components/TabsCars2';
import { HiAdjustments, HiShoppingCart } from "react-icons/hi";
import { MdDashboard, MdAdUnits, MdOutlineStorefront, MdAssignmentInd } from "react-icons/md";


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
    <div className="flex justify-center items-center min-h-screen">
      {/* Contenedor de las pestañas */}
      <div className="overflow-x-auto border rounded-lg p-4 bg-white shadow-md">
        {/* Controles de navegación para cambiar de pestaña */}
        <div className="flex justify-around border-b border-gray-300">
          <button
            onClick={() => setActiveTab("MiPerfil")}
            className={`px-2 py-3 ${activeTab === "MiPerfil" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
          >
            < MdAdUnits className="inline mr-2" />
            Perfil
          </button>
          <button
            onClick={() => setActiveTab("MiEmpresa")}
            className={`px-2 py-3 ${activeTab === "MiEmpresa" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
          >
            <MdOutlineStorefront className="inline mr-2" />
            Empresa
          </button>
          <button
            onClick={() => setActiveTab("Productos")}
            className={`px-2 py-3 ${activeTab === "Productos" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
          >
            <HiShoppingCart className="inline mr-2" />
            Productos

          </button>
          <button
            onClick={() => setActiveTab("Contactos")}
            className={`px-2 py-3 ${activeTab === "Contactos" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
          >
            <MdAssignmentInd className="inline mr-2" />
            Contactos
          </button>
        </div>
        {/* Contenido de cada pestaña, renderizado en el cuerpo de la página */}
        <div className="mt-4 text-center">
          {activeTab === "MiPerfil" && (
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
          )}
          {activeTab === "MiEmpresa" && (
            <div>
              This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
            </div>
          )}
          {activeTab === "Productos" && (
            <div>
            <div className='container'>
            <br />
            {equipos.map((equipo) => (
              <Servicios
                datos={equipo} // se debe pasar el objeto datos como prop para poder actualizar el color primario
              />
            ))}
          </div>
          </div>
          )}
          {activeTab === "Contactos" && (
            <div>
              This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;



