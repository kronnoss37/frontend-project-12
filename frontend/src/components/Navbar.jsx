import React from 'react'
import { Link, useNavigate } from 'react-router'

const Navbar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    // Finish user session
    navigate('/login')
  }
  
  return (
    <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>Hexlet Chat</Link>
        <button className='btn btn-primary' onClick={handleLogout}>Выйти</button>
      </div>
    </nav>
  );
}

export default Navbar