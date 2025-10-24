import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Channels from './Channels/Channels'
import Chat from './Messages/Chat'
import { getChannels, setCurrentChannel } from '../../store/slices/channelsSlice'
import { getMessages, addAsyncMessage } from '../../store/slices/messagesSlice';

const Main = () => {
  const dispatch = useDispatch()

  const userData = useSelector(state => state.authData.user)
  const channels = useSelector(state => state.channelsData.channels)
  const currentChannel = useSelector(state => state.channelsData.currentChannel)

  const messages = useSelector(state => state.messagesData.messages)
  const isLoadingMessage = useSelector((state) => state.messagesData.isLoadingMessage);

  const token = userData?.token;

  console.log('messages', messages);

  useEffect(() => {
    if (token) {
      dispatch(getChannels(token));
      dispatch(getMessages(token));
    }
  }, [dispatch, token]);

  const changeChannel = newChannel => dispatch(setCurrentChannel(newChannel))

  const addNewMessage = newMessage => {
    const messageConfig = { body: newMessage, channelId: currentChannel.id, username: userData.username };
    if(token){
      dispatch(addAsyncMessage({ token, newMessage: messageConfig }));
    }
  }

  return (
    <>
      <Channels channels={channels} currentChannel={currentChannel} changeChannel={changeChannel} />
      <Chat currentChannel={currentChannel} messages={messages} addNewMessage={addNewMessage} isLoadingMessage={isLoadingMessage} />
    </>
  );
}

export default Main
