import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Formik, Form, Field } from 'formik'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { authUser } from '../../store/slices/authSlice'
import LoadingButton from '../buttons/LoadingButton'

const LoginForm = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const inputRef = useRef(null)

  const dispatch = useDispatch()

  const isAuth = useSelector(state => state.authData.isAuth)
  const errorType = useSelector(state => state.authData.errorType)

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

  const className = () => `form-control ${errorType === 'auth' ? 'is-invalid' : ''}`

  const initialValues = {
    username: '',
    password: '',
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className='col-12 col-md-6 mt-3 mt-md-0'>
          <h1 className='text-center mb-4'>{t('loginForm.title')}</h1>
          <div className='form-floating mb-3'>
            <Field
              name='username'
              autoComplete='off'
              required
              placeholder={t('loginForm.usernameLabel')}
              id='username'
              className={className()}
              ref={inputRef}
            />
            <label htmlFor='username'>{t('loginForm.usernameLabel')}</label>
          </div>
          <div className='form-floating mb-3'>
            <Field
              name='password'
              autoComplete='off'
              required
              placeholder={t('loginForm.passwordLabel')}
              id='password'
              type='password'
              className={className()}
            />
            <label htmlFor='password'>{t('loginForm.passwordLabel')}</label>
            <div className='invalid-feedback'>{t('controlErrors.authError')}</div>
          </div>
          {isSubmitting ? (
            <LoadingButton className='w-100 mb-3' />
          ) : (
            <Button type='submit' variant='outline-primary' className='w-100 mb-3'>
              {t('loginForm.submitButton')}
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm
