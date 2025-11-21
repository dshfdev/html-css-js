const initializeSlider = () => {
  const imageList = document.querySelector('.slider__items');
  const slideButtons = document.querySelectorAll('.slider-controls__button');
  const sliderScrollbar = document.querySelector('.slider-controls__scrollbar');
  const scrollbarThumb = sliderScrollbar.querySelector('.slider-controls__scrollbar__bar');
  const getMaxScrollLeft = () => imageList.scrollWidth - imageList.clientWidth;

  slideButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.id === 'btn-prev' ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });

  const updateScrollThumbPosition = () => {
    const maxScrollLeft = getMaxScrollLeft();

    if (maxScrollLeft <= 0) {
      scrollbarThumb.style.left = '0px';
      return;
    }

    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  imageList.addEventListener('scroll', () => {
    requestAnimationFrame(updateScrollThumbPosition);
  });

  scrollbarThumb.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition =
      sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
    const maxScrollLeft = getMaxScrollLeft();

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
      const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  });

  sliderScrollbar.addEventListener('click', (e) => {
    const rect = sliderScrollbar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const thumbWidth = scrollbarThumb.offsetWidth;

    let newThumbPosition = clickPosition - thumbWidth / 2;
    const maxThumbPosition = sliderScrollbar.clientWidth - thumbWidth;

    newThumbPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));

    const maxScrollLeft = getMaxScrollLeft();
    const scrollPosition = (newThumbPosition / maxThumbPosition) * maxScrollLeft;

    scrollbarThumb.style.left = `${newThumbPosition}px`;
    imageList.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  });
};

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(initializeSlider, 250);
});
window.addEventListener('load', initializeSlider);
