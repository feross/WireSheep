//Set up the renderers
stories = [requestStory];


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
    if ($("#user"+userIndex).length == 0) {
      this.addUser(userIndex);
    }
    $("#storyTemplate").tmpl(storyData).appendTo("#user"+userIndex+" .stories");
  },

  addUser: function(userIndex) {
    $("#userTemplate").tmpl({num: userIndex, name: "User " + num}).appendTo("#main");
  },

  setup: function() {
    // Hook up the handlePacket Qt event to the Client.handlePacket JS function

    window.Fireflock && Fireflock.handlePacket.connect(this, 'handlePacket');

    $('#startCapture').click(function() {
      window.Fireflock && Fireflock.startCapture();
    });

    var that = this;
    $('#simulatePacket').click(function(){
      var testPacket = {"type":"request", "path":"/home.php", "userIP":"127.0.0.1", "hostname":"www.nikilster.com"};
      var testPacket2 = {"type":"request", "path":"/home.php", "userIP":"100.0.0.1", "hostname":"www.nikilster.com"};
      that.handlePacket(testPacket);
      that.handlePacket(testPacket2);

  })
  }
}

$(function() {
  Client.setup();
});

