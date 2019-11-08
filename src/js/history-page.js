const slidesCount = $('.history-page__slide').length;
let currentSlide = 1;
let isIdle = false;
const windowHeight = $(window).height();


function debounce(f, ms) {

  let isCooldown = false;

  return function () {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };
}

/**
 *
 * @param {MouseWheelEvent} event
 */
function changeSlideOnMouseWheel(event) {
  if (isIdle) return;
  const isScrollingDown = event.originalEvent.wheelDelta <= 0;

  if (isScrollingDown) {
    nextSlide();
  } else {
    previousSlide();
  }

  $(".history-page__year-item").removeClass('history-page__year-item--active');
  $(".history-page__year-item[id='" + currentSlide + "']").addClass('history-page__year-item--active');
}

$(window).bind('mousewheel', debounce(changeSlideOnMouseWheel, 500));

function nextSlide() {
  const canScrollDown = currentSlide >= 1 && currentSlide <= slidesCount - 1;
  if (canScrollDown) {
    isIdle = true;
    currentSlide++;
    $(".history-page__sliders-wrap").css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);

    isIdle = false;
  }
}

function previousSlide() {
  const canScrollUp = currentSlide >= 2 && currentSlide <= slidesCount;
  if (canScrollUp) {
    isIdle = true;
    currentSlide--;

    $(".history-page__sliders-wrap").css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);

    isIdle = false;
  }
}
