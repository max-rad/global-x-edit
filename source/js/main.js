import {initCustomSelect} from './modules/custom-select/init-custom-select';
import {initHeader} from './modules/header/init-header';
import {initIntroSlider} from './modules/sliders/init-intro-slider';
import {initAccordions} from './modules/accordion/init-accordion';
import {initProductSlider} from './modules/sliders/init-product-slider';
import {initModals} from './modules/modal/init-modals';
import {initPhoneMask} from './modules/phone-mask';
import {initPhoneValidation} from './modules/init-phone-validation';
import {initHeaderAccordion} from './modules/init-header-accordion';
import {initTabs} from './modules/tabs/init-tabs';
import {initCard} from './modules/card/init-card';
import {initTariffConstructor} from './modules/tariff-constructor/init-tariff-constructor';
import {initMonitoringVideo} from './modules/monitoring-video/init-monitoring-video';


window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    initHeader();
    initCustomSelect();
    initIntroSlider();
    initAccordions();
    initProductSlider();
    initModals();
    initPhoneMask();
    initHeaderAccordion();
    initTabs();
    initCard();
    initTariffConstructor();
    initMonitoringVideo();
    initPhoneValidation();
  });
});
