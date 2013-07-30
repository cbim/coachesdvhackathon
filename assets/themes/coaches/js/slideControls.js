$(document).ready(function() {

    // $('a.showMenu').toggle(function() {
    //   $('#menu').animate({left: '16em'}, 300, function() {
    //     $('.iosSlider').iosSlider('lock');
    //   });
    // }, function() {
    //   $('#menu').animate({left: 0}, 300, function() {
    //     $('.iosSlider').iosSlider('unlock');
    //   });
    // });

    // $('.slideSelectors .item a').click(function() {
    //   var num = $(this).data('slide');
    //   $('.iosSlider').iosSlider('goToSlide', num);
    //   $('a.showMenu').click();
    //   return false;
    // });

  $('.iosSlider').iosSlider({
    desktopClickDrag: true,
    snapToChildren: true,
    infiniteSlider: true,
    navSlideSelector: '.sliderContainer .slideSelectors .item',
    autoSlide: false,
    scrollbar: true,
    scrollbarContainer: '.sliderContainer .scrollbarContainer',
    scrollbarMargin: '0',
    scrollbarBorderRadius: '0',
    keyboardControls: true
  });

});