import './TabsCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap";
import { useState } from 'react';
import Contacto from '../../pages/Contacto';
//import ListProductos from '../../pages/ListProductos/ListProductos';

function TabsCard() {

  const[activeTab,setActiveTab] = useState("1");

  const cambiarTab = (numeroTab) =>{
    if(activeTab !== numeroTab){
      setActiveTab(numeroTab);
    }
  }

  return (
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
             {/*<p>Este es un párrafo sencillo</p>*/}
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
  );
}

export default TabsCard;

