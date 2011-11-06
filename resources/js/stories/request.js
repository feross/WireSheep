//Base story
//Returns the url the user was trying to reach for requests
var requestStory = {

	//Applies to requests
	appliesToPacket: function(packet){
	  var result = !packet['isResponse'] &&
		       packet['method'] == 'GET' &&
		       packet['host'].indexOf('google.com') >= 0 &&
		       packet['query'].indexOf('&q=') >= 0;
		return result;
	},

	//Just return the url and time
	renderStory: function(packet) {
		var url = 'http://' + packet['host'] + packet['path'];

		var now = new Date();
		var timeStr = now.getHours() + ":" + now.getMinutes();

    var term = packet['query'].match(/&q=(.+?)&/)[1];

		var desc = 'Searched for <b>' + term + '</b>';

		return {
			href: 'http://www.google.com/search?q=' + term,
			favicon: "http://" + packet['host'] + "/favicon.ico",
			desc: desc,
			time: timeStr
		}
	}
};