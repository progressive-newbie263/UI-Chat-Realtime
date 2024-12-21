import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import { SearchIcon } from '../../assets';
import ResultDropdown from './ResultDropdown';


const ChannelSearch = ({ setToggleContainer }) => {
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery]  = useState('');
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

  //call the func everytime the query changes
  useEffect(() => {
    if(!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }
  }, [query])

  const getChannels = async (text) => {
    try {
      const channelResponse = client.queryChannels({
        type: 'team',
        name: { $autocomplete: text },
        members: { $in: [client.userID] }
      });

      const userResponse = client.queryUsers({
        id: { $ne: client.userID },
        name: { $autocomplete: text }
      });
      //ép cho 2 response chạy cùng lúc. Nếu thêm 2 cái await trước 2 cái queryUsers thì nó
      //chỉ cho channelResponse chạy trước, sau đó đến userResponse chạy.
      const [channels, {users}] = await Promise.all([channelResponse, userResponse]);

      if(channels.length) setTeamChannels(channels);
      if(users.length) setDirectChannels(users);
    } catch (error) {
      setQuery('');
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
  };

  const setChannel = (channel) => {
    setQuery('');
    setActiveChannel(channel);
  };

  return (
    <div className='channel-search__container'>
      <div className='channel-search__input__wrapper'>
        <div className='channel-search__input__icon'>
          <SearchIcon />
        </div>

        <input 
          className='channel-search__input__text' 
          placeholder='Search' 
          type='text'
          value={query}
          onChange={onSearch}
        />
      </div>

      {query && (
        <ResultDropdown 
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleContainer={setToggleContainer}
        />
      )}
    </div>
  )
}

export default ChannelSearch