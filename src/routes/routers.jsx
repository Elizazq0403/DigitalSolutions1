import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Cliente from '../components/Cliente/Cliente'
import Servicios from '../pages/Business/Business'
import Contacto from '../pages/Contacto/Contacto'
import Error404 from '../components/Error404/Error404'
//import TabsCard from '../components/Tabs/TabsCard'
//import RegistrarCliente from '../components/RegistrarCliente/RegistrarCliente'
//import Formulario from '../components/Formulario/Formulario'
import QuienesSomos from '../pages/Business/Business'


function Routers() {
  return (
    <Routes>
      <Route path="/Perfil" element={<Cliente />} />
      <Route path="/Productos" element={<Servicios />} />
      <Route path="/Empresa" element={<QuienesSomos />} />
      <Route path="/Contacto" element={<Contacto />} />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  )
}

export default Routers