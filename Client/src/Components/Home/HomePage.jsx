import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { axiosInstance } from '../../Axios/UserAxios';
import {io} from 'socket.io-client'

function HomePage() {
  const email = useSelector((store)=>store.user.email)
  const [users,setUsers] = useState([])
  const [receiver,setReceiver] = useState('')
  const [showChatArea,setShowChatArea] = useState(false)
  const [message,setMessage] = useState('')
  const [allMessage,setAllMessage] = useState([])
  const [socket,setSocket] = useState('')

  useEffect(()=>{
    axiosInstance.get('/homePageListing').then((res)=>{
      console.log(res.data.users[0].email)
      setUsers(res.data.users.filter(item =>
        item.email !== email
      ))
    })
  },[])

  useEffect(()=>{
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket)
    return ()=>{
      if(newSocket) newSocket.disconnect()
    }
  },[receiver])

  useEffect(()=>{
    if(socket){
      socket.emit('setup',receiver)
      socket.on('messageResponse',(message,receivedChatId)=>{
        if(receiver === receivedChatId){
          setAllMessage((prevMessage)=>[...prevMessage,message])
        }
      })
    }
  },[socket])

  const selectReceiver = (receiver)=>{
    try {
      setReceiver(receiver)
      setShowChatArea(true)
    } catch (error) {
      console.log(error)
    }
  }

  const sendMessage = async () => {
    console.log(message.length);

    if (message.length > 0) {
      let newMessage = {
        text: message,
        senderEmail: email,
        timestamp: Date.now(),
      };
      socket.emit("newMessage", newMessage, receiver);
    }
    setMessage("");
    }

  return (
    <div className='w-screen h-screen flex flex-col'>
      <div className='w-full h-16 flex justify-between text-[#ccd4fc] font-semibold  items-center bg-[#232946]'>
          <h1 className='pl-3'>Welcome ~ {email}</h1>
          <p className='mr-2 px-2 py-1 rounded text-black cursor-pointer bg-[#ccd4fc] border'>Logout</p>
      </div>
      <div className='flex-grow flex justify-center items-center bg-[#232946]'>
          <div className='w-[25%] h-[98%] bg-[#2c346b]'>
            <div className='h-14 w-full flex justify-center'>
            <h1 className=' border-b border-[#404fb2]  w-[96%] text-xl text-left p-3 font-semibold text-[#ccd4fc]'><ForumIcon/> Chats</h1>
            </div>
              {users ? users.map(item =>
                 <div onClick={()=>selectReceiver(item.email)}  className='w-[96%]  mt-1 h-16 flex gap-x-2 rounded m-auto'>
                 <img className='h-full p-1 rounded-full' src="771198_man_512x512.png" alt="" />
                 <div className='flex flex-col justify-center '>
                   <h1 className='font-semibold text-[#d5daf9]'>{item ? item.email : ''}</h1>
                   <small className='text-[#8c9bfa]'>Message</small>
                 </div>
               </div>
              ) : ""}
           
          </div>
          <div className='w-[67%] h-[98%] flex flex-col'>
              <div className='w-full h-14 pl-2 flex gap-2 border-[#404fb2]  border-l border-b bg-[#2c346b]'>
                 <img className='h-full p-1 rounded-full' src="771198_man_512x512.png" alt="" />
              <div className='flex flex-col justify-center  '>
                <h1 className='font-semibold text-[#d5daf9]'>Name</h1>
              </div>
              </div>
              <div className='flex-grow   border-[#404fb2] border-l bg-[#1a2465]'>
              {allMessage.length>0?
                allMessage.map((message)=>
                  <>
                  {message?.senderEmail === email ?
                  <div className="col-start-7 col-end-13 p-3 rounded-lg flex-row-reverse">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      <img
                        src='771198_man_512x512.png'
                        alt="Avatar"
                        className="h-full w-full rounded-full"
                      />
                    </div>
                    <div className="relative mr-3 w-96 text-sm   bg-indigo-100 py-1 px-4 shadow rounded-xl">
                      <div className="break-words w-full flex items-center">
                      <div className='mr-1'>
                       <IconButton>
                        <DeleteSweepIcon fontSize='small'/>
                        </IconButton>
                       </div>
                        {message ? message.text :''}
                      </div>
                      <small className="text-xs float-right  text-gray-400">
                        {new Date(
                          message?.timestamp
                        ).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </small>
                    </div>
                  </div>
                </div>
                  : 
                   <div className="col-start-7 col-end-13 p-3 rounded-lg">
                   <div className="flex items-center justify-start flex-row-reverse">
                     <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                       <img
                         src='771198_man_512x512.png'
                         alt="Avatar"
                         className="h-full w-full rounded-full"
                       />
                     </div>
                     <div className="relative mr-3 w-96 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                       <div className="break-words w-full flex items-center">
                       <div className='mr-1'>
                        <IconButton>
                         <DeleteSweepIcon fontSize='small'/>
                         </IconButton>
                        </div>
                         jjjjjjkhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
                       </div>
                       <small className="text-xs text-gray-400">
                         {/* {" "}
                         {new Date(
                           message?.timestamp
                         ).toLocaleString("en-US", {
                           hour: "numeric",
                           minute: "numeric",
                           hour12: true,
                         })} */}
                       </small>
                       {/* <small>{new Date(message.timestamp) < new Date(timeStamp) ? 'read' : 'unread'}</small> */}
                     </div>
                   </div>
                 </div>
                  }
                           
                            
                            
                           
                     </>
                ):'hello'}
              
                 
                          
              
              </div>
              <div className='w-full h-14 flex items-center justify-around bg-[#2c346b] border-[#404fb2]  border-l border-t'>
                <div className='h-10 w-[93%]'>
                  <input onChange={(e)=>setMessage(e.target.value)} value={message} type="text" className='w-full h-full bg-[#97a0de]  font-semibold rounded outline-none pl-2' />
                </div>
               <IconButton onClick={sendMessage} >
                 <SendIcon className='text-[#97a0de] '/>
               </IconButton>
              </div>
          </div>
      </div>
    </div>
  )
}

export default HomePage