import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const TeamChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => {
  const { channel: activeChannel, client } = useChatContext();
  
  const ChannelPreview = () => (
    <p className='channel-preview__item'>
      # {channel?.data?.name || channel?.data?.id}
    </p>
  );
  
  //trả lại 1 mảng gồm các objects
  //[{}, {}]

  //do đó, ta chuyển hoá các members trong danh sách thành các Objects.
  //sau đó, lấy values của nó, lọc các members qua hàm filter bằng object destructuring.
  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
  
    //stream có tạo sẵn 1 tài khoản mặc định, nó có role admin
    //các tài khoản khác có role 'member' khi được tạo 1 cách thủ công (tạo qua sign up/ đăng nhập qua sign in)
    console.log(members[0]); 

    return (
      <div className='channel-preview__item single'>
        <Avatar 
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={24}
        />

        <p>{members[0]?.user?.fullName}</p>
      </div>
    )
  };

  return (
    <div 
      className={
        channel?.id === activeChannel?.id ? 'channel-preview__wrapper__selected' : 'channel-preview__wrapper'
      }
      onClick = {() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
        
        if(setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
    >
      {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
    </div>
  )
}

export default TeamChannelPreview