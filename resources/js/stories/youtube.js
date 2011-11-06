//Youtube Story
//Renders a youtube link
var youtubeStory = {
	
	appliesToPacket: function(packet){
		//May want to change this to a substring
		return packet['hostname'] == "www.youtube.com";
	},
	
	renderStory: function(packet){
		var url = "http://" + packet['hostname'] + packet['path'];
		var now = new Date();
		var timeStr = now.getHours() + ":" + now.getMinutes();
		var favicon = "img/favicon.gif";
		
		var videoID = this.getVideoID(packet['path']);
		var desc = '<iframe class="youtube-player" type="text/html" width="250" height="200" src="http://www.youtube.com/embed/' + videoID + '" frameborder="0"> </iframe>';
		
		return {
			href: url,
			favicon: favicon,
			desc: desc,
			time: timeStr
		}
	 },
		
		getVideoID: function(path){
			//url is in the form: /watch?v=0i2Xu87brR8&
			var startPos = path.indexOf("watch?v=");
			var endPos = path.indexOf("&");

			//invalid url
			if(startPos == -1) return 0;
			
			//skip "watch?v="
			var offset = 8;
			startPos += offset;
			//Account for the /
			endPos -= (offset + 1);
			
			//return the video ID
			if(endPos != -1)
			{
				console.log("end position:"  + endPos);
				console.log(path.substr(startPos,endPos));
				return path.substr(startPos, endPos);
			}
			else 
				return path.substr(startPos);
		}
		
};