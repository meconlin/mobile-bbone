// Filename: models/post_collection
//
define([
  'backbone',
  'models/post',
], function(Backbone, PostModel) {

  var PostCollectionModel = Backbone.Collection.extend({
    url: REST+'/feed',
    model: PostModel,
    defaults:{
    },
    initialize: function () {},
  });


  return PostCollectionModel;
});