import debounce from "./debounce";
import wait from "./wait";

const slidesCount = $('.deportation-page__slide').length;
let currentSlide = 1;
const windowHeight = $(window).height();

const mapDocumentGermans = $("#deportation-map__document-germans");
const mapDocumentLatvians = $("#deportation-map__document-latvians");
const slidersWrap = $(".deportation-page__sliders-wrap");
const mapText = $(".deportation-map__text");
mapText.addClass('deportation-map__text--hidden');

const documentText = $('.deportation-document__text');
documentText.addClass('deportation-document__text--hidden');

const calendars = $('.calendar');
calendars.addClass('calendar--hidden');

const calendar28 = $('#calendar28');
const calendar16 = $('#calendar16');
const calendar8 = $('#calendar8');

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

    if (currentSlide === 2) {
      slidersWrap.css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);

      await wait(500);
      mapDocumentGermans.removeClass('deportation-map__document--not-visible');

      mapDocumentGermans.removeClass('deportation-map__document--hidden-top');
      mapDocumentGermans.addClass('deportation-map__document--normal');

      mapText.removeClass('deportation-map__text--hidden');
      calendar28.removeClass('calendar--hidden');
      calendar28.removeClass('calendar--not-visible');
    }

    if (currentSlide === 3) {
      mapDocumentGermans.removeClass('deportation-map__document--normal');
      mapDocumentGermans.addClass('deportation-map__document--hidden-bottom');
      mapText.addClass('deportation-map__text--hidden');
      calendar28.addClass('calendar--hidden');
      await wait(1000);

      calendar28.addClass('calendar--not-visible');
      mapDocumentGermans.addClass('deportation-map__document--not-visible');
      slidersWrap.css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);
      await wait(500);

      calendar16.removeClass('calendar--not-visible');
      calendar16.removeClass('calendar--hidden');
      mapDocumentLatvians.removeClass('deportation-map__document--not-visible');
      mapDocumentLatvians.removeClass('deportation-map__document--hidden-top');
      mapDocumentLatvians.addClass('deportation-map__document--normal');
      mapText.removeClass('deportation-map__text--hidden');
      return;
    }

    if (currentSlide === 4) {
      mapDocumentLatvians.removeClass('deportation-map__document--normal');
      mapDocumentLatvians.addClass('deportation-map__document--hidden-bottom');
      mapText.addClass('deportation-map__text--hidden');
      calendar16.addClass('calendar--hidden');
      await wait(1000);

      calendar16.addClass('calendar--not-visible');
      mapDocumentLatvians.addClass('deportation-map__document--not-visible');
      slidersWrap.css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);
      await wait(500);

      calendar8.removeClass('calendar--not-visible');
      documentText.removeClass('deportation-document__text--hidden');
      calendar8.removeClass('calendar--hidden');
      return;
    }

    if (currentSlide === 5) {
      calendar8.addClass('calendar--hidden');
      documentText.addClass('deportation-document__text--hidden');

      await wait(500);
      calendar8.addClass('calendar--not-visible');
      slidersWrap.css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);
      await wait(500);

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

    if (currentSlide === 1) {
      mapDocumentGermans.addClass('deportation-map__document--hidden-top');
      mapText.addClass('deportation-map__text--hidden');
      calendar28.addClass('calendar--hidden');
      await wait(1000);

      calendar28.addClass('calendar--not-visible');
      mapDocumentGermans.addClass('deportation-map__document--not-visible');
      mapText.addClass('deportation-map__text--hidden')
    }

    if (currentSlide === 2) {
      mapDocumentLatvians.addClass('deportation-map__document--hidden-top');
      mapText.addClass('deportation-map__text--hidden');
      calendar16.addClass('calendar--hidden');
      await wait(1000);

      calendar16.addClass('calendar--not-visible');
      mapDocumentLatvians.addClass('deportation-map__document--not-visible');
      mapText.addClass('deportation-map__text--hidden')

      await wait(500);
      mapDocumentGermans.removeClass('deportation-map__document--not-visible');

      mapDocumentGermans.removeClass('deportation-map__document--hidden-bottom');
      mapDocumentGermans.addClass('deportation-map__document--normal');
      mapText.removeClass('deportation-map__text--hidden');
      calendar28.removeClass('calendar--not-visible');
      calendar28.removeClass('calendar--hidden');
    }

    if (currentSlide === 3) {
      calendar8.addClass('calendar--hidden');
      documentText.addClass('deportation-document__text--hidden');

      await wait(500);
      calendar8.addClass('calendar--not-visible');
      slidersWrap.css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);

      await wait(500);
      mapDocumentLatvians.removeClass('deportation-map__document--not-visible');

      mapDocumentLatvians.removeClass('deportation-map__document--hidden-bottom');
      mapDocumentLatvians.addClass('deportation-map__document--normal');
      mapText.removeClass('deportation-map__text--hidden');
      calendar16.removeClass('calendar--not-visible');
      calendar16.removeClass('calendar--hidden');
    }

    if (currentSlide === 4) {
      slidersWrap.css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);

      await wait(500);
      calendar8.removeClass('calendar--not-visible');
      calendar8.removeClass('calendar--hidden');
      documentText.removeClass('deportation-document__text--hidden');

    }

    slidersWrap.css('transform', `translateY(-${windowHeight * (currentSlide - 1)}px)`);
  }
}

$(window).on('wheel', debounce(changeSlideOnMouseWheel, 500));
