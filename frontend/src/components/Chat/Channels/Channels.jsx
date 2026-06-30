import { Col, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import ChannelsSidebar from '../ChannelsSidebar'

import Channel from './Channel'

const ChannelsList = ({
  channels,
  currentChannel,
  changeChannel,
  handleOpenModal,
}) => {
  return (
    <ul
      id="channels-box"
      className="nav nav-pills nav-fill flex-grow-1 overflow-auto p-2 d-block"
    >
      {channels?.map(channel => (
        <Channel
          key={channel.id}
          channel={channel}
          currentChannel={currentChannel}
          changeChannel={changeChannel}
          handleOpenModal={handleOpenModal}
        />
      ))}
    </ul>
  )
}

const Channels = ({
  channels,
  currentChannel,
  showSidebar,
  changeChannel,
  handleOpenModal,
  closeChannels,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <ChannelsSidebar
        show={showSidebar}
        onHide={closeChannels}
        title={(
          <div className="d-flex flex-column gap-1">
            {t('channels.title')}
            <Button
              variant="primary"
              size="sm"
              className="rounded text-center text-truncate"
              onClick={() => handleOpenModal({ type: 'add' })}
            >
              Add channel
            </Button>
          </div>
        )}
      >
        {channels?.length > 0 && (
          <ChannelsList
            channels={channels}
            currentChannel={currentChannel}
            changeChannel={changeChannel}
            handleOpenModal={handleOpenModal}
          />
        )}
      </ChannelsSidebar>

      <Col
        xs={4}
        md={3}
        className="d-none d-md-flex flex-column h-100 border-end px-0 bg-light"
      >
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('channels.title')}</b>
          <Button
            variant="ligth"
            className="p-0 text-primary btn-group-vertical"
            onClick={() => handleOpenModal({ type: 'add' })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-plus-square"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
            </svg>
            <span className="visually-hidden">{t('channels.addButton')}</span>
          </Button>
        </div>

        {channels?.length > 0 && (
          <ChannelsList
            channels={channels}
            currentChannel={currentChannel}
            changeChannel={changeChannel}
            handleOpenModal={handleOpenModal}
          />
        )}
      </Col>
    </>
  )
}

export default Channels
