define([ 'knockout', 'plugins/router', 'recipes/datasource', 'moment' ],
		function(ko, router, datasource, moment) {
			return function() {
				var self = this;

				self.moment = moment;
				self.recipes = ko.observableArray();
				self.activate = function() {

					datasource.getRecipes().done(function(data) {
						$.each(data, function(index, obj) {
							self.recipes.push(obj);
						});
					});
				};
			};
		});