define(['websocket', 'knockout', 'toastr', 'durandal/app'],
		function(websocket, ko, toastr, app){
	
	
	ko.bindingHandlers.canvas = {
		    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		    	var ctx = element.getContext('2d');
		    	valueAccessor()(ctx, element.width, element.height);
		    }
		};
	
	
	return function(){
		var self = this;
		
		self.currentTemperature = 0;
		
		self.drawTemperature = function(ctx, width, height){
	        var targetTemperature = 63; // grader

	        //  write markers
	        var h_top = 20;
	        var h_bottom = height - 30;

	        var h_degree = (h_bottom - h_top) / 100;
	        var y_zero = h_top + 100 * h_degree;

	        function writeMarkers() {
	        	for (var y = 0; y < 100; y += 10){
	        		ctx.moveTo(10, h_top + y * h_degree);
	        		ctx.lineTo(20, h_top + y * h_degree);
	        	}

	        	ctx.strokeStyle = '#fff';
	        	ctx.stroke();
	        }

	        function writeTarget() {

	        	var y_target = y_zero - (targetTemperature * h_degree);

	        	ctx.beginPath();
	        	ctx.moveTo(5, y_target);
	        	ctx.lineTo(100, y_target);

	        	ctx.strokeStyle = '#ff0000';
	        	ctx.stroke();
	        };

	        function writeMeter(){

	        	ctx.beginPath();

	        	var y_temperature = y_zero - (self.currentTemperature * h_degree);

	        	ctx.fillStyle = '#aaa';
	        	ctx.fillRect(30, y_temperature, 20, y_zero - y_temperature);

	        	ctx.strokeStyle = '#aaa';
	        	ctx.font="20px Helvetica";

	        	var txt = self.currentTemperature + '\xB0C';

	        	ctx.fillText(txt, 60, y_temperature + 20);
	        }

	        function writeZeroLine(){
	        	ctx.beginPath();
	        	ctx.moveTo(10, y_zero);
	        	ctx.lineTo(100, y_zero);
	        	ctx.strokeStyle = '#aaa';
	        	ctx.stroke();
	        }

	        function render(){
	        	ctx.fillStyle = '#000';
	        	ctx.fillRect(0, 0, width, height);
	        	writeMarkers();
	        	writeMeter();
	        	writeZeroLine();
	        	writeTarget();
	        }

	        (function animloop(){
	          window.requestAnimationFrame(animloop);
	          render();
	        })();
		};
				
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
		
		self.sensorDataSubscription = app.on('sensor-data').then(function(data){
			self.currentTemperature = data.value / 1000;
		});
		
		self.deactivate = function(){
			self.sensorAddSubscription.off();
			self.sensorListSubscription.off();
			self.sensorDataSubscription.off();
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