const express = require('express');
const cors = require('cors');
const app = express();
const baseRouter = require('./Routers/baseRouter');
const db = require('./Model/db');
const SocketIO = require('socket.io');
const { saveChatMessage, deleteDiscussion } = require('./Controllers/baseController');

app.use(cors());
app.use(express.json());
app.use('/', baseRouter);

const server = app.listen(5000, () => console.log('Server started successfully'));

const io = SocketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true, 
  	methods:["GET","POST","DELETE"]
  },
});

io.of('/chat').on("connection", (socket) => {
  console.log('Client connected:', socket.id);
   socket.on("setup", (chatId) => {
     socket.join(chatId);
  });

  socket.on("newMessage", (message, chatId) => {
    io.of("/chat").emit("messageResponse", message, chatId);
    saveChatMessage(message, chatId);
  });
  
  socket.on("deleteMessage",(message)=>{
    io.of("/chat").emit("deleteResponce",message);
    deleteDiscussion(message.index)
  })

});
