$('.victims__slider').slick({
  swipe: true,
  arrows: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 300,
  speed: 800,
  slidesToShow: 3,
  swipeToSlide: true,
  pauseOnHover: true,
  centerMode: true,
  variableWidth: true,
  adaptiveHeight: true,
  prevArrow: "<div style='padding: 5px 5px 5px 5px;cursor: pointer;position:absolute;z-index: 1;top: 50%; transform: translateY(-50%);left: 0;display:none;'><svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='75px' height='178px'><path fill-rule='evenodd'  stroke='rgb(0, 0, 6)' stroke-width='0px' stroke-linecap='round' stroke-linejoin='miter' fill='rgba(255, 255, 255, .5)' d='M75.005,169.685 L65.223,178.000 L-0.005,89.315 L0.365,89.000 L-0.005,88.685 L65.223,-0.000 L75.005,8.315 L15.661,89.000 L75.005,169.685 Z'/></svg></div>",
  nextArrow: "<div style='padding: 5px 0 5px 5px;cursor: pointer;position:absolute;z-index: 1;top: 50%; transform: translateY(-50%);right: 0;display:none;'><svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='75px' height='178px'><path fill-rule='evenodd'  stroke='rgb(0, 0, 6)' stroke-width='0px' stroke-linecap='round' stroke-linejoin='miter' fill='rgba(255, 255, 255, .5)' d='M75.005,89.315 L9.777,178.000 L-0.005,169.685 L59.339,89.000 L-0.005,8.315 L9.777,-0.000 L75.005,88.685 L74.635,89.000 L75.005,89.315 Z'/></svg></div>"
//   responsive: [
//   {
//     breakpoint: 9999,
//     settings: {
//       centerMode: false,
//       slidesToShow: 4,
//   }
// },
// {
//     breakpoint: 768,
//     settings: {
//       centerMode: true,
//       slidesToShow: 1,
//   }
// }
// ]
});
