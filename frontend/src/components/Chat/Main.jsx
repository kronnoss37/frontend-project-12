import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Channels from './Channels/Channels'
import Chat from './Messages/Chat';
import { getChannels, setCurrentChannel } from '../../store/slices/channelsSlice';
import { getMessages } from '../../store/slices/messagesSlice';

const Main = () => {

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.authData.user);
  const channels = useSelector((state) => state.channelsData.channels);
  const currentChannel = useSelector((state) => state.channelsData.currentChannel);

  const messages = useSelector((state) => state.messagesData.messages);

  useEffect(() => {
    const token = userData?.token;
    if (token) {
      dispatch(getChannels(token));
      dispatch(getMessages(token));
    }
  }, []);

  const changeChannel = (newChannel) => dispatch(setCurrentChannel(newChannel));

  return (
    <>
      <Channels channels={channels} currentChannel={currentChannel} changeChannel={changeChannel} />
      <Chat currentChannel={currentChannel} messages={messages} />
    </>
  );
}

export default Main