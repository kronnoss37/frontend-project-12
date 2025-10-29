import React from 'react'
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

const setVariantBtn = (id, activeId) => (id === activeId ? 'secondary' : 'light')

const Channel = ({ channel, currentChannel, changeChannel, handleOpenModal }) => {
  const { t } = useTranslation()

  return (
    <li className='nav-item w-100'>
      {channel?.removable ? (
        <Dropdown as={ButtonGroup} className='d-flex'>
          <Button
            variant={setVariantBtn(channel.id, currentChannel.id)}
            className='w-100 rounded-0 text-start text-truncate'
            onClick={() => changeChannel(channel)}
          >
            <span className='me-1'>{t('channels.channelPrefix')}</span>
            {channel.name}
          </Button>
          <Dropdown.Toggle
            split
            variant={setVariantBtn(channel.id, currentChannel.id)}
            id='dropdown-split-basic'
            className='flex-grow-0'
          >
            <span className='visually-hidden'>{t('channels.dropdown.toggle')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href='#' tabIndex='0' onClick={() => handleOpenModal({ type: 'remove', selectedChannel: channel })}>
              {t('channels.dropdown.delete')}
            </Dropdown.Item>
            <Dropdown.Item href='#' tabIndex='0' onClick={() => handleOpenModal({ type: 'rename', selectedChannel: channel })}>
              {t('channels.dropdown.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          variant={setVariantBtn(channel.id, currentChannel.id)}
          className='w-100 rounded-0 text-start'
          onClick={() => changeChannel(channel)}
        >
          <span className='me-1'>{t('channels.channelPrefix')}</span>
          {channel.name}
        </Button>
      )}
    </li>
  );
}

export default Channel
