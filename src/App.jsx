import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { ChannelListContext, Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelContainer, ChannelListContainer, Auth } from './components';

import './App.css';
import 'stream-chat-react/dist/css/v2/index.css';


const cookies = new Cookies(); //cookies để lên đầy.

const apiKey = 'npw8ezktcrhe';
const client = StreamChat.getInstance(apiKey);
const authToken = cookies.get('token');


if (authToken) {
  client.connectUser({
    //k cần liệt kê lại token vào đây.
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    phoneNumber: cookies.get('phoneNumber'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
  }, authToken); //thêm authToken vào để kết nối. authToken này cũng chính là cái authToken ở phía dưới.
}

const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  //không có auth token thì trả về trang đăng nhập/đki
  if(!authToken) {
    return <Auth />
  }

  //nếu đã có auth token, trả về trang nhắn tin bên trong.
  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team light'>
        {/* 
          nên dùng 'context API' de liet ke cac props 
          
          + kiểm tra các trường trên. Với channelContainer. 1 loại content được tạo
          (createType) sẽ tham chiếu qua giá trị setCreateType của nó.

          + với channelListContainer (danh sách các icon: logout, hospital, ...)
          kiểm tra các thuộc tính : có đang tạo ko ? có đang edit ko ? Loại gì
        */}
        <ChannelListContainer 
          isCreating = {isCreating}
          setIsCreating = {setIsCreating}
          setIsEditing = {setIsEditing}
          setCreateType={setCreateType}
        />

        <ChannelContainer 
          isCreating = {isCreating}
          setIsCreating = {setIsCreating}
          isEditing = {isEditing}
          setIsEditing = {setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  )
}

export default App;