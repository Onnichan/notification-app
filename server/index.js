const express = require('express');
const app = express();
const http = require("http").createServer(app);
const {Server} = require('socket.io');
const {PORT} = require('./config');

const io = new Server(http,{
  cors: {
    origin: "http://localhost:3000",
  }
});

let onlineUsers = [];
const addNewUser = (username, socketId) => {
  !onlineUsers.some(user => user.username === username) &&
  onlineUsers.push({username, socketId});

  return onlineUsers;
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
};

const getUser = username => {
  return onlineUsers.find(user => user.username === username);
};


io.on("connection", socket => {
  
  socket.on("newUser", username => {
    console.log(username);
    console.log('addnewUser',addNewUser(username, socket.id));
  })

  socket.on("sendNotification", ({senderName, receiverName, type}) => {
    console.log('receivername',receiverName);
    const receiver = getUser(receiverName);
    if(receiver){
      console.log(receiver, senderName, type);
      return io.to(receiver.socketId).emit("getNotification", {
        senderName,
        type,
      });
    }
    console.log('User not exist!!');
  })

  socket.on("sendText", ({senderName, receiverName}) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getText", {
      senderName,
      text,
    });
  });

  socket.on("disconnect", ()=> {
    removeUser(socket.id);
  })
})

http.listen(PORT,() => {
  console.log(`Running in PORT : ${PORT}`);
})



