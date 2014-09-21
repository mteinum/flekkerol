define(['toastr', 'knockout', 'durandal/app'], function(toastr, ko, app){
	
	return new function() {
		
		var self = this;
		self.readyState = ko.observable();

		var location = 'ws://' + document.location.host + '/temperature';
		
        self.socket = new WebSocket(location);
        self.readyState(self.socket.readyState);
        
        self.socket.onmessage = function(evt){
        	toastr.info(evt.data, 'websocket');
        	
        	// alle meldinger vi får inn på dette grensesnittet er json.
        	// felles struktur er { type: "", data: "" }
        	
        	var obj = JSON.parse(evt.data);

        	app.trigger(obj.type, obj.data);
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
        
        self.getSensorList = function(){
        	self.socket.send('sensor-list');
        };
        
        self.subscribe = function(id){
        	self.socket.send('subscribe:' + id);
        };
	};
});