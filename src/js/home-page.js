function fillDiv() {
  var div = $('.flexText');
  var currentWidth = div.outerWidth() + 3;
  var availableWidth = div.parent().outerWidth();
  if (availableWidth > 1000) {
    availableWidth = 1000;
  }
  var scale = availableWidth / currentWidth;

  div.css({
    "transform": "scale3d(" + scale + ", " + scale + ", 1)",
    "transform-origin": "center top"
  });
}

fillDiv();
$(window).resize(function () {
  fillDiv();
});
