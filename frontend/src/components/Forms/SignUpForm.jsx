import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Formik, Form, Field } from 'formik'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { signupUser, changeErrorType } from '../../store/slices/authSlice'
import LoadingButton from '../buttons/LoadingButton'
import initSignUpSchema from '../../validation/signUpSchema'

const SignUpForm = () => {
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
      navigate('/', { replace: false })
    }
  }, [isAuth, navigate])

  const handleSubmit = (values, { setSubmitting }) => {
    const { username, password } = values
    const user = { username, password }
    dispatch(signupUser(user)).finally(() => setSubmitting(false))
  }

  const isSignUpError = errorType === 'signup'
  const className = (errors, touched, type) => `form-control ${isSignUpError || (errors[type] && touched[type]) ? 'is-invalid' : ''}`

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  }

  return (
    <Formik initialValues={initialValues} validationSchema={initSignUpSchema(t)} onSubmit={handleSubmit} validateOnChange={false}>
      {({ values, errors, touched, isSubmitting }) => {
        useEffect(() => { // necessary for a better UX
          if (values.username && isSignUpError) {
            dispatch(changeErrorType(null))
          }
        }, [values.username])

        return (
          <Form className="w-50">
            <h1 className="text-center mb-4">{t('signUpForm.title')}</h1>
            <div className="form-floating mb-3">
              <Field
                name="username"
                id="username"
                autoComplete="off"
                className={className(errors, touched, 'username')}
                placeholder={t('signUpForm.usernameLabel')}
                ref={inputRef}
              />
              <label className="form-label" htmlFor="username">
                {t('signUpForm.usernameLabel')}
              </label>
              <div className="invalid-feedback">{errors.username}</div>
            </div>
            <div className="form-floating mb-3">
              <Field
                name="password"
                id="password"
                type="password"
                autoComplete="off"
                className={className(errors, touched, 'password')}
                placeholder={t('signUpForm.passwordLabel')}
                aria-describedby="passwordHelpBlock"
              />
              <label className="form-label" htmlFor="password">
                {t('signUpForm.passwordLabel')}
              </label>
              <div className="invalid-feedback">{errors.password}</div>
            </div>
            <div className="form-floating mb-4">
              <Field
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                autoComplete="off"
                className={className(errors, touched, 'confirmPassword')}
                placeholder={t('signUpForm.passwordConfirmLabel')}
              />
              <label className="form-label" htmlFor="confirmPassword">
                {t('signUpForm.passwordConfirmLabel')}
              </label>
              <div className="invalid-feedback">{errors.confirmPassword ?? (isSignUpError && t('controlErrors.signupError'))}</div>
            </div>
            {isSubmitting
              ? (
                  <LoadingButton className="w-100" />
                )
              : (
                  <Button type="submit" variant="outline-primary" className="w-100">
                    {t('signUpForm.submitButton')}
                  </Button>
                )}
          </Form>
        )
      }}
    </Formik>
  )
}

export default SignUpForm
