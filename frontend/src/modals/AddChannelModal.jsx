import React from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

import ModalForm from './ModalForm'
import { addAsyncChannel } from '../store/slices/channelsSlice'

const AddChannelModal = ({ onHide, channels, token }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const addNewChannel = async (values, { setSubmitting }) => {
    if (token) {
      try {
        await dispatch(addAsyncChannel({ token, newChannel: values })).unwrap();
        onHide();
      } catch (error) {
      } finally {
        setSubmitting(false);
      }
    }
  }

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title as='h4'>{t('modals.addTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm onHide={onHide} channels={channels} handleSubmit={addNewChannel} />
      </Modal.Body>
    </Modal>
  );
}

export default AddChannelModal
