jQuery(document).ready(function($) {
  var $timeline_block = $('.timeline-block');
  //不在可视区内则不出现
  $timeline_block.each(function() {
    if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
      $(this).find('.timeline-content').addClass("is-hidden");
    }
  });
  $(window).on('scroll', function() {
    $timeline_block.each(function() {
      if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.timeline-content').hasClass("is-hidden")) {
        $(this).find('.timeline-content').removeClass("is-hidden");
        $(this).find('.timeline-content').addClass("bounce-in");
      }
    })
  })


})
