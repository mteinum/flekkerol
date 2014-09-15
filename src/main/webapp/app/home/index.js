define(['durandal/app', 'knockout'], function (app, ko) {

	return function(){
		var self = this;
		
		self.message = ko.observable();
		
		self.getMessage = function(){
			
			$.get('/flekkerol', function(obj) {
				self.message(obj.message);
			});
			
		};
		
	};

});