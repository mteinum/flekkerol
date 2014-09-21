define(['websocket', 'knockout', 'toastr'], function(websocket, ko, toastr){
	
	return function(){
		var self = this;
		
		self.text = ko.observable();
		
		self.broadcast = function(){
			websocket.send(self.text());
		};
		
		self.getSensorList = function(){
			websocket.getSensorList();
		};
		
		self.closeSensor = function(){
			self.socket.close();
		};
		
		self.message = ko.observable();
		
		self.getMessage = function(){
			
			$.get('/hello', function(obj) {
				self.message(obj.message);
			});
			
		};
		
		// fire up a socket sensor
		var location = 'ws://' + document.location.host + '/temperature';
		
        self.socket = new WebSocket(location, 'sensor');
        
        self.socket.onerror = function(){
        	toastr.error('WS error', 'WebSocket Sensor');
        };
        
        self.socket.onmessage = function(msg){
        	toastr.info(msg, 'WebSocket Sensor');
        }
        
        self.socket.onopen = function(){
        	self.socket.send("id:1234");
        };

	};
});