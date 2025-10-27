import React from 'react'
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap' 

import ModalForm from './ModalForm';
import { addAsyncChannel } from '../store/slices/channelsSlice';

const AddChannelModal = ({ onHide, channels, token }) => {

  const dispatch = useDispatch()

  const addNewChannel = (values, { setSubmitting }) => {
    console.log('values', values);
    if (token) {
      dispatch(addAsyncChannel({ token, newChannel: values }))
      .unwrap()
      .then(() => onHide())
      .finally(() => setSubmitting(false))
      // onHide()
    }
  };

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title as='h4'>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm onHide={onHide} channels={channels} handleSubmit={addNewChannel} />
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal