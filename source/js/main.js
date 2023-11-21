import {initCustomSelect} from './modules/custom-select/init-custom-select';
import {initHeader} from './modules/header/init-header';
import {initIntroSlider} from './modules/sliders/init-intro-slider';
import {initAccordions} from './modules/accordion/init-accordion';
import {initProductSlider} from './modules/sliders/init-product-slider';
import {initModals} from './modules/modal/init-modals';
import {initPhoneMask} from './modules/phone-mask';


window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    initHeader();
    initCustomSelect();
    initIntroSlider();
    initAccordions();
    initProductSlider();
    initModals();
    initPhoneMask();
  });
});
