const periodsListActiveClass = 'periods-page__periods-list-item--active';
const periodsDescriptionItemActiveClass = 'periods-page__period-description-item--active';

/**
 * Change active section on click on period item
 */
$('.periods-page__periods-list-item').on('click', function () {
  $('.periods-page__periods-list-item').removeClass(periodsListActiveClass);
  $(this).addClass(periodsListActiveClass);

  const period = $(this).attr('id');

  $('.periods-page__period-description-item').removeClass(periodsDescriptionItemActiveClass);
  $(`.periods-page__period-description-item[for="${period}"]`).addClass(periodsDescriptionItemActiveClass);
});
