import React from 'react'
import { Link } from 'react-router'

import LoginForm from '../components/LoginForm'
import loginPicture from '../assets/avatar.jpg'

const LoginPage = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginPicture} className="rounded-circle" alt="Войти" />
              </div>
              <LoginForm />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <Link to="/">Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
