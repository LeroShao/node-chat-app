var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
})

socket.on('disconnect', function () {
  console.log('Disconnected to server');
})

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  jQuery('#messages').append(`<li>${message.from}: ${message.text}</li>`);
});

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  // var li = jQuery(`<li>${message.from}: </li>`);
  var a = jQuery('<a target="_blank">My current location</a>');
  a.attr('href', message.url);
  li.text(`${message.from}: `);
  li.append(a);
  jQuery('#messages').append(li);
  console.log(message);
})
//e--event
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  })
})

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('send location');
    alert('Unable to fetch location');
  })
})
