const slidesCount = $('.history-page__slide').length;
console.log(slidesCount)
let currentSlide = 1;
let isNotIdle = true;

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
  if (!isNotIdle) return;

  const windowHeight = $(window).height();
  const isScrollingDown = event.originalEvent.wheelDelta <= 0;

  if (isScrollingDown) {
    const canScrollDown = currentSlide >= 1 && currentSlide <= slidesCount - 1;
    if (canScrollDown) {
      isNotIdle = false;
      // $(".history__text_slide").animate({top: "55%",}, 200, function () {
      // });
      // $(".history__text_slide").animate({top: "50%",}, 700, function () {
      // });
      //
      // $(".history-page__slide > img").animate({top: "60%",}, 200, function () {
      // });
      // $(".history-page__slide > img").animate({top: "50%",}, 1000, function () {
      // });

      currentSlide++;
      $(window).unbind('click');
      console.log(windowHeight)

      $(".history-page__sliders-wrap").css('transform', `translateY(-${windowHeight * currentSlide - 1}px)`)
      isNotIdle = true;
      // $(".history-page__sliders-wrap").animate({
      //   top: "-=" + windowHeight + "",
      // }, 700, function () {
      //   isNotIdle = true;
      // });
    }

  } else {

    const canScrollUp = currentSlide >= 2 && currentSlide <= slidesCount;
    if (canScrollUp) {
      isNotIdle = false;

      // $(".history__text_slide").animate({top: "45%",}, 200, function () {
      // });
      // $(".history__text_slide").animate({top: "50%",}, 700, function () {
      // });
      //
      // $(".history-page__slide > img").animate({top: "40%",}, 200, function () {
      // });
      // $(".history-page__slide > img").animate({top: "50%",}, 1000, function () {
      // });

      currentSlide--;
      // $(".history-page__sliders-wrap").animate({
      //   top: "+=" + windowHeight + "",
      // }, 700, function () {
      //   isNotIdle = true;
      // });
    }
  }

  $(".history-page__year-item").removeClass('history-page__year-item--active');
  $(".history-page__year-item[id='" + currentSlide + "']").addClass('history-page__year-item--active');
}

$(window).bind('mousewheel', debounce(changeSlideOnMouseWheel, 500));


// function fillP(forNumber) {
//   var availableHeight = $('[for =' + forNumber + '] .history__text_slide').outerHeight();
//   console.log('AH = ' + availableHeight);
//
//   var fullHeight = 0;
//   $('[for =' + forNumber + '] .history__text_slide > *').each(function () {
//     fullHeight += $(this).height();
//   });
//   console.log('FH = ' + fullHeight);
//
//   var fontSize = 16;
//   while (fullHeight + 300 < availableHeight) {
//     console.log('fontSize = ' + fontSize)
//     $('[for =' + forNumber + '] .history__text_slide').css({"font-size": +fontSize + "px"});
//     fontSize++;
//     console.log('fontSize++ = ' + fontSize)
//
//     var fullHeight = 0;
//     $('[for =' + forNumber + '] .history__text_slide > *').each(function () {
//       fullHeight += $(this).height();
//     });
//     console.log('FH = ' + fullHeight);
//   }
//
// }
//
// var slideLength = $('.history-page__slide').length;
// var i = 1;
// while (i <= slideLength) {
//   // fillP(i);
//   i++;
// }
// $(window).resize(function () {
//   var j = 1;
//   while (j <= slideLength) {
//     // fillP(j);
//     j++;
//   }
// });

function nextSlide() {

}

function previousSlide() {

}
