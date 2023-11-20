const initProductSlider = () => {
  const slider = document.querySelector('[data-slider="intro"]');

  if (!slider) {
    return;
  }

  const swiper = new Swiper(slider, {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};

export {initProductSlider};
