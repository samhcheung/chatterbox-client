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

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}


app.addMessage = function (message) {
  var date = new Date(message.createdAt);
  
  if( $('.chat').length === 100 ) {
    $('.chat').first().remove();
  }
    $('#chats').append('<div class= "chat">' + timeSince(date) + ' ago ' + _.escape(message.roomname) + ' ' + '<span class="username" onClick="app.addFriend()">' + _.escape(message.username) + '</span>' + ': ' + _.escape(message.text) + '</div>');
  
  //$('#chats').append('<div class= "chat">' + message.roomname + ' ' + '<a class="username">' + message.username + '</a>' + ': ' + message.text + '</div>');
};

app.addRoom = function (room) {
  $('#roomSelect').append('<div id="room">'+ room +'</div>');
};

app.addFriend = function() {
  console.log("add friend");

};

app.handleSubmit = function() {
  // upon button click
  var message = {};
  message.username = decodeURI (window.location.search.slice(10));
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

  setInterval(app.fetch, 1000);
  
});


