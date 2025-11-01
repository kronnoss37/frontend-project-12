import React from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

import ModalForm from './ModalForm'
import { editAsyncChannel } from '../store/slices/channelsSlice'

const RenameChannelModal = ({ onHide, channels, token, channel }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const renameNewChannel = async (values, { setSubmitting }) => {
    if (token) {
      try {
        await dispatch(editAsyncChannel({ token, id: channel.id, editedChannel: values })).unwrap();
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
        <Modal.Title as='h4'>{t('modals.renameTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm onHide={onHide} channels={channels} handleSubmit={renameNewChannel} channel={channel} />
      </Modal.Body>
    </Modal>
  );
}

export default RenameChannelModal
