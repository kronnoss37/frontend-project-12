import { Col, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import Messages from './Messages'
import ChatForm from './ChatForm'

const Chat = ({
  currentChannel,
  messages,
  addNewMessage,
  isLoadingMessage,
  messagesBoxRef,
  openChannels,
}) => {
  const { t } = useTranslation()

  const channelMessages = messages?.filter(
    ({ channelId }) => channelId === currentChannel.id,
  )
  const messagesCount = channelMessages?.length ?? 0

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        {currentChannel && (
          <div className="d-flex justify-content-between bg-light mb-4 p-3 shadow-sm small">
            <div className="d-flex flex-column">
              <p className="m-0">
                <b>{`${t('channels.channelPrefix')} ${currentChannel?.name}`}</b>
              </p>
              <span className="text-muted">
                {t('messages.message', { count: messagesCount })}
              </span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="d-md-none rounded text-center text-truncate"
              onClick={openChannels}
            >
              Channels
            </Button>
          </div>
        )}
        <Messages
          channelMessages={channelMessages}
          messagesBoxRef={messagesBoxRef}
        />
        <ChatForm
          addNewMessage={addNewMessage}
          isLoadingMessage={isLoadingMessage}
        />
      </div>
    </Col>
  )
}

export default Chat
