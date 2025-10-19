import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import { logOut } from '../store/authSlice'

const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.authData.isAuth);

  const handleLogout = () => {
    dispatch(logOut())
    localStorage.removeItem('user')
    navigate('/login')
  }
  
  return (
    <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>Hexlet Chat</Link>
        {isAuth ? <button className='btn btn-primary' onClick={handleLogout}>Выйти</button> : ''}
      </div>
    </nav>
  );
}

export default Navbar