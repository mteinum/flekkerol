define(['websocket', 'knockout'], function(websocket, ko){
	
	return function(){
		var self = this;
		
		self.text = ko.observable();
		
		self.send = function(){
			websocket.send(self.text());
		};
		
		self.message = ko.observable();
		
		self.getMessage = function(){
			
			$.get('/hello', function(obj) {
				self.message(obj.message);
			});
			
		};

	};
});