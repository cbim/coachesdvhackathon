App.Collections.Cards = Backbone.Collection.extend({
  model: App.Models.Card,

  comparator: 'order',

  url: '/api/cards.json',

  parse: function(response, options) {
    if (_.isArray(response) && response[response.length-1] === false) {
      response.pop();
    }
    return response;
  },

  byCategory: function() {
    return this.groupBy(function(o) {  return o.get('categoryName') || o.get('category'); });
  }
});