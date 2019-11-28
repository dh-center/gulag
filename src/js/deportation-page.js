import debounce from "./debounce";
import wait from "./wait";

const slidesCount = $('.deportation-page__slide').length;
let currentSlide = 1;
const windowHeight = $(window).height();

const mapDocument = $(".deportation-map__document");
const slidersWrap = $(".deportation-page__sliders-wrap");

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
}

/**
 * Goes to next slide
 */
async function nextSlide() {
  const canGoNext = currentSlide >= 1 && currentSlide <= slidesCount - 1;
  if (canGoNext) {
    currentSlide++;

    if(currentSlide === 2) {
      slidersWrap.css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);

      await wait(500);
      mapDocument.removeClass('deportation-map__document--not-visible');

      mapDocument.removeClass('deportation-map__document--hidden-top');
      mapDocument.addClass('deportation-map__document--normal');
    }

    if (currentSlide === 3) {
      mapDocument.removeClass('deportation-map__document--normal');
      mapDocument.addClass('deportation-map__document--hidden-bottom');

      await wait(1000);
      mapDocument.addClass('deportation-map__document--not-visible');
      slidersWrap.css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);

      return;
    }

    slidersWrap.css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);
  }
}

/**
 * Goes to previous slide
 */
async function previousSlide() {
  const canGoPrevious = currentSlide >= 2 && currentSlide <= slidesCount;
  if (canGoPrevious) {
    currentSlide--;

    if(currentSlide === 1) {
      mapDocument.addClass('deportation-map__document--hidden-top');
      await wait(1000);

      mapDocument.addClass('deportation-map__document--not-visible');
    }

    if (currentSlide === 2) {
      slidersWrap.css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);

      await wait(500);
      mapDocument.removeClass('deportation-map__document--not-visible');

      mapDocument.removeClass('deportation-map__document--hidden-bottom');
      mapDocument.addClass('deportation-map__document--normal');
    }

    slidersWrap.css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);
  }
}

$(window).on('wheel', debounce(changeSlideOnMouseWheel, 500));
