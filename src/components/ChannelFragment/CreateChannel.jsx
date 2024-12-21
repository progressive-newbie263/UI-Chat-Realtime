import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import UserList from './UserList';
import { CloseCreateChannel } from '../../assets';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);

  const handleChange = (e) => {
    e.preventDefault();
    setChannelName(e.target.value);
  }
  
  return (
    <div className='channel-name-input__wrapper'>
      <p>Name</p>
      <input value={channelName} onChange={handleChange} placeholder='Enter channel...' />
      <p>Add Members</p>
    </div>
  )
};

const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
  const [channelName, setChannelName] = useState('');

  const createChannel = async (event) => {
    event.preventDefault();
    
    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers
      });

      await newChannel.watch();

      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID]); //reset lai tim kiem.
      setActiveChannel(newChannel); //chuyen sang ket noi voi channel moi.
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='create-channel__container'>
      <div className='create-channel__header'>
        {/* opening */}
        <p>{createType === 'team' ? 'Create a new channel' : 'Send a Direct Message' }</p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} /> }
      <UserList setSelectedUsers={setSelectedUsers} />

      {/* 
        showing channel/ create a new channel.
        If it is a team, create channel. Otherwise, create a group for messaging purposes. 
      */}
      <div className='create-channel__button-wrapper' onClick={createChannel}>
        <p>
          {createType === 'team' ? 'Create Channel' : 'Create Message Group' }
        </p>
      </div>
    </div>
  )
}

export default CreateChannel