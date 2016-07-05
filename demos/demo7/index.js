jQuery(document).ready(function($) {
  var $timeline_block = $('.timeline-block');
  $timeline_block.each(function() {
    if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
      $(this).find('.timeline-content').addClass("is-hidden");
    }
  });
  $(window).on('scroll', function() {
    $timeline_block.each(function() {
      if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75) {
        $(this).find('.timeline-content').removeClass("is-hidden");
        $(this).find('.timeline-content').addClass("bounce-in");
      } else {
        $(this).find('.timeline-content').addClass("is-hidden");
        $(this).find('.timeline-content').removeClass("bounce-in");
      }
    })
  })


})
