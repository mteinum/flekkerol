define(['toastr', 'knockout'], function(toastr, ko){
	
	return new function() {
		
		var self = this;
		
		self.readyState = ko.observable();
		
		// init
		
		var location = 'ws://' + document.location.host + '/temperature';
		
        self.socket = new WebSocket(location);
        self.readyState(self.socket.readyState);
        
        self.socket.onmessage = function(evt){
        	console.info(evt.data, 'websocket');
        };

        self.socket.onclose = function(){
        	self.readyState(self.socket.readyState);
        	console.info('closed', 'websocket');
        	
        	console.log(self.socket);
        	
        };
        
        self.socket.onerror = function(evt){
        	console.log(evt);
        	toastr.error('onerror', 'websocket');
        };
        
        self.socket.onopen = function(evt){
        	self.readyState(self.socket.readyState);
        	console.info('websocket connected', 'websocket');
        	self.socket.send('foo bar');
        	
        	setInterval(function(){
        		self.socket.send('ping');
        	}, 1000 * 30); // send ping hvert 30sec
        };
	};
});