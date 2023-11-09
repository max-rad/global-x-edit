const initIntroSlider = () => {
  const slider = document.querySelector('[data-slider="intro"]');

  if (!slider) {
    return;
  }

  const swiper = new Swiper(slider, {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      320: {
        navigation: {
          enabled: false,
        },
      },
      1279: {
        navigation: {
          enabled: true,
        },
      },
    },
  });
};

export {initIntroSlider};
