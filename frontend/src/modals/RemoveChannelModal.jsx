import React from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { Formik, Form } from 'formik'

import LoadingButton from '../buttons/LoadingButton'
import { removeAsyncChannel } from '../store/slices/channelsSlice'

const RemoveChannelModal = ({ onHide, token, channel }) => {
  const dispatch = useDispatch()

  const removeChannel = (_values, { setSubmitting }) => {
    if (token) {
      dispatch(removeAsyncChannel({ token, id: channel.id }))
        .unwrap()
        .then(() => onHide())
        .finally(() => setSubmitting(false))
      // onHide()
    }
  }

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title as="h4">Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik initialValues={{}} onSubmit={removeChannel}>
          {({ isSubmitting }) => (
            <Form>
              <p className="lead">Уверены?</p>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" className="me-2" onClick={onHide}>
                  Отменить
                </Button>
                {isSubmitting
                  ? (
                      <LoadingButton variant="danger" />
                    )
                  : (
                      <Button variant="danger" type="submit">
                        Удалить
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
