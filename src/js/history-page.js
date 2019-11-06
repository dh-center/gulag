var blocksCount = $('.history__text > div').length;
var currentSlide = 1;
var a = true;

$(window).bind('mousewheel', function (event) {
  if (event.originalEvent.wheelDelta <= 0 && a) {
    a = false;
    var windowHeight = $(window).height();
    if (currentSlide <= 4 && currentSlide >= 1) {
      $(".history__text_slide").animate({top: "55%",}, 200, function () {
      });
      $(".history__text_slide").animate({top: "50%",}, 700, function () {
      });

      $(".history__text_item > img").animate({top: "60%",}, 200, function () {
      });
      $(".history__text_item > img").animate({top: "50%",}, 1000, function () {
      });

      currentSlide++;
      $(window).unbind('click');
      $(".history__text").animate({
        top: "-=" + windowHeight + "",
      }, 700, function () {
        a = true;
      });
    } else {
      a = true;
    }

  } else if (event.originalEvent.wheelDelta >= 0 && a) {

    a = false;
    var windowHeight = $(window).height();
    if (currentSlide <= 5 && currentSlide >= 2) {
      $(".history__text_slide").animate({top: "45%",}, 200, function () {
      });
      $(".history__text_slide").animate({top: "50%",}, 700, function () {
      });

      $(".history__text_item > img").animate({top: "40%",}, 200, function () {
      });
      $(".history__text_item > img").animate({top: "50%",}, 1000, function () {
      });

      currentSlide--;
      $(".history__text").animate({
        top: "+=" + windowHeight + "",
      }, 700, function () {
        a = true;
      });
    } else {
      a = true;
    }
  }

  $(".history-page__year-item").removeClass('history-page__year-item--active');
  $(".history-page__year-item[id='" + currentSlide + "']").addClass('history-page__year-item--active');
});


function fillP(forNumber) {
  var availableHeight = $('[for =' + forNumber + '] .history__text_slide').outerHeight();
  console.log('AH = ' + availableHeight);

  var fullHeight = 0;
  $('[for =' + forNumber + '] .history__text_slide > *').each(function () {
    fullHeight += $(this).height();
  });
  console.log('FH = ' + fullHeight);

  var fontSize = 16;
  while (fullHeight + 300 < availableHeight) {
    console.log('fontSize = ' + fontSize)
    $('[for =' + forNumber + '] .history__text_slide').css({"font-size": +fontSize + "px"});
    fontSize++;
    console.log('fontSize++ = ' + fontSize)

    var fullHeight = 0;
    $('[for =' + forNumber + '] .history__text_slide > *').each(function () {
      fullHeight += $(this).height();
    });
    console.log('FH = ' + fullHeight);
  }

}

var slideLength = $('.history__text_item').length;
var i = 1;
while (i <= slideLength) {
  // fillP(i);
  i++;
}
$(window).resize(function () {
  var j = 1;
  while (j <= slideLength) {
    // fillP(j);
    j++;
  }
});
