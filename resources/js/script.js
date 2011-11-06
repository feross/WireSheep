//Set up the renderers
stories = [requestStory, youtubeStory];


window.Client = {
  //maps each client-server pair to the most recent request from that client to that server
  //...responses from server>client are later assumed to correspond
  requestMap: {},

  handlePacket: function(data) {
    $('body').append($('<div>').text(data));

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
      if(story.appliesToPacket(data)) {
        alert("begin");
        alert(users.getUserIndex(data));
        alert('end');
        this.renderStory(users.getUserIndex(data), story.renderStory(data));
      }
    }

		//Try to get the identity
		if(identifyUserFilter.appliesToPacket(data)){
			this.renderUserName(users.getUserIndex(data), identifyUserFilter.getName(data));
		}
  },

  renderStory: function(userIndex, storyData) {
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
  var testPacket = {"isResponse":false,"serverIP":"87.238.50.204:80","userIP":"10.32.142.68:53598","method":"GET","path":"/4.7-snapshot/qwebsettings.html","query":"","host":"doc.qt.nokia.com","cookies":"__switchTo5x=7; __unam=f59ceff-133752ee443-5b04aad3-2; __utma=262969676.49335727.1320514537.1320518103.1320520985.3; __utmc=262969676; __utmz=262969676.1320520985.3.3.utmcsr=blog.qt.nokia.com|utmccn=(referral)|utmcmd=referral|utmcct=/2010/06/03/qt-is-going-over-the-top-to-bring-online-video-to-connected-tvs/; __utma=15568163.1687546187.1320514529.1320543628.1320547915.6; __utmb=15568163.7.10.1320547915; __utmc=15568163; __utmz=15568163.1320547915.6.4.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided)","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.106 Safari/535.2"};

  Client.handlePacket(testPacket);
}