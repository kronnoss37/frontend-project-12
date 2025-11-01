import React, { useEffect, useRef } from 'react'
import * as yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import LoadingButton from '../buttons/LoadingButton'

const initShema = (t, channels) =>
  yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('controlErrors.requiredField'))
      .min(3, t('controlErrors.fieldLength'))
      .max(20, t('controlErrors.fieldLength'))
      .notOneOf(channels, t('controlErrors.uniqueField')),
  })

const ModalForm = ({ onHide, channels, handleSubmit, channel }) => {
  const { t } = useTranslation()

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.select()
    inputRef.current.focus()
  }, [])

  const channelsNames = channels?.map(({ name }) => name)
  const initialValues = { name: channel?.name ?? '' }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={initShema(t, channelsNames)}
      onSubmit={handleSubmit}
      validateOnChange={false}
    >
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
              {t('modals.nameChannelLabel')}
            </label>
            <div className="invalid-feedback">{errors.name}</div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={onHide}>
                {t('modals.cancelButton')}
              </Button>
              {isSubmitting
                ? (
                    <LoadingButton />
                  )
                : (
                    <Button variant="primary" type="submit">
                      {t('modals.sendButton')}
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
