define(['plugins/router', 'websocket'], function (router) {
 
  return {
     router: router,
     activate: function () {
       router.map([
         { route: '', title:'Home', moduleId: 'home/index', nav: true },
         { route: 'recipes', title: 'Recipes', moduleId: 'recipes/index', nav: true },
         { route: 'recipes/:id', title: 'Recipe', moduleId: 'recipes/recipe', nav: false },
         { route: 'brews', title: 'Brew log', moduleId: 'brews/index', nav: true },
         { route: 'about', title: 'About', moduleId: 'about/index', nav: true }
       ]).buildNavigationModel();
 
       return router.activate();
     }
   };
});