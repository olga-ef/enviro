import $ from 'jquery';
import slickSlider from './slick/slick.min';

const BREAKPOINT = 768;
const ELEM_NUMBER = 4;

const sliderSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  appendArrows: '.slider__arrows',
  prevArrow: '<button class="slider__arrow slider__arrow--prev"><i class="fas fa-angle-left"></i></button>',
  nextArrow: '<button class="slider__arrow slider__arrow--next"><i class="fas fa-angle-right"></i></button>',
  fade: true,
  autoplay: true,
  autoplaySpeed: 5000, //change speed 1s = 1000ms
  zIndex: 0,
    responsive: [
    {
      breakpoint: 767,
      settings: 'unslick'
    }
  ]
};

const mySlider = $('.slider');
let isSlider = false;

const activateSlider = () => { 
  mySlider.slick(sliderSettings);

  mySlider.on('afterChange', (e, slick, currentSlide, nextSlide) => {
    const slideIndex = currentSlide * ELEM_NUMBER;
    const dots = document.querySelectorAll('.slider__dots li');
    [].forEach.call(dots, (dot, i) => {
      const dotContent = i + 1 + slideIndex;
      dot.textContent = dotContent < 10 ? '0' + dotContent : dotContent;
    });
  })
  isSlider = !isSlider;
};

const deactivateSlider = () => {
  mySlider.slick('unslick');
  isSlider = !isSlider;
};

export const startSlider = () => {
  if (mySlider) {
    activateSlider();

    window.addEventListener('resize', () => {
      if (window.innerWidth >= BREAKPOINT && !isSlider) {
        activateSlider();  
      }
      if (window.innerWidth < BREAKPOINT && isSlider) {
        deactivateSlider();
      } 
    });
  }
};  