// Filename: views/header_unauth
define([
  'jquery',
  'backbone',
  'text!partials/HeaderViewUnAuth.html'
], function($, Backbone, template){
    var HeaderViewUnAuth = Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        render: function () {
            $(this.el).html(template);        
            return this;
        }
    });
  // Our module now returns our view
  return HeaderViewUnAuth;
});