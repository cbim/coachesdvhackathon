
  var App = {
    Models: {},
    Views: {},
    Collections:{},
    Router: {},
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

  App.Utils.capitalize = function(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  App.init = function() {
    App.workspace = new App.Router.Workspace();

    var cards = new App.Collections.Cards();

    var menu =  new App.Views.Menu({ collection: cards });
    $('.menu-container').append(menu.render().el);

    var cardsView = new App.Views.Cards({ collection: cards });
    menu.$el.append(cardsView.render().el);
    cardsView.initializeSlider();

    $.when( cards.fetch({reset: true}) ).then(function() {
      Backbone.history.start();
    });
  };

  window.app = {init: App.init, capitalize: App.Utils.capitalize};
