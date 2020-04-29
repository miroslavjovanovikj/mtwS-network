const express     = require("express"),
      middleware  = require("../middleware"),
      bodyParser  = require('body-parser'),
      User        = require("../models/user"),
      Msn         = require('../models/historyMsg');

    const app =express();
    const server= app.listen(9000);
    const io = require('socket.io')(server);

const getChat = (req, res) => {
   Msn.find({}, function(err, all){
      if(err){
        console.log(err);
      }else{
        res.render("msn/msn",{all:all})
        io.on('connect', function(socket){
            socket.username=req.user.name;
        });
      }
    });
  }
const socketOn = () => {
  io.on('connect', (socket) => {
    console.log("New user connected")
    socket.on('change_username',(data) => {
      socket.username = data.username
    });
    socket.on('new_message', (data)=>{
      Msn.create(data)
      .then(newMessage=>{
            newMessage.msessage=data.message;
            newMessage.username=socket.username
            newMessage.save((err)=>{
              if(err){
                console.log(err);
              }
              io.sockets.emit('new_message', {message:data.message, username:socket.username})
            });
      })
      .catch(err=>{
        console.log(err)
      })
    });
    socket.on('typing', (data)=>{
      socket.broadcast.emit('typing', {username:socket.username})
    });
  });
}
module.exports ={
  getChat,
  socketOn
}
