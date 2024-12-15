import React from 'react';
import { AddChannel } from '../../assets';

const TeamChannelList = ({ children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing }) => {
  if(error) {
    return type === 'team' ? (
      <div className='team-channel-list'>
        <p className='team-channel-list__message'>
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null
  }

  if(loading) {
    return (
      <div className='team-channel-list'>
        <p className='team-channel-list__message loading'>
          {type === 'team' ? 'Channels' : 'Messages'} loading...
        </p>
      </div>
    )
  }

  return (
    <div className='team-channel-list'>
      {/* creating title for header */}
      <div className='team-channel-list__header'>
        <p className='team-channel-list__header__title'>
          {type === 'team' ? 'Channels' : 'Direct messages'}
        </p>

        {/* button to add channel */}
        <AddChannel 
          isCreating={isCreating} 
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          type={type === 'team' ? 'team' : 'messaging'}
        />
      </div>

      {/* showing children contents */}
      {children}
    </div>  
  )
}

export default TeamChannelList