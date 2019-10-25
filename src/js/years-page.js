const periodsListActiveClass = 'periods-page__periods-list-item--active';
const periodsDescriptionItemActiveClass = 'periods-page__period-description-item--active';

/**
 * Change active section on click on period item
 */
$('.periods-page__periods-list-item').on('click', function () {
  $('.periods-page__periods-list-item').removeClass(periodsListActiveClass);
  $(this).addClass(periodsListActiveClass);

  const period = $(this).attr('id');
  console.log(period)
  $('.periods-page__period-description-item').removeClass(periodsDescriptionItemActiveClass);

  console.log($('.periods-page__period-description-item').find(`[for='${period}']`))
  $(`.periods-page__period-description-item[for="${period}"]`).addClass(periodsDescriptionItemActiveClass);
});

// $('.years__period-description_item > button').on('click', function () {
//   $('.years__period-description_themes').show();
// });

// $('.years__period-description_themes > button').on('click', function () {
//   $('.years__period-description_themes').hide();
// });
