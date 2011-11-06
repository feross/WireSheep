//Base story
//Returns the url the user was trying to reach for requests

var requestStory = {
	
	//Applies to requests
	appliesToPacket: function(packet){
		return packet['type'] == "request";
	},
	
	//Just return the url and time
	renderStory: function(packet){
		var url = packet['hostname'] + packet['path'];
		var now = new Date();
		var timeStr = now.getHours() + ":" + now.getMinutes();
		return "Clicked to open:" + url + " at " + timeStr;
	}
}