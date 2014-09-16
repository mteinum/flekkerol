define(['toastr'], function(toastr){
	
	return new function() {
		
		var self = this;
		
		var location = 'ws://' + document.location.host + '/temperature';
		
        self.socket = new WebSocket(location);
        
        
        
        self.socket.onmessage = function(evt){
        	console.info(evt.data, 'websocket');
        };

        self.socket.onclose = function(){
        	console.info('closed', 'websocket');
        	
        	console.log(self.socket);
        	
        };
        
        self.socket.onerror = function(evt){
        	console.log(evt);
        	toastr.error('onerror', 'websocket');
        };
        
        self.socket.onopen = function(evt){
        	console.info('websocket connected', 'websocket');
        	self.socket.send('foo bar');
        	
        	setInterval(function(){
        		self.socket.send('ping');
        	}, 1000 * 30); // send ping hvert 30sec
        	
        };
	};
});