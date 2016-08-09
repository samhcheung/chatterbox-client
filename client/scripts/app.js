// YOUR CODE HERE:

var app = {};

app.server = 'https://api.parse.com/1/classes/messages';


app.init = function () {

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
      var arr = data.results;
      for ( var i = 0; i < arr.length; i++) {
        app.addMessage(arr[i]);
      }
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
  $('#chats').append('<div class= "chat">' + _.escape(message.roomname) + ' ' + '<span class="username" onClick="app.addFriend()">' + _.escape(message.username) + '</span>' + ': ' + _.escape(message.text) + '</div>');
  //$('#chats').append('<div class= "chat">' + message.roomname + ' ' + '<a class="username">' + message.username + '</a>' + ': ' + message.text + '</div>');
};

app.addRoom = function (room) {
  $('#roomSelect').append('<div id=' + room + '></div>');
};

app.addFriend = function() {
  console.log("add friend");

};

app.handleSubmit = function() {
  // upon button click
  var message = {};
  message.username = window.location.search.slice(10);
  message.text = $('#message').val();
  app.send(message);
};

$(document).ready(function () {
  $('form').on('submit', function(e) {
    e.preventDefault();
    app.handleSubmit();
  });
  app.fetch();
  $('.username').click(app.addFriend);

  setInterval( app.fetch, 1000);
});


