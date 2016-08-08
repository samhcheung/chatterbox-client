// YOUR CODE HERE:

var app = {};

app.server = 'https://api.parse.com/1/classes/messages';

app.init = function () {
  $('.username').click(app.addFriend());
  $('#send .submit').submit(app.handleSubmit());

};

app.send = function (message) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

};

app.fetch = function () {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

};

app.clearMessages = function () {
  $('#chats').html('');

};

app.addMessage = function (message) {
  $('#chats').append('<div>' + message.roomname + ' ' + '<a class="username">' + message.username + '</a>' + ': ' + message.text + '</div>');
  app.init();
};

app.addRoom = function (room) {
  $('#roomSelect').append('<div id=' + room + '></div>');
};

app.addFriend = function() {
  

};

app.handleSubmit = function() {


};




