import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { axiosInstance } from "../../Axios/UserAxios";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import ChatList from "./ChatList";
import ChatMessage from "./ChatMessage";
import { toast } from "react-hot-toast";
import { Logout } from "../../Redux/Slice";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const email = useSelector((store) => store.user.email);
  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [showChatArea, setShowChatArea] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [socket, setSocket] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  const messageHolder = useRef(null);

  useEffect(() => {
    axiosInstance.get("/homePageListing").then((res) => {
      setUsers(res.data.users.filter((item) => item.email !== email)); /*homepage users listing */
    });
  }, [email]);
 
  useEffect(() => {
    console.log("Connecting to WebSocket...");
    const newSocket = io("http://localhost:5000/chat");
    setSocket(newSocket);                                    /*Sockect connecting */
    
    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [receiver]);

  useEffect(() => {
    if (socket) {
      socket.emit("setup", receiver);

 /*Responce message From the serverSide */
      socket.on("messageResponse", (message, receivedChatId) => {
        if (receiver === receivedChatId || email === receivedChatId) {
          setRefresh(refresh + 1);
          setAllMessages((prevMessage) => [...prevMessage, message]);
        }
      });
    }
  }, [socket, receiver]);
  useEffect(() => {
    selectReceiver(receiver);
  }, [refresh]);

  /*Fetching chats from the Server side When user click on the another users*/
  const selectReceiver = async (selectedReceiver) => {
    try {
      const res = await axiosInstance.get(
        `/getChatMessages?receiver=${selectedReceiver}&&sender=${email}`   
      );                                                              
      setAllMessages(res.data.allMessages);
      setReceiver(selectedReceiver);
      setShowChatArea(true);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async () => {
    if (message.length > 0) {
      const newMessage = {
        message: message,              /*Sending message between users */
        receiverEmail: receiver,
        senderEmail: email,
        timestamp: Date.now(),
      };
      setMessage("");
      socket.emit("newMessage", newMessage, receiver);
    }
  };

 /*For scrolling down to the latest message */
   useEffect(() => {
    if (messageHolder.current)
      messageHolder.current.scrollTop = messageHolder.current.scrollHeight;
  }, [allMessages]);


 /*For deleting the message of the sender only */
   const handleDeleteMessage = async (index) => {
    try {
      const res = await axiosInstance.delete(`/deleteDiscussion?id=${index}`);
      console.log("Delete response:", res.data);
      if (res.status) {
        toast.success("successfully deleted");
        setAllMessages(allMessages.filter((item) => item.id !== index));
      } else {
        toast.error("unseccessfull");
      }
    } catch (error) {
      console.log(error);
    }
  };

 /*Logout function */
   const logout = () => {
    try {
      dispatch(Logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-full h-16 flex justify-between text-[#ccd4fc] font-semibold items-center bg-[#232946]">
        <h1 className="pl-3">Welcome ~ {email}</h1>
        <p
          onClick={logout}
          className="mr-2 px-2 py-1 rounded text-black cursor-pointer bg-[#ccd4fc] border"
        >
          Logout
        </p>
      </div>
      <div className="flex-grow flex h-[90%] justify-center items-center bg-[#232946]">
        <ChatList
          showChatArea={showChatArea}
          setShowChatArea={setShowChatArea}
          users={users}
          onSelect={selectReceiver}
          lastMessages={allMessages}
        />
        <div className={`w-[70%] md:w-[67%] h-[98%] bg-white flex flex-col`}>
          <div className="w-full relative h-[9%] pl-2 flex gap-2 border-[#404fb2] border-l border-b bg-[#2c346b]">
            {receiver ? (
              <img
                className="h-12 p-1 rounded-full"
                src="771198_man_512x512.png"
                alt=""
              />
            ) : (
              ""
            )}
            <div className="flex flex-col justify-center">
              <h1 className="font-semibold text-[#d5daf9]">{receiver}</h1>
            </div>
          </div>
          <div
            ref={messageHolder}
            className="h-[81%]  overflow-y-scroll border-[#404fb2] border-l bg-[#1a2465]"
          >
            {receiver ? (
              <>
                {allMessages.length > 0 ? (
                  allMessages.map((message) => (

                    <>
                    <ChatMessage
                      key={message.message}
                      sender={message.senderEmail}
                      email={email}
                      message={message}
                      onDelete={() => handleDeleteMessage(message.id)}
                    />
                    </>
                  ))
                ) : (
                  <p>No messages</p>
                )}
              </>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <img className="animate-pulse" src="chat.png" alt="" />
              </div>
            )}
          </div>
          <div className="w-full h-[10%] flex items-center justify-around bg-[#2c346b] border-[#404fb2] border-l border-t">
            {receiver ? (
              <>
                <div className="h-10 w-[93%]">
                  <input
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    type="text"
                    className="w-full h-full bg-[#97a0de] font-semibold rounded outline-none pl-2"
                  />
                </div>
                <IconButton onClick={sendMessage}>
                  <SendIcon className="text-[#97a0de] " />
                </IconButton>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
