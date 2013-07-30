App.Views.Menu = Backbone.View.extend({
  id : 'menu',

  templateName: '#menu-template',

  itemTemplateName: '#menu-item-template',

  events: {
    'click a.showMenu': 'toggle',
    'click .slideSelectors .item a': 'goToSlide'
  },

  initialize: function() {
    this.template = _.template($(this.templateName).html());
    this.itemTemplate = _.template($(this.itemTemplateName).html());

    this.listenTo(this.collection, 'reset', this.addAll);
    this.listenTo(this.collection, 'add', this.addOne);
  },

  render: function() {
    this.$el.html( this.template() );

    this.$itemsContainer = this.$('.slideSelectors ul');
    
    if(this.collection.length && this.$wrapper.empty()) {
      this.addAll();
    }

    return this;
  },

  addAll: function() {
    this.collection.each(this.addOne, this);
  },

  addOne: function(card) {
    var data = card.toJSON(),
        index = this.collection.indexOf(card);

    data.slide = index + 1;

    var $item = $(this.itemTemplate(data));

    if (index === 0) {
      this.$itemsContainer.prepend($item);  
    }
    else {
      var $prev = this.$itemsContainer.find('[data-slide="' + (index - 1) +'"]');

      if ($prev.length) {
        $(prev).after($item);
      }
      else {
        this.$itemsContainer.append($item);
      }
      
    }
  },

  toggle: function() {
    if (this.isOpen()) {
      this.close();
    }
    else {
      this.open();
    }

    return false;
  },

  open: function() {
    this.$el.animate({left: '16em'}, 300, function() {
      $(this).addClass('open');
      App.eventBus.trigger('open:menu');
    });
  },

  close: function() {
    this.$el.animate({left: 0}, 300, function() {
      $(this).removeClass('open');
      App.eventBus.trigger('close:menu');
    });
  },

  isOpen: function() {
    return this.$el.hasClass('open');
  },

  goToSlide: function(event) {
    var num = $(event.target).data('slide');
    App.eventBus.trigger('show:slide', num);
    this.close();

    return false;
  }
});