var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createMessage', ({
    from: '蓉宝',
    text: '飞宝爱你哦'
  }))
})

socket.on('disconnect', function () {
  console.log('Disconnected to server');
})

socket.on('newEmail', function (email) {
  console.log('New email', email);
})

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
})
