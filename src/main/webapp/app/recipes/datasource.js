define(function(){
	
	return new function(){
		
		var self = this;
		
		self.recipes = [
                        {
                        	id: 1,
                            name: 'RYE IPA',
                            added: new Date(),
                            url: 'http://www.bryggselv.no/users/binderiet_mystore_no/Image/Olsett_oppskrifter/Rye_IPA.pdf',
                            mashing: [
                                      { duration: 60, temperature: 64 },
                                      { duration:  5, temperature: 77 }
                                     ],
                            sparging: { },
                            boilDuration: 90,
                            hops: [
                                   { time: 60, description: '9g Chinook, pellets, 12 % aa' },
                                   { time: 15, description: '50 g Columbus, pellets, 12,9 %' },
                                   { time: 15, description: '50 g Simcoe, pellets, 13,5 %' },
                                   { time:  2, description: '50 g Columbus, pellets, 12,9 %' },
                                   { time:  2, description: '50 g Simcoe, pellets, 13,5 %' }
                                   ]
                            // TODO: Dry hops
                        },
                        {
                        	id: 2,
                        	name: 'ABC Firewood Stout',
                        	added: new Date(),
                        	url: 'http://www.bryggselv.no/users/binderiet_mystore_no/Image/Olsett_oppskrifter/ABC_Firewood_Stout.pdf',
                        	mashing: [
                        	          { duration: 60, temperature: 64 },
                        	          { duration:  5, temperature: 77 }
                        	          ],
                        	sparging: {},
                        	boilDuration: 90,
                        	hops: [
                        	       { time: 90, description: '72 g East Kent Goldings, pellets, 4,5 %' },
                        	       { time: 90, description: '2 stk Chinook pellets' }
                        	       ]
                        },
                        {
                        	id: 3,
                        	name: 'Lucky Jack',
                        	added: new Date(),
                        	url: 'http://www.bryggselv.no/users/binderiet_mystore_no/Image/Olsett_oppskrifter/Lucky_Jack.pdf',
                        	mashing: [
                        	          { duration: 20, temperature: 52 },
                        	          { duration: 20, temperature: 67 },
                        	          { duration: 20, temperature: 72 },
                        	          { duration:  5, temperature: 78 }
                        	          ],
                        	sparging: {},
                            boilDuration: 90,
                            hops: [
                                   { time: 60, description: '3g Perle, 9,4 %,' },
                                   { time: 15, description: '30g Amarillo, 12%' },
                                   { time:  5, description: '30g Chinook, 11,6%' },
                                   { time:  5, description: '15g Citra, 12%' }
                                   ]
                        },
                        {
                        	id: 4,
                        	name: 'Santas Self Medication',
                        	added: new Date(),
                        	mashing: [],
                        	sparging: {},
                            boilDuration: 90
                        }
                        ];
		
		self.getRecipes = function(){
			return self.recipes;
		};
		
		self.getRecipe = function(id){
			var e = self.recipes.filter(function (obj){ return obj.id == id; });
			
			if (e.length == 0)
				return null;
			
			return e[0];
		};
		
	};
	
	
});