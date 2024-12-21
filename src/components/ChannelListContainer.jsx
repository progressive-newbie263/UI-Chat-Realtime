import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
// import ChannelSearch from './ListFragment/ChannelSearch.jsx';
// import TeamChannelPreview from './ListFragment/TeamChannelPreview.jsx';
// import TeamChannelList from './ListFragment/TeamChannelList.jsx';
import Cookies from 'universal-cookie';
import HospitalIcon from '../assets/hospital.png';
import LogoutIcon from '../assets/logout.png';

const cookies = new Cookies();

const SideBar = ({ logout }) => (
  <div className='channel-list__sidebar'>
    {/* channel chung (icon benh vien) */}
    <div className='channel-list__sidebar__icon1'>
      <div className='icon1__inner'>
        <img src={HospitalIcon} alt='Hospital-icon' width="30" />
      </div>
    </div>

    {/* 
      icon1__inner ? 
      nut' log out   
    */}
    <div className='channel-list__sidebar__icon2'>
      <div className='icon1__inner' onClick={logout}>
        <img src={LogoutIcon} alt='Logout-icon' width="30" />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className='channel-list__header'>
    <p className='channel-list__header__text'>Medical Page</p>
  </div>
);

//tao 1 filter moi
const customChannelTeamFilter = (channels) => {
  return channels.filter(channel => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
  return channels.filter(channel => channel.type === 'messaging');
}

const ChannelListContent = ({
  isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer
}) => {
  const { client } = useChatContext();

  const logout = () => {
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('phoneNumber');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');

    window.location.reload(); //sau khi dang xuat. reload lai, dua nguoi dung ve trang dang nhap
  }

  const filters = {
    members: {
      $in: [client.userID]
    }
  }

  return (
    <>
      <SideBar logout={logout} />
      <div className='channel-list__list__wrapper'>
        <CompanyHeader />
        
        <ChannelSearch setToggleContainer={setToggleContainer} />

        {/* default */}
        <ChannelList 
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList 
              {...listProps}
              isCreating={isCreating} 
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type='team'
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer} 
              type='team'
            />
          )}
        />

        {/* làm cho các tin nhắn trực tiếp (direct messages) */}
        <ChannelList 
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList 
              {...listProps}
              isCreating={isCreating} 
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type='messaging'
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview 
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type='messaging'
            />
          )}
        />
      </div>
    </>
  );
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className='channel-list__container'>
        <ChannelListContent
          setIsCreating={setIsCreating} 
          setCreateType={setCreateType} 
          setIsEditing={setIsEditing}
        />
      </div>

      {/* only for responsive design purpose. Toggle is used to turn on/off the container content */}
      <div className='channel-list__container-responsive'
        style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor:"#005fff" }}
      >
        <div className='channel-list__container-toggle'
          onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}
        />

        <ChannelListContent
          setIsCreating={setIsCreating} 
          setCreateType={setCreateType} 
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  )
}

export default ChannelListContainer;