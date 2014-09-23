define(['websocket', 'knockout', 'toastr', 'durandal/app'],
		function(websocket, ko, toastr, app){
	
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
		
		self.subscribeId = ko.observable();
		
		self.subscribe = function(){
			websocket.subscribe(self.subscribeId());
			toastr.info('subscribe to sensor ' + self.subscribeId());
		};
		
		self.sensorAddSubscription = app.on('sensor-add').then(function(data){
			self.subscribeId(data);
			self.subscribe();
		});
		
		self.sensorListSubscription = app.on('sensor-list').then(function(data){
			$.each(data, function(index, sensorId){
				self.subscribeId(sensorId);
				self.subscribe();
			});
		});
		
		self.deactivate = function(){
			self.sensorAddSubscription.off();
			self.sensorListSubscription.off();
		};
		
		self.message = ko.observable();
		
		self.getMessage = function(){
			
			$.get('/hello', function(obj) {
				self.message(obj.message);
			});
			
		};
		
		self.sensorOpen = ko.observable(false);
		
		// fire up a socket sensor
		var location = 'ws://' + document.location.host + '/temperature';
		
        self.socket = new WebSocket(location, 'sensor');
        
        self.socket.onerror = function(){
        	toastr.error('WS error', 'WebSocket Sensor');
        };
        
        self.socket.onclose = function(){
        	self.sensorOpen(false);
        };
        
        self.socket.onmessage = function(msg){
        	toastr.info(msg, 'WebSocket Sensor');
        }
        
        self.socket.onopen = function(){
        	self.sensorOpen(true);
        };
        
        self.sensorId = ko.observable();
        
        self.initSensor = function(){
        	self.socket.send('id:' + self.sensorId());
        };
        
        self.temperature = ko.observable();
        
        self.sendTemperature = function() {
        	self.socket.send('temperature:' + self.temperature());
        };
        
        // get list of sensors
        websocket.getSensorList();
        
	};
});