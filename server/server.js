const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {Users} = require('./utils/users');
const {generateLocationMessage, generateMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.bubble)) {
      return callback('Nickname and bubble name required.');
    }

    socket.join(params.bubble);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.bubble);

    io.to(params.bubble).emit('updateUserList', users.getUserList(params.bubble));
    socket.emit('newMessage', generateMessage('FR', 'Welcome to bubble'));
    socket.broadcast.to(params.bubble).emit('newMessage', generateMessage('FR', `${params.name} has joined bubble`));

    callback();
  })

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)) {
      io.to(user.bubble).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if(user) {
        io.to(user.bubble).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude,coords.longitude));
    }
  })

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if(user) {
      io.to(user.bubble).emit('updateUserList', users.getUserList(user.id));
      io.to(user.bubble).emit('newMessage', generateMessage('FR', `${user.name} has left for land.`));
    }
  });
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})
