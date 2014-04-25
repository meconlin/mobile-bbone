// Filename: views/header_auth
define([
  'jquery',
  'backbone',
  'text!../partials/HeaderView.html'
], function($, Backbone, template){
    var HeaderView = Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        render: function () {
            $(this.el).html(template);        
            return this;
        },
        selectMenuItem: function (menuItem) {
            $('.nav li').removeClass('active');
            if (menuItem) {
                $('.' + menuItem).addClass('active');
            }
        }
    });
  // Our module now returns our view
  return HeaderView;
});