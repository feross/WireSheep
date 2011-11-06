//Base story
//Returns the url the user was trying to reach for requests
var requestStory = {

	//Applies to requests
	appliesToPacket: function(packet){
	  var result = !packet['isResponse'] &&
		       packet['method'] == 'GET';
		return result;
	},

	//Just return the url and time
	renderStory: function(packet){
		var url = 'http://' + packet['host'] + packet['path'];

		var now = new Date();
		var timeStr = now.getHours() + ":" + now.getMinutes();

    var title;
    alert(url);
    $.get(url, function(data) {
      var dom = $('<div>').html(data);
      title = dom.find('title').text();
    });

    alert('title ' + title);

		var desc = url;
		return {
			href: url,
			favicon: "img/favicon.gif",
			desc: desc,
			time: timeStr
		}
	}
};