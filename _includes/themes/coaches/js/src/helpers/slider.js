App.Models.Slider = function(options, element) {
  options || (options = {});
  this.options = $.extend({}, this.defaults, options);
  this.element = element;
  this.$element = $(element);
  this.slider = null;
}

var p = App.Models.Slider.prototype;
p.init = function(options, elements) {
  return this;
};

p.goToSlide = function(num) {
  return this;
};

p.reload = function() {
  return this;
};

p.destroy = function() {
  return this;
};

p.lock = function() {
  return this;
};

p.unlock = function() {
  return this;
};

p.defaults = {};