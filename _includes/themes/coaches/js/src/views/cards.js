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

    this.$wrapper = this.$el;

    this.createSlider();

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

    this.slider.reload();
  },

  menuOpened: function() {
    this.slider.lock();
  },

  menuClosed: function() {
    this.slider.unlock();
  },

  showSlide: function(num) {
    this.slider.goToSlide(num);
  },

  initializeSlider: function() {
    this.slider.init();
  },

  createSlider: function() {
    var options = {};

    if (Modernizr.touch) {
      options.controls = false;
    }
    else {
      options.controls = true;
    }

    options.onSlideAfter = _.bind(this.onSlideAfter, this);
    options.onSliderLoad = _.bind(this.onSliderLoad, this);
    console.log(options);

    if (! this.slider) {
      this.slider = new App.Models.BxSlider(options, this.$el);
    }
  },

  // After changing to a new slide, execute this
  onSlideAfter: function($slideElement, oldIndex, newIndex) {
    App.eventBus.trigger('slide:change', $slideElement, oldIndex, newIndex);
  },

  // When slider is loaded the first time, execute this
  onSliderLoad: function(currentIndex) {
    App.eventBus.trigger('slider:load', currentIndex);
  }

});
