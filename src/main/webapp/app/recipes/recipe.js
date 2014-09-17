define([ 'knockout', 'recipes/datasource' ], function(ko, datasource) {
	return function() {
		var self = this;

		self.brewId = ko.observable();
		self.name = ko.observable();
		self.url = ko.observable();
		self.mashing = ko.observableArray();
		self.selectedMashing = ko.observable();

		self.selectMashing = function() {
			if (self.selectedMashing() == this) {
				self.selectedMashing(null);
			} else {
				self.selectedMashing(this);
			}
		};

		self.boilDuration = ko.observable();

		self.hops = ko.observableArray();

		self.activate = function(id) {

			datasource.getRecipe(id).done(function(recipe) {
				self.brewId(id);
				self.name(recipe.name);
				self.url(recipe.url);
				self.mashing(recipe.mashing);
				self.boilDuration(recipe.boilDuration);
				self.hops(recipe.hops);
			});

		};

	};
});