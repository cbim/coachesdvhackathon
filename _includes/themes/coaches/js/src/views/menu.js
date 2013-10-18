App.Views.Menu = Backbone.View.extend({
  id : 'menu',

  templateName: '#menu-template',

  itemTemplateName: '#menu-item-template',

  singleCategoryTemplateName: '#menu-single-category-template',

  events: {
    'click a.showMenu': 'toggle',
    'click .js-slide-link': 'goToSlide',
    'click .menu__category': 'showCategory'
  },

  currentClass: 'current',

  initialize: function() {
    this.template = _.template($(this.templateName).html());
    this.itemTemplate = _.template($(this.itemTemplateName).html());
    this.singleCategoryTemplate = _.template($(this.singleCategoryTemplateName).html());

    this.listenTo(App.eventBus, 'slider:load', this.onSliderLoad);
    this.listenTo(App.eventBus, 'slide:change', this.onSlideChange);

    this.listenTo(this.collection, 'reset', this.addAll);
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
    _.each(this.collection.byCategory(), this.addCategory, this);
  },

  addCategory: function(items, category) {
    items = _.map(items, function(o, i) {
      var d = o.toJSON();
      d.slide = this.collection.indexOf(o) + 1;
      return d;
    }, this);

    var data = {
      category: category,
      items: items
    };

    var html = '';
    if (items.length == 1) {
      html = this.singleCategoryTemplate(data);
    }
    else {
      html = this.itemTemplate(data);
    }
    this.$itemsContainer.append( html );
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
      // index is 0-based but slide numbers are 1-based.
      var $prev = this.$itemsContainer.find('[data-slide="' + index +'"]');

      if ($prev.length) {
        $prev.parent('li').after($item);
      }
      else {
        this.$itemsContainer.append($item);
      }
      
    }
  },

  showCategory: function(event) {
    var $elem = $(event.target);

    if ($elem.hasClass('open')) {
      this.closeCategory($elem);
    }
    else {
      this.openCategory($elem);
    }

    return false;
  },

  closeCategory: function($elem) {
    $elem.removeClass('open');
  },

  openCategory: function($elem) {
    this.$('.open').toggleClass('open');
    $elem.addClass('open');
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

    this.navigate(num);

    return false;
  },

  onSliderLoad: function(currentIndex) {
    var $current = this._getMenuLink(currentIndex + 1);

    this._makeCurrent( $current );
    this.openCategory($current.parents('.menu__category'));

    this.navigate(currentIndex + 1);
  },

  onSlideChange: function($slideElement, oldIndex, newIndex) {
    var $prev = this._getMenuLink(oldIndex + 1),
        $current = this._getMenuLink(newIndex + 1);

    this._removeCurrent($prev);
    this._makeCurrent($current);

    this.openCategory($current.parents('.menu__category'));

    this.navigate(newIndex + 1);
  },

  _removeCurrent: function($elem) {
    $elem.removeClass(this.currentClass);
  },

  _makeCurrent: function($elem) {
    $elem.addClass(this.currentClass);

    $('body').removeClass().addClass($elem.data('category'));
  },

  _getMenuLink: function(index) {
    return this.$('.menu__category a[data-slide="' + index + '"]');
  },

  navigate: function(num) {
    App.workspace.navigate(num + '');
  }

});