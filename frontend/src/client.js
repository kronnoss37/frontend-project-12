import { io } from 'socket.io-client'

import { addMessage } from './store/slices/messagesSlice';

export default (store) => {
  const socket = io();

  socket.on('connect', () => {
    console.log('Подключение прошло успешно!', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Подключение оборвалось!');
  });

  socket.on('reconnect', () => {
    console.log('Подключение восстановлено!');
  });

  socket.on('newMessage', (payload) => {
    console.log(`Пользователь ${socket.id} получил сообщение`);
    const { authData: { user } } = store.getState()
    if (user.username !== payload.username) {
      store.dispatch(addMessage(payload));
    }
  });

  socket.on('removeChannel', (payload) => {
    console.log(`Канал ${payload.id} был удален!`);
  });

  socket.on('renameChannel', (payload) => {
    console.log(`Канал ${payload.id} был изменен на: ${payload}!`);
  });
};