import React from 'react';
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
)

const ChannelListContainer = ({
  isCreating, setIsCreating, setCreateType, setIsEditing
}) => {
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

  return (
    <>
      <SideBar logout={logout} />
      <div className='channel-list__list__wrapper'>
        <CompanyHeader />
        
        <ChannelSearch />

        {/* default */}
        <ChannelList 
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <TeamChannelList 
              {...listProps}
              type='team'
              isCreating={isCreating} 
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview 
              {...previewProps}
              type='team'
            />
          )}
        />

        {/* làm cho các tin nhắn trực tiếp (direct messages) */}
        <ChannelList 
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <TeamChannelList 
              {...listProps}
              type='messaging'
              isCreating={isCreating} 
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview 
              {...previewProps}
              type='messaging'
            />
          )}
        />
      </div>
    </>
  )
}

export default ChannelListContainer;