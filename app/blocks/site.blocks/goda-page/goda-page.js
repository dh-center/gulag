$('.goda__period_item').on('click', function () {
  $('.goda__period_item').removeClass('active');
  $(this).addClass('active');

  var period = $(this).attr('id');
  console.log(period);

  $('.goda__period-description_item').removeClass('active');

  $(".goda__period-description").find("[for='" + period + "']").addClass('active');
});

$('.goda__period-description_item > button').on('click', function () {
  $('.goda__period-description_themes').show();
});
$('.goda__period-description_themes > button').on('click', function () {
  $('.goda__period-description_themes').hide();
});
