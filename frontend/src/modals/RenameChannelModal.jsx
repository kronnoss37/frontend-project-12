import React from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from 'react-bootstrap'

import ModalForm from './ModalForm'
import { editAsyncChannel } from '../store/slices/channelsSlice'

const RenameChannelModal = ({ onHide, channels, token, channel }) => {
  const dispatch = useDispatch()

  const renameNewChannel = (values, { setSubmitting }) => {
    if (token) {
      dispatch(editAsyncChannel({ token, id: channel.id, editedChannel: values }))
        .unwrap()
        .then(() => onHide())
        .finally(() => setSubmitting(false))
      // onHide()
    }
  }

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title as="h4">Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm onHide={onHide} channels={channels} handleSubmit={renameNewChannel} channel={channel} />
      </Modal.Body>
    </Modal>
  )
}

export default RenameChannelModal
