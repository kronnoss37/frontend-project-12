import React from 'react'

const className = (id, activeId) => `w-100 rounded-0 text-start btn ${id === activeId ? 'btn-secondary' : ''}`;

const Channel = ({ channel, currentChannel, changeChannel }) => {  
  return (
    <li className='nav-item w-100'>
      <button type='button' className={className(channel.id, currentChannel.id)} onClick={() => changeChannel(channel)}>
        <span className='me-1'>#</span>
        {channel.name}
      </button>
    </li>
  );
};

export default Channel