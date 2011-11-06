//Set up the renderers
stories = [requestStory];


window.Client = {
  handlePacket: function(data) {

	//Render each story
	for(var i in stories) {
		if(stories[i].appliesToPacket(data))
			//renderStory(users.getUserIndex(data), story.renderStory(data));
			alert('User index ' + users.getUserIndex(data) + ": " + stories[i].renderStory(data));
	}
  },

	setup: function() {
		// Hook up the handlePacket Qt event to the Client.handlePacket JS function
	  //Fireflock.handlePacket.connect(this, 'handlePacket');
		
	  $('#startCapture').click(function() {
	    //Fireflock.startCapture();
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

