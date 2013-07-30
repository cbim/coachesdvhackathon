App.Views.Cards = Backbone.View.extend({
  className: 'cardContainer pages',

  templateName: '#card-list-template',

  initialize: function() {
    this.template = _.template($(this.templateName).html());

    this.listenTo(this.collection, 'reset', this.addAll);
    this.listenTo(this.collection, 'add', this.addOne);

    this.listenTo(App.eventBus, 'open:menu', this.menuOpened);
    this.listenTo(App.eventBus, 'close:menu', this.menuClosed);
    this.listenTo(App.eventBus, 'show:slide', this.showSlide);
  },

  render: function() {
    this.$el.html( this.template() );

    this.$slider = this.$('.iosSlider');
    this.$wrapper = this.$('.slider');
    
    if(this.collection.length && this.$wrapper.empty()) {
      this.addAll();
    }

    return this;
  },

  addAll: function() {
    this.collection.each(this.addOne, this);
  },

  addOne: function(card) {
    var view = new App.Views.Card({model: card}),
        index = this.collection.indexOf(card);

    view.render();

    if (index === 0) {
      this.$wrapper.prepend(view.el);  
    }
    else {
      var prev = this.collection.at(index-1);

      if (prev.view) {
        $(prev.view.el).after(view.el);  
      }
      else {
        this.$wrapper.append(view.el);
      }
      
    }
  },

  menuOpened: function() {
    this.$slider.iosSlider('lock');
  },

  menuClosed: function() {
    this.$slider.iosSlider('unlock');
  },

  showSlide: function(num) {
    this.$slider.iosSlider('goToSlide', num);
  }
});