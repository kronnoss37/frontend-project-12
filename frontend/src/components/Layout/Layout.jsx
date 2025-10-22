import React from 'react'
import { Outlet } from 'react-router'

import NavbarBlock from '../Navigation/Navbar'

const Layout = () => {
  return (
    <div className="d-flex flex-column h-100">
      <NavbarBlock />
      <Outlet />
    </div>
  )
}

export default Layout
