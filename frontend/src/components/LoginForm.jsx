import React from 'react'
import { Formik, Form, Field } from 'formik'

const initialValues = {
  username: '',
  password: ''
}

const LoginForm = () => {

  const handleSubmit = (values) => {

    // logic sumbit form
    console.log('sumbit', values);
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className='col-12 col-md-6 mt-3 mt-md-0'>
          <h1 className='text-center mb-4'>Войти</h1>
          <div className='form-floating mb-3'>
            <Field name='username' autoComplete='username' required placeholder='Ваш ник' id='username' className='form-control' />
            <label htmlFor='username'>Ваш ник</label>
          </div>
          <div className='form-floating mb-3'>
            <Field
              name='password'
              autoComplete='current-password'
              required
              placeholder='Пароль'
              id='password'
              type='password'
              className='form-control'
            />
            <label htmlFor='password'>Пароль</label>
          </div>
          <button type='submit' className='w-100 mb-3 btn btn-outline-primary'>
            Войти
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm