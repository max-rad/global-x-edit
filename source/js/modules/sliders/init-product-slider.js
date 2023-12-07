const initProductSlider = () => {
  const sliderBlock = document.querySelector('[data-slider="product"]');

  if (!sliderBlock) {
    return;
  }

  const slider = sliderBlock.querySelector('.swiper');
  const buttonPrev = sliderBlock.querySelector('[data-button-prev]');
  const buttonNext = sliderBlock.querySelector('[data-button-next]');

  const swiper = new Swiper(slider, {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: buttonNext,
      prevEl: buttonPrev,
    },
  });
};

export {initProductSlider};
