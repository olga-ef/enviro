import $ from 'jquery';
import jQueryBridget from 'jquery-bridget';
import Masonry from 'masonry-layout';
import menuToggle from './menu-toggle';
import {addScroll} from './scroll' 
import {startSlider} from './slider';

jQueryBridget( 'masonry', Masonry, $ );

$(document).ready(function () {
  menuToggle();
  addScroll();
  startSlider();

  // masonry
  $('.spetialization .columns').masonry({
    itemSelector: '.column',
    // use element for option
    columnWidth: '.column',
    percentPosition: true,
    originLeft: false,
   });
});


