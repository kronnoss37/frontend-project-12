import React from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'

import LoadingButton from '../buttons/LoadingButton'
import { removeAsyncChannel } from '../store/slices/channelsSlice'

const RemoveChannelModal = ({ onHide, token, channel }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const removeChannel = async (_values, { setSubmitting }) => {
    if (token) {
      try {
        await dispatch(removeAsyncChannel({ token, id: channel.id })).unwrap()
        onHide()
      }
      catch {
      }
      finally {
        setSubmitting(false)
      }
    }
  }

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title as="h4">{t('modals.removeTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik initialValues={{}} onSubmit={removeChannel}>
          {({ isSubmitting }) => (
            <Form>
              <p className="lead">{t('modals.removeConfirmation')}</p>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" className="me-2" onClick={onHide}>
                  {t('modals.cancelButton')}
                </Button>
                {isSubmitting
                  ? (
                      <LoadingButton variant="danger" />
                    )
                  : (
                      <Button variant="danger" type="submit">
                        {t('modals.removeButton')}
                      </Button>
                    )}
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default RemoveChannelModal
