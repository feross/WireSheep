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

		var desc = "Visited <b>Greek prime minister set to form new SDJKHJKLSDHKJLFH - CNN.com</b>.";
		return {
			href: url,
			favicon: "img/favicon.gif",
			desc: desc,
			time: timeStr
		}
	}
};