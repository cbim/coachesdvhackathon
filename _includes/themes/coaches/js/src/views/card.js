App.Views.Card = Backbone.View.extend({
  className: 'cardContent slide',

  templateName: '#card-template',

  initialize: function() {
    this.template = _.template($(this.templateName).html());

    this.model.view = this;
  },

  render: function() {
    this.$el.html( this.template(this.model.toJSON()) );
    return this;
  }
});