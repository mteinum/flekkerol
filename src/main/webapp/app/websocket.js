define(['toastr', 'knockout'], function(toastr, ko){
	
	return new function() {
		
		var self = this;
		self.readyState = ko.observable();

		var location = 'ws://' + document.location.host + '/temperature';
		
        self.socket = new WebSocket(location);
        self.readyState(self.socket.readyState);
        
        self.socket.onmessage = function(evt){
        	toastr.info(evt.data, 'websocket');
        };

        self.socket.onclose = function(){
        	self.readyState(self.socket.readyState);
        };
        
        self.socket.onerror = function(evt){
        	console.log(evt);
        	toastr.error('onerror', 'websocket');
        };
        
        self.socket.onopen = function(evt){
        	self.readyState(self.socket.readyState);
        	setInterval(function(){
        		self.socket.send('ping');
        	}, 1000 * 30); // send ping hvert 30sec
        };
        
        self.send = function(msg){
        	self.socket.send(msg);
        };
	};
});