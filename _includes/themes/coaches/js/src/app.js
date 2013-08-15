
  var App = {
    Models: {},
    Views: {},
    Collections:{},
    Utils: {}
  };

  App.eventBus = _.extend({}, Backbone.Events);

  App.Utils.extend = function(parent) {
    var child = function() { parent.apply(this, arguments); };
    var f = function() {
      this.constructor = child;
    };
    f.prototype = parent.prototype;
    child.prototype = new f();

    return child;
  };

  App.init = function() {
    var cards = new App.Collections.Cards();

    var menu =  new App.Views.Menu({ collection: cards });
    $('.menu-container').append(menu.render().el);

    var cardsView = new App.Views.Cards({ collection: cards });
    menu.$el.append(cardsView.render().el);
    cardsView.initializeSlider();

    cards.fetch();
  };

  window.app = {init: App.init};
