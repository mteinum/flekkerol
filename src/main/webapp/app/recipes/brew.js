define([ 'knockout', 'recipes/datasource', 'moment' ], function(ko, datasource,
		moment) {

	return function() {
		var self = this;

		self.name = ko.observable();
		self.brewDate = ko.observable(moment().format('YYYY-MM-DD'));
		self.brewer = ko.observable();

		self.activate = function(id) {

			datasource.getRecipe(id).done(function(recipe) {
				self.name(recipe.name);
			});
		};

	};

});