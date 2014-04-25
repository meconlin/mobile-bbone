// Filename: models/post
//
define([
  'backbone',
], function(Backbone) {

  var PostModel = Backbone.Model.extend({
    url: REST+'/post',
    defaults:{
    },
    initialize: function () {},
  });

  return PostModel;
});