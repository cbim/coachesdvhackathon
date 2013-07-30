
  var App = {
    Models: {},
    Views: {},
    Collections:{}
  };

  App.eventBus = _.extend({}, Backbone.Events);

  App.init = function() {
    var cards = new App.Collections.Cards();
    var cardsView = new App.Views.Cards({collection: cards});
    cardsView.render();
    cards.fetch();
    $('#menu').append(cardsView.render().el);
  };

  window.app = {init: App.init};
