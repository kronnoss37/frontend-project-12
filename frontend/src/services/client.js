import { io } from 'socket.io-client'

import { addMessage } from '../store/slices/messagesSlice'
import { addChannel, editChannel, removeChannel } from '../store/slices/channelsSlice'

export default (store) => {
  const socket = io()

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload))
  })

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload))
  })

  socket.on('renameChannel', (payload) => {
    store.dispatch(editChannel(payload))
  })

  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload))
  })
}
