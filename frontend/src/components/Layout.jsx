import React from 'react'
import { Outlet } from 'react-router'

import Navbar from './Navbar'

const Layout = () => {
  return (
    <div className='d-flex flex-column h-100'>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout