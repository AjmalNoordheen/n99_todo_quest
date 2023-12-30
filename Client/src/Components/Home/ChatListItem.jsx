import React from 'react';

function ChatListItem({ onClick, user, lastMessage }) {
  return (
    <div onClick={onClick} className='w-[96%] mt-1 h-16 flex md:gap-x-2 items-center rounded m-auto cursor-pointer'>
      <img className='h-12 md:h-full p-1 rounded-full' src="771198_man_512x512.png" alt="" />
      <div className='flex flex-col justify-center'>
        <h1 className='text-sm md:text-base font-semibold text-[#d5daf9]'>{user ? user.email : ''}</h1>
        <small className='text-[#8c9bfa'>{lastMessage ? lastMessage.message : ''}</small>
      </div>
    </div>
  );
}

export default ChatListItem;
