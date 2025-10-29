import React, { useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Formik, Form, Field } from 'formik'
import { Button } from 'react-bootstrap'
import * as yup from 'yup'

import { signupUser, changeErrorType } from '../../store/slices/authSlice'
import LoadingButton from '../../buttons/LoadingButton'

yup.setLocale({
  mixed: {
    required: () => 'Обязательное поле',
    oneOf: () => 'Пароли должны совпадать',
  },
  string: {
    min: ({ path }) => (path === 'username' ? 'От 3 до 20 символов' : 'Не менее 6 символов'),
    max: () => 'От 3 до 20 символов',
  },
});

const initSchema = () =>
  yup.object().shape({
    username: yup.string().trim().required().min(3).max(20),
    password: yup.string().trim().required().min(6),
    confirmPassword: yup.string().trim().required().oneOf([yup.ref('password')]),
  });

const SignUpForm = () => {
  const navigate = useNavigate()

  const inputRef = useRef(null)

  const dispatch = useDispatch()

  const isAuth = useSelector(state => state.authData.isAuth)
  const errorType = useSelector(state => state.authData.errorType)

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  useEffect(() => {
    if (isAuth) {
      navigate('/', { replace: false });
    }
  }, [isAuth, navigate]);

  const handleSubmit = (values, { setSubmitting }) => {
    const { username, password } = values
    const user = { username, password };
    dispatch(signupUser(user)).finally(() => setSubmitting(false));
  }
  
  const isSignUpError = errorType === 'signup';
  console.log('isSignUpError', isSignUpError);
  console.log('errorType', errorType);
  const className = (errors, touched, type) => `form-control ${isSignUpError || (errors[type] && touched[type]) ? 'is-invalid' : ''}`;

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <Formik initialValues={initialValues} validationSchema={initSchema()} onSubmit={handleSubmit} validateOnChange={false}>
      {({ values, errors, touched, isSubmitting }) => {
        useEffect(() => { // necessary for a better UX
          if(values.username && isSignUpError) {
            dispatch(changeErrorType(null))
          }
        }, [values.username])

        return (
          <Form className='w-50'>
            <h1 className='text-center mb-4'>Регистрация</h1>
            <div className='form-floating mb-3'>
              <Field
                name='username'
                id='username'
                autoComplete='username'
                className={className(errors, touched, 'username')}
                placeholder='Имя пользователя'
                ref={inputRef}
              />
              <label className='form-label' htmlFor='username'>
                Имя пользователя
              </label>
              <div className='invalid-feedback'>{errors.username}</div> {/** ?? */}
            </div>
            <div className='form-floating mb-3'>
              <Field
                name='password'
                id='password'
                type='password'
                autoComplete='new-password'
                className={className(errors, touched, 'password')}
                placeholder='Пароль'
                aria-describedby='passwordHelpBlock'
              />
              <label className='form-label' htmlFor='password'>
                Пароль
              </label>
              <div className='invalid-feedback'>{errors.password}</div>
            </div>
            <div className='form-floating mb-4'>
              <Field
                name='confirmPassword'
                id='confirmPassword'
                type='password'
                autoComplete='new-password'
                className={className(errors, touched, 'confirmPassword')}
                placeholder='Подтвердите пароль'
              />
              <label className='form-label' htmlFor='confirmPassword'>
                Подтвердите пароль
              </label>
              <div className='invalid-feedback'>
                {errors.confirmPassword ?? (isSignUpError ? 'Такой пользователь уже существует' : '')}
              </div>
            </div>
            {isSubmitting ? (
              <LoadingButton />
            ) : (
              <Button type='submit' variant='outline-primary' className='w-100'>
                Зарегистрироваться
              </Button>
            )}
          </Form>)
      }}
    </Formik>
  );
}

export default SignUpForm