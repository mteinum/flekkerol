define(['knockout', 'plugins/router', 'recipes/datasource'] ,function(ko, router, datasource){
	return function(){
		var self = this;
		
		self.recipes = ko.observableArray();
		
		self.activate = function(){
			$.each(datasource.getRecipes(), function (index, obj){
				self.recipes.push(obj);
			});
		};
		
		self.brew = function(){
			
		};
		
		
	};
});