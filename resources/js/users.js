//Users object
//Stores users, gives the id of the user

var users = {

	//Ip addresses of the user - we are using this as the unique identifier
	ips: [],
	getUserIndex: function(packet) {
		alert(1);
		var packetUserIP = packet["userIP"];

		//Check if the user is already in our system
		for(var i in this.ips){
			if(packetUserIP == this.ips[i])
				return i;
		}

		alert(2);

		//Add the user and return the new id
		this.ips.push(packetUserIP);
		return this.ips.length-1;
	}
};