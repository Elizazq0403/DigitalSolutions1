import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Servicios from '../pages/Servicios'
import Contacto from '../pages/Contacto'
import Error404 from '../components/Error404/Error404'
//import TabsCard from '../components/Tabs/TabsCard'
//import RegistrarCliente from '../components/RegistrarCliente/RegistrarCliente'
import Formulario from '../components/Formulario/Formulario'
import Productos from '../pages/Productos/Productos'


function Routers() {
  return (
    <Routes>

    <Route path="/" element={<Home />} />
    <Route path="/Productos" element={<Productos />} />
    <Route path="/contacto" element={<Contacto />} />
    <Route path="/prueba" element={<Formulario />} />
    <Route path="/*" element={<Error404 />} />

    </Routes>
  )
}

export default Routers