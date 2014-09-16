define(['plugins/router', 'websocket', 'knockout'], function (router, websocket, ko) {
 
  return {
	 readyState: ko.computed(function(){ return 'ws-readyState-' + websocket.readyState(); }),
     router: router,
     activate: function () {
       router.map([
         { route: '', title:'Home', moduleId: 'home/index', nav: true },
         { route: 'recipes', title: 'Recipes', moduleId: 'recipes/index', nav: true },
         { route: 'recipes/:id', title: 'Recipe', moduleId: 'recipes/recipe', nav: false },
         { route: 'brews', title: 'Brew log', moduleId: 'brews/index', nav: true },
         { route: 'about', title: 'About', moduleId: 'about/index', nav: true },
         { route: 'test', title: 'Test', moduleId: 'test/index', nav: true }
       ]).buildNavigationModel();
 
       return router.activate();
     }
   };
});