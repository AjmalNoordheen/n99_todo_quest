const express = require('express')
const cors = require('cors')
const app = express()
const baseRouter = require('./Routers/baseRouter')
const db = require('./Model/db')
const socketIo = require("socket.io");

app.use(cors())
app.use(express.json())
app.use('/',baseRouter)

  
const server = app.listen(3000,()=>console.log('Server started successfully'))

const io = socketIo(server, {
	cors: {
		origin: "*",
		credentials: true, // Corrected property name
	  },
});

io.on("connection", (socket) => {
	socket.on("setup", (chatId) => {
		socket.join(chatId);
	});

	socket.on("newMessage", (message, chatId) => {
		console.log("mEssage recieved", message, "on ", chatId);
		io.emit("messageResponse", message, chatId);
		// chatController.addMessage(message,chatId)
	});

	// socket.on("read", (timestamp, chatId,senderId) => {
	// 	io.of("/chat").emit("readResponse", timestamp, chatId,senderId);
	// });
});