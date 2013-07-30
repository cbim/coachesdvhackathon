
  var App = {
    Models: {},
    Views: {},
    Collections:{}
  };

  App.eventBus = _.extend({}, Backbone.Events);

  App.init = function() {
    var cards = new App.Collections.Cards();

    var menu =  new App.Views.Menu({ collection: cards });
    $('.menu-container').append(menu.render().el);

    var cardsView = new App.Views.Cards({ collection: cards });
    menu.$el.append(cardsView.render().el);

    cards.fetch();
  };

  window.app = {init: App.init};
