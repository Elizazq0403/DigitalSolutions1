import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routes/routers'
import { Outlet } from 'react-router-dom';


function Layout() {
  return (
    <>
    <Header />
    <main>  
      <Outlet />
    </main>
    {/*<Footer />*/}
    </>
  )
}

export default Layout