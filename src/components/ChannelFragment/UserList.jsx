import React, { useState, useEffect } from 'react';
import { Avatar, useChatChannel, useChatContext } from 'stream-chat-react';
import { InviteIcon } from '../../assets';

const ListContainer = ({ children }) => {
  
  return (
    <div className="user-list__container">
      <div className='user-list__header'>
        <p>User</p>
        <p>Invite</p>
      </div>

      {children}
    </div>
  )
}

//thong qua key la user => lay ra het thong tin item nguoi dung
const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false);
  const handleSelect = () => {
    if(selected) {
      setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id));
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
    }
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <div className='user-item__wrapper' onClick={handleSelect}>
      {/* username + avatar */}
      <div className='user-item__name-wrapper'>
        <Avatar 
          image={user.image}
          name={user.fullName || user.id}
          size={32}
        />

        <p className='user-item__name'>
          {user.fullName || user.id}
        </p>
      </div>

      {/* icon '✅' + icon ô trống. Nhấn vào để mời ng dùng */}
      { selected ? <InviteIcon /> : <div className='user-item__invite-empty'></div> }
    </div>
  )
}

const UserList = ({ setSelectedUsers }) => {
  //khi lam cac form, co the can nhac dung useChatContext thay vi useChatChannel
  //no hoat dong nhu 1 context/1 hook
  const { client } = useChatContext();

  const [users, setUsers] = useState([]); //set users list as an array.
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      if(loading) return;

      setLoading(true);

      try {
        //dk check: kiem tra gia tri phan hoi
        const response = await client.queryUsers(
          /*
            + ở đoạn $ne client.userID, có thể xử lí bằng cách để nó thành chuỗi trống
            
            + Cách nó hoạt động là, nó remove bản thân khỏi danh sách (Tức nếu anh A đăng nhập, anh A chỉ 
            thấy được những người khác. Anh A sẽ k thấy bản thân trong danh sách hiển thị ấy.)
          */
          { id: { $ne: client.userID} },
          { id : 1 },
          { limit: 8 }
        );

        if(response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setError(true);
        //console.error(error); 
      }
      //chay xong code tren, reset "setLoading" lai ve false.
      setLoading(false); 
    }

    //chỉ khi đang có kết nối (client đang connect) thì ta mới gọi hàm lấy user
     if(client) getUsers();
  }, []); //TODO: [filters]

  if(error) {
    return (
      <ListContainer>
        <div className='user-list__message'>
          Error loading, please refresh and try again.
        </div>
      </ListContainer>
    )
  }

  if(listEmpty) {
    return (
      <ListContainer>
        <div className='user-list__message'>
          No users found. Please try searching again.
        </div>
      </ListContainer>
    )
  }

  return (
    <ListContainer>
      {loading ? <div className='user-list__message'>
        Loading users...
      </div> : (
        users?.map((user, i) => (
          <UserItem 
            index={i}
            key={user.id}
            user={user}
            setSelectedUsers={setSelectedUsers} 
          />
        ))
      )}
    </ListContainer>
  )
}

export default UserList