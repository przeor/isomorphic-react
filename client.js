/* jshint node:false */
(function() {

  'use strict';

  var Debug = require('debug');
  var debug = require('debug')('app:client:debug');
  var error = require('debug')('app:client:error');
  
  // attach our debug tool to the window 
  // so we can change debug settings
  window.Debug = Debug;

  try {
    var React = require('react');
    var Router = require('react-router');
    var app = require('./app');
    var dehydratedState = window[app.uid];
	  
    debug('rehydrating app');
    app.rehydrate(dehydratedState, function(err, context) {
        if (err) {
          error(err);
          return;
        }
        debug('React Rendering');
        Router.run(app.getAppComponent(),Router.HistoryLocation, function(Handler, state) {
					React.render(
            React.createElement(
              Handler,
							React.__spread(
								{},
								state, // Params from React Router 
								{context: context.getComponentContext()} // our fluxible context
							)
            ),
            document.getElementById(app.uid)
          );
          debug('React Rendered');
        });

    });
  } catch (err) {
    error(err);
  }
}).call(this);
