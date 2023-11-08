import {initCustomSelect} from './modules/custom-select/init-custom-select';
import {initHeader} from './modules/header/init-header';
import {initIntroSlider} from './modules/sliders/init-intro-slider';


window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    initHeader();
    initCustomSelect();
    initIntroSlider();
  });
});
