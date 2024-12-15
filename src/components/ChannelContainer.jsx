import React from 'react';
import { Channel, useChatContext, MessageSimple } from 'stream-chat-react';
import { ChannelInner, CreateChannel, EditChannel } from './';

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
  const { channel } = useChatContext();

  if(isCreating) {
    return (
      <div className='channel__container'>
        <CreateChannel setIsCreating={setIsCreating} createType={createType} />
      </div>
    );
  }

  if(isEditing) {
    return (
      <div className='channel__container'>
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  //khởi tạo chat mới, nó sẽ là 1 chat rỗng, k có bất cứ nội dung gì bên trong.
  const EmptyState = () => {
    return (
      <div className='channel-empty__container'>
        <p className='channel-empty__first'>This is the beginning of your chat history</p>
        
        <p className='channel-empty__second'>Send messages, attachments, links, emojis, and more!</p>
      </div>
    )
  };

  return (
    <div className='channel__container'>
      <Channel 
        EmptyStateIndicator={EmptyState}
        Message = {(messageProps, i) => <MessageSimple key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  )
}

export default ChannelContainer