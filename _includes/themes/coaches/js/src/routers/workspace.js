App.Router.Workspace = Backbone.Router.extend({

  initialize: function() {
    this.route(/^(\d+)$/, "goToCard");
  },

  goToCard: function(num) {
    App.eventBus.trigger('show:slide', num);
  }
});