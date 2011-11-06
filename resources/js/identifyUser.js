var identifyUserFilter = {

	appliesToPacket: function(packet) {
		return packet['type'] == "response" && packet['hostname'] == "www.facebook.com";
	},

	getName: function(packet) {
		
		var html = packet['body'];
		var name = $(html).find(".headerTinymanName").text();
		console.log("name in getName:" + name);
		return name;
	}
}