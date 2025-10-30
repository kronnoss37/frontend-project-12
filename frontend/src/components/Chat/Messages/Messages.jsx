import React from 'react'
import filter from 'leo-profanity'

const Messages = ({ channelMessages }) => {
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {channelMessages?.map(message => (
        <div key={message.id} className="text-break mb-2">
          <b>{`${message.username}:`}</b>
          {' '}
          {filter.clean(message.body)}
        </div>
      ))}
    </div>
  )
}

export default Messages
