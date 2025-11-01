import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Channels from './Channels/Channels'
import Chat from './Messages/Chat'
import renderModal from '../../modals/index'

import { logOut } from '../../store/slices/authSlice'
import { setCurrentChannel, getChannels, openModal, closeModal } from '../../store/slices/channelsSlice'
import { getMessages, addAsyncMessage } from '../../store/slices/messagesSlice'

const Main = () => {
  const dispatch = useDispatch()

  const userData = useSelector(state => state.authData.user)
  const channels = useSelector(state => state.channelsData.channels)
  const currentChannel = useSelector(state => state.channelsData.currentChannel)
  const modal = useSelector(state => state.channelsData.modal)

  const messages = useSelector(state => state.messagesData.messages)
  const isLoadingMessage = useSelector(state => state.messagesData.isLoadingMessage)

  const token = userData?.token

  const isOpneModal = !!modal.type
  const CurrentModal = renderModal(modal.type)

  useEffect(() => {
    const fetch = async () => {
      try {
        if (token) {
          await dispatch(getChannels(token)).unwrap()
          await dispatch(getMessages(token)).unwrap()
        }
      }
      catch (errorData) {
        if (errorData?.type === 'auth') {
          dispatch(logOut())
          localStorage.removeItem('user')
        }
      }
    }
    fetch()
  }, [dispatch, token])

  const changeChannel = newChannel => dispatch(setCurrentChannel(newChannel))

  const addNewMessage = (newMessage) => {
    const messageConfig = { body: newMessage, channelId: currentChannel.id, username: userData.username }
    if (token) {
      dispatch(addAsyncMessage({ token, newMessage: messageConfig }))
    }
  }

  const handleOpenModal = (data) => {
    dispatch(openModal(data))
  }

  return (
    <>
      <Channels channels={channels} currentChannel={currentChannel} changeChannel={changeChannel} handleOpenModal={handleOpenModal} />
      <Chat currentChannel={currentChannel} messages={messages} addNewMessage={addNewMessage} isLoadingMessage={isLoadingMessage} />
      {isOpneModal && (
        <CurrentModal
          onHide={() => dispatch(closeModal())}
          channels={channels}
          token={token}
          channel={modal.selectedChannel}
        />
      )}
    </>
  )
}

export default Main
