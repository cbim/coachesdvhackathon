App.Models.Card = Backbone.Model.extend({
  defaults: {
    category: '',
    categoryName: '',
    order: 0,
    number: 0,
    title: '',
    content: '',
    breakBeforeCategory: false
  },

  initialize: function(){},

  parse: function(response) {
  	if (response.breakBeforeCategory === "true") {
  		response.breakBeforeCategory = true;
  	}
  	if (response.breakBeforeCategory === "false") {
  		response.breakBeforeCategory = false;
  	}
  	return response;
  }

});