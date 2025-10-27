import React from 'react'
import { Col } from 'react-bootstrap'

import Messages from './Messages'
import ChatForm from './ChatForm'

const Chat = ({ currentChannel, messages, addNewMessage, isLoadingMessage }) => {
  const channelMessages = messages?.filter(({ channelId }) => channelId === currentChannel.id)
  const messagesCount = channelMessages?.length

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        {currentChannel && (
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b>{`# ${currentChannel?.name}`}</b>
            </p>
            <span className="text-muted">
              {messagesCount}
              {' '}
              сообщений
            </span>
            {/** after i18n - 1 сообщение, 2-4 сообщения, 5-.. сообщений */}
          </div>
        )}
        <Messages channelMessages={channelMessages} />
        <ChatForm addNewMessage={addNewMessage} isLoadingMessage={isLoadingMessage} />
      </div>
    </Col>
  )
}

export default Chat
