import React, { useEffect, useRef } from 'react'
import * as yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { Button } from 'react-bootstrap'

import LoadingButton from '../buttons/LoadingButton'

yup.setLocale({
  // ---***--- add paths after i18n !!!
  mixed: {
    required: () => 'Обязательное поле',
    notOneOf: () => 'Должно быть уникальным',
  },
  string: {
    min: () => 'От 3 до 20 символов',
    max: () => 'От 3 до 20 символов',
  },
})

const initShema = channels =>
  yup.object().shape({
    name: yup.string().trim().required().min(3).max(20).notOneOf(channels),
  })

const ModalForm = ({ onHide, channels, handleSubmit, channel }) => {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.select()
    inputRef.current.focus()
  }, [])

  const channelsNames = channels?.map(({ name }) => name)
  const initialValues = { name: channel?.name ?? '' }

  return (
    <Formik initialValues={initialValues} validationSchema={initShema(channelsNames)} onSubmit={handleSubmit} validateOnChange={false}>
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <div>
            <Field
              name="name"
              id="name"
              className={`mb-2 form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
              ref={inputRef}
            />
            <label htmlFor="name" className="visually-hidden">
              Имя канала
            </label>
            <div className="invalid-feedback">{errors.name && touched.name ? errors.name : ''}</div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={onHide}>
                Отменить
              </Button>
              {isSubmitting
                ? (
                    <LoadingButton />
                  )
                : (
                    <Button variant="primary" type="submit">
                      Отправить
                    </Button>
                  )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ModalForm
