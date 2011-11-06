//Set up the renderers
stories = [requestStory, youtubeStory];


window.Client = {
  //maps each client-server pair to the most recent request from that client to that server
  //...responses from server>client are later assumed to correspond
  requestMap: {},

  handlePacket: function(data) {
    if (typeof data == "string") {
      data = $.parseJSON(data);
    }

    //Match requests and responses
    var sip = data.serverIP; //.substring(0, data.serverIP.indexOf(":"));
    var uip = data.userIP; //.substring(0, data.userIP.indexOf(":"));
    var key = "server"+sip+"user"+uip;
    if(data.isResponse){
      data.request = Client.requestMap[key];
      log("Got response, matched with request? "+!!data.request);
    } else {
      Client.requestMap[key] = data;
    }

    // Make sure it's not a request from us
    if (data.userAgent && data.userAgent.indexOf("trololol") >= 0){
      return;
    }
    if (data.request && data.request.userAgent && data.request.userAgent.indexOf("trololol") >= 0){
      return;
    }

    // Make sure it's not AJAX
    // TODO

    // Render each story
    for(var i in stories) {
      var story = stories[i];
      if(story.appliesToPacket(data))
        this.renderStory(users.getUserIndex(data), story.renderStory(data));
    }

		//Try to get the identity
		if(identifyUserFilter.appliesToPacket(data)){
			this.renderUserName(users.getUserIndex(data), identifyUserFilter.getName(data));
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

    story.colorbox({iframe:true, width:"80%", height:"80%"});

  },

	renderUserName: function(userIndex, name) {
		console.log('setting name to: ' + name);
		$("#user" + userIndex).find("h1").text(name);
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
  // sim();
});

function sim() {
  var testPacket = {"type":"request", "path":"/home.php", "userIP":"127.0.0.1", "hostname":"www.nikilster.com"};
  var testPacket2 = {"type":"request", "path":"/watch?v=RF9PFJI_t5I&feature=feedrec_grec_index", "userIP":"100.0.0.1", "hostname":"www.youtube.com"};
  var testPacket3 = {"type":"response", "path":"/watch?v=RF9PFJI_t5I&feature=feedrec_grec_index", "userIP":"100.0.0.1", "hostname":"www.facebook.com", "body":"<div><a class='headerTinymanName' href='test'>Nikil Viswanathan</a></div>"};

  Client.handlePacket(testPacket);
  Client.handlePacket(testPacket);
  Client.handlePacket(testPacket);
  Client.handlePacket(testPacket);
  Client.handlePacket(testPacket);
}
