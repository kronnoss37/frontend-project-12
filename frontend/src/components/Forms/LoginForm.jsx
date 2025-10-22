import React, { useEffect, useRef } from 'react'
import { Formik, Form, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Button } from 'react-bootstrap'

import { authUser } from '../../store/slices/authSlice';

const LoginForm = () => {
  const navigate = useNavigate()

  const inputRef = useRef(null)

  const dispatch = useDispatch()

  const isAuth = useSelector(state => state.authData.isAuth)
  const errorData = useSelector(state => state.authData.error)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  useEffect(() => {
    if (isAuth) {
      navigate('/', { replace: true })
    }
  }, [isAuth, navigate])

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(authUser(values)).finally(() => setSubmitting(false))
  }

  const className = () => `form-control ${errorData?.type === 'auth' ? 'is-invalid' : ''}`

  const initialValues = {
    username: '',
    password: '',
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">Войти</h1>
          <div className="form-floating mb-3">
            <Field
              name="username"
              autoComplete="username"
              required
              placeholder="Ваш ник"
              id="username"
              className={className()}
              ref={inputRef}
            />
            <label htmlFor="username">Ваш ник</label>
          </div>
          <div className="form-floating mb-3">
            <Field
              name="password"
              autoComplete="current-password"
              required
              placeholder="Пароль"
              id="password"
              type="password"
              className={className()}
            />
            <label htmlFor="password">Пароль</label>
            <div className="invalid-feedback">Неверные имя пользователя или пароль</div>
          </div>
          {isSubmitting
            ? (
                <Button variant="primary" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  {' '}
                  <span role="status">Loading...</span>
                </Button>
              )
            : (
                <Button type="submit" variant='outline-primary' className="w-100 mb-3">Войти</Button>
              )}
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
