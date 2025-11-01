import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Container, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

import { logOut } from '../../store/slices/authSlice'

const NavbarBlock = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.authData.isAuth)

  const handleLogout = () => {
    dispatch(logOut())
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <Navbar expand="lg" bg="white" variant="light" className="shadow-sm">
      <Container className="container">
        <Link className="navbar-brand" to="/">{t('navbar.brand')}</Link>
        {isAuth && <Button variant="primary" onClick={handleLogout}>{t('navbar.logoutButton')}</Button>}
      </Container>
    </Navbar>
  )
}

export default NavbarBlock
