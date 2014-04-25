// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  paths: {
    jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min',
    jquery_cookie: 'http://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.0/jquery.cookie.min',
    underscore: 'http://ajax.cdnjs.com/ajax/libs/underscore.js/1.6.0/underscore-min',
    backbone: 'http://ajax.cdnjs.com/ajax/libs/backbone.js/1.1.2/backbone-min',
    moment: 'http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.6.0/moment.min',
    bootstrap: 'http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/js/bootstrap.min',
    partials: '../partials',
    router:'router'
  },

  waitSeconds: 40
});

require([

  // Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});