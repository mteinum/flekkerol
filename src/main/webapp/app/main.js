requirejs.config({
  paths: {
    'text': '../lib/require/text',
    'durandal':'../lib/durandal/js',
    'plugins' : '../lib/durandal/js/plugins',
    'transitions' : '../lib/durandal/js/transitions',
    'knockout': '../lib/knockout/knockout-3.1.0',
    'toastr': '../lib/toastr/toastr.min',
    'jquery': '../lib/jquery/jquery-2.1.1.min',
    'bootstrap': '../lib/bootstrap/bootstrap.min'
    },
    
    shim: {
    	jquery: {
    		exports: '$'
    	},
    	bootstrap: {
    		deps: ['jquery'],
    		exports: 'bootstrap'
    	}
    },
    
    urlArgs: 'v=1'
});

define(['durandal/system', 'durandal/app', 'toastr', 'bootstrap'],
		function (system, app, toastr) {
	
   system.debug(true);
   
   toastr.options = {
		    "debug": false,
		    "positionClass": "toast-bottom-right",
		    "onclick": null,
		    "fadeIn": 300,
		    "fadeOut": 1000,
		    "timeOut": 5000,
		    "extendedTimeOut": 1000
		};
 
   app.title = 'Flekkerøl';
 
   app.configurePlugins({
     router:true,
     dialog: true
   });
 
   app.start().then(function() {
     app.setRoot('shell');
   });
});