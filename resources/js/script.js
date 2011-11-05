window.Client = {
  handlePacket: function(data) {
    alert(data);
  }

	setup: function() {
		// Hook up the handlePacket Qt event to the Client.handlePacket JS function
	  Fireflock.handlePacket.connect(window.Client, 'handlePacket');

	  $('#startCapture').click(function() {
	    Fireflock.startCapture();
	  });
	}
}

$(Client.setup);