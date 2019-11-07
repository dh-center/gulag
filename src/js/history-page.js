var blocksCount = $('.history-page__sliders-wrap > div').length;
var currentSlide = 1;
var isNotIdle = true;

$(window).bind('mousewheel', function (event) {
  if (event.originalEvent.wheelDelta <= 0 && isNotIdle) {
    isNotIdle = false;
    var windowHeight = $(window).height();
    if (currentSlide <= 4 && currentSlide >= 1) {
      $(".history__text_slide").animate({top: "55%",}, 200, function () {
      });
      $(".history__text_slide").animate({top: "50%",}, 700, function () {
      });

      $(".history-page__slide > img").animate({top: "60%",}, 200, function () {
      });
      $(".history-page__slide > img").animate({top: "50%",}, 1000, function () {
      });

      currentSlide++;
      $(window).unbind('click');
      console.log(windowHeight)
      $(".history-page__sliders-wrap").animate({
        top: "-=" + windowHeight + "",
      }, 700, function () {
        isNotIdle = true;
      });
    } else {
      isNotIdle = true;
    }

  } else if (event.originalEvent.wheelDelta >= 0 && isNotIdle) {

    isNotIdle = false;
    var windowHeight = $(window).height();
    console.log(windowHeight)
    if (currentSlide <= 5 && currentSlide >= 2) {
      $(".history__text_slide").animate({top: "45%",}, 200, function () {
      });
      $(".history__text_slide").animate({top: "50%",}, 700, function () {
      });

      $(".history-page__slide > img").animate({top: "40%",}, 200, function () {
      });
      $(".history-page__slide > img").animate({top: "50%",}, 1000, function () {
      });

      currentSlide--;
      $(".history-page__sliders-wrap").animate({
        top: "+=" + windowHeight + "",
      }, 700, function () {
        isNotIdle = true;
      });
    } else {
      isNotIdle = true;
    }
  }

  $(".history-page__year-item").removeClass('history-page__year-item--active');
  $(".history-page__year-item[id='" + currentSlide + "']").addClass('history-page__year-item--active');
});


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
