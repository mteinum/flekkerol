requirejs.config({
  paths: {
    'text': '../lib/require/text',
    'durandal':'../lib/durandal/js',
    'plugins' : '../lib/durandal/js/plugins',
    'transitions' : '../lib/durandal/js/transitions',
    'knockout': '../lib/knockout/knockout-3.1.0',
    'toastr': '../lib/toastr/toastr.min'
    } 
});

define(['durandal/system', 'durandal/app', 'toastr'], function (system, app, toastr) {
	
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