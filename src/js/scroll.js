const SCROLL_TIME = 20;
const SCROLL_SIZE = 50;

const servicesContainer = document.querySelector('.services__content');
const scrollUpBtn = document.querySelector('#scroll-up');
const scrollDownBtn = document.querySelector('#scroll-down');

let t; //timer
const getCoords = (elem) => { 
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

// scroll top 
const scrollUp = () => {
  let top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
  if(top > 0) {
    window.scrollBy(0, -SCROLL_SIZE);
    t = setTimeout(() => scrollUp(), SCROLL_TIME);
  } else {
    clearTimeout(t);
  }
  return false;
}

// scroll to Setialization
const scrollDown = (elem) => {
  const elemTop = getCoords(elem).top;
  let top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
  if(top < elemTop) {
      window.scrollBy(0, SCROLL_SIZE);
      t = setTimeout(() => scrollDown(elem), SCROLL_TIME);
    } else {
      clearTimeout(t);
    }
    return false;
}

export  const addScroll = () => {
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => scrollDown(servicesContainer));
  }
  scrollUpBtn.addEventListener('click', scrollUp);
}

  

