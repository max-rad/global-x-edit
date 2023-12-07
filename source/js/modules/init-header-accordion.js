const menuParent = document.querySelector('.main-nav__list');
const breakpointMedia = window.matchMedia('(max-width: 1279px)');

function breakpointChecker(media) {
  const menuItems = document.querySelectorAll('.main-nav__item.menu-item-has-children');

  if (media.matches) {
    menuItems.forEach((item) => {
      const link = item.querySelector('.main-nav__link');
      link.addEventListener('click', itemClickHandler);
    });
  } else {
    menuItems.forEach((item) => {
      item.removeEventListener('click', itemClickHandler);

      if (item.classList.contains('is-active')) {
        item.classList.remove('is-active');
      }
    });
  }
}

const itemClickHandler = (evt) => {
  evt.preventDefault();
  const item = evt.target.closest('.main-nav__item.menu-item-has-children');

  if (item.classList.contains('is-active')) {
    item.classList.remove('is-active');
  } else {
    item.classList.add('is-active');
  }
};

const initHeaderAccordion = () => {
  if (!menuParent) {
    return;
  }

  breakpointMedia.addEventListener('change', breakpointChecker);
  breakpointChecker(breakpointMedia);
};

export {initHeaderAccordion};
