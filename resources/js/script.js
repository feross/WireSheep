//Set up the renderers
stories = [requestStory, youtubeStory];


window.Client = {
  handlePacket: function(data) {
    if (typeof data == "string") {
      data = $.parseJSON(data);
    }

    // Render each story
    for(var i in stories) {
      var story = stories[i];
      if(story.appliesToPacket(data))
        this.renderStory(users.getUserIndex(data), story.renderStory(data));
    }
  },

  renderStory: function(userIndex, storyData) {
    log(storyData);
    log(userIndex);
    if ($("#user"+userIndex).length == 0) {
      this.addUser(userIndex);
    }

    var story = $("#storyTemplate").tmpl(storyData);
    story
      .hide()
      .prependTo("#user"+userIndex+" .stories")
      .slideDown('fast');

  },

  addUser: function(userIndex) {
    $("#userTemplate").tmpl({
      num: userIndex,
      name: "User " + userIndex
    }).appendTo("#main");
  },

  setup: function() {
    // Hook up the handlePacket Qt event to the Client.handlePacket JS function
    window.Fireflock && Fireflock.handlePacket.connect(this, 'handlePacket');

    $('#startCapture').click(function() {
      window.Fireflock && Fireflock.startCapture();
    });

  }
}

$(function() {
  Client.setup();
  sim();
});


function sim() {
  var testPacket = {"type":"request", "path":"/home.php", "userIP":"127.0.0.1", "hostname":"www.nikilster.com"};
  var testPacket2 = {"type":"request", "path":"/watch?v=RF9PFJI_t5I&feature=feedrec_grec_index", "userIP":"100.0.0.1", "hostname":"www.youtube.com"};
  Client.handlePacket(testPacket);
  Client.handlePacket(testPacket);
  Client.handlePacket(testPacket);
  Client.handlePacket(testPacket);
  Client.handlePacket(testPacket);
  Client.handlePacket(testPacket2);
}