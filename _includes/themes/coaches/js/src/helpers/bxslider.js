App.Models.BxSlider = App.Utils.extend(App.Models.Slider);

var p = App.Models.BxSlider.prototype;
p.init = function() {
  this.slider = this.$element.bxSlider(this.options);
};

p.goToSlide = function(num) {
  this.slider.goToSlide(num-1);
};

p.reload = function() {
  this.slider.reloadSlider();
};

p.destroy = function() {
  this.slider.destroySlider();
};

p.lock = function() {
  this.slider.lockSlider();
};

p.unlock = function() {
  this.slider.unlockSlider();
};

p.defaults = {
  pager: false,
  controls: false,
  infiniteLoop: false,
  adaptiveHeight: false,
  oneToOneTouch: false,
  swipeThreshold: 100
};