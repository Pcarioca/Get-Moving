var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 1) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

