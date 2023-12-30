 import React from 'react';
import ChatListItem from './ChatListItem';

function ChatList({ users, onSelect, lastMessages,setShowChatArea,showChatArea }) {
  return (
    <div className='w-[30%]  md:w-[22%]  h-[98%]  bg-[#2c346b]'>
      <div className='h-[3rem] w-full flex justify-center'>
        <h1 className='border-b border-[#404fb2] w-[96%] md:text-xl text-left p-3 font-semibold text-[#ccd4fc]'>Chats</h1>
      </div>
      {users ? users.map((user, index) => (
        <ChatListItem
          key={index}
          onClick={() => onSelect(user.email)}
          user={user}
          lastMessage={lastMessages[user.email]}
        />
      )) : ""}
    </div>
  );
}

export default ChatList;
