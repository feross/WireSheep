//Base story
//Returns the url the user was trying to reach for requests
var requestStory = {

	//Applies to requests
	appliesToPacket: function(packet){
		return packet['isResponse'] == false &&
		       packet['method'] == 'GET' &&
		       packet['path'].indexOf('.css') == -1 &&
		       packet['path'].indexOf('.js') == -1;
	},

	//Just return the url and time
	renderStory: function(packet){
		var url = 'http://' + packet['hostname'] + packet['path'];
		var now = new Date();
		var timeStr = now.getHours() + ":" + now.getMinutes();

    $.load(url, function(data) {
      var dom = $('<div>').html(data);
      var title = dom.find('title').text();
    });

    alert(title);

		var desc = title;
		return {
			href: url,
			favicon: "img/favicon.gif",
			desc: desc,
			time: timeStr
		}
	}
};