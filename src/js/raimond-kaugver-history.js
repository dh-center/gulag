import debounce from './debounce';
import throttle from './throttle';

const slidesCount = $('.raimond-kaugver-history-page__slide').length;
let currentSlide = 1;
let windowHeight = $(window).height();

/**
 * Changes slide on scroll
 * @param {jQuery.Event} event
 */
function changeSlideOnMouseWheel(event) {
  const isScrollingDown = event.originalEvent.wheelDelta <= 0;

  if (isScrollingDown) {
    nextSlide();
  } else {
    previousSlide();
  }

  /**
   * Change current year in left menu
   */
  $(".raimond-kaugver-history-page__year-item").removeClass('raimond-kaugver-history-page__year-item--active');
  $(".raimond-kaugver-history-page__year-item[id='" + currentSlide + "']").addClass('raimond-kaugver-history-page__year-item--active');
}

function goToSlide(event) {
  currentSlide = event.target.id;
  $(".raimond-kaugver-history-page__sliders-wrap").css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);
  $(".raimond-kaugver-history-page__year-item").removeClass('raimond-kaugver-history-page__year-item--active');
  $(".raimond-kaugver-history-page__year-item[id='" + event.target.id + "']").addClass('raimond-kaugver-history-page__year-item--active');
}

$('.raimond-kaugver-history-page__year-item').on('click', goToSlide);


/**
 * Goes to next slide
 */
function nextSlide() {
  const canGoNext = currentSlide >= 1 && currentSlide <= slidesCount - 1;
  if (canGoNext) {
    currentSlide++;
    $(".raimond-kaugver-history-page__sliders-wrap").css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);
  }
}

/**
 * Goes to previous slide
 */
function previousSlide() {
  const canGoPrevious = currentSlide >= 2 && currentSlide <= slidesCount;
  if (canGoPrevious) {
    currentSlide--;
    $(".raimond-kaugver-history-page__sliders-wrap").css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);
  }
}

$(window).on('wheel', debounce(changeSlideOnMouseWheel, 500));

$('.raimond-kaugver-history-page .slide-image').addClass('slide-image--hover-triggered');
$('.raimond-kaugver-history-page .slide-image').click(function () {
  const jq = $(this);
  if (!jq.hasClass('slide-image--active')) {
    $('.slide-image--active')
      .removeClass('slide-image--active')
      .addClass('slide-image--hover-triggered');
  }

  jq.toggleClass('slide-image--active slide-image--hover-triggered');
});

$('.raimond-kaugver-history-page .text-on-paper').addClass('text-on-paper--hover-triggered');
$('.raimond-kaugver-history-page .text-on-paper').click(function () {
  $(this).toggleClass('text-on-paper--active text-on-paper--hover-triggered');
});

/**
 * Update windowHeight when window is resizing
 */
$(window).resize(throttle(function () {
  windowHeight = $(window).height();
  $(".raimond-kaugver-history-page__sliders-wrap").css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);
}, 200));
