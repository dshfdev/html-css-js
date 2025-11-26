const imageList = document.querySelector('.slider__items');
const slideButtons = document.querySelectorAll('.slider-controls__button');
const sliderScrollbar = document.querySelector('.slider-controls__scrollbar');
const scrollbarThumb = sliderScrollbar.querySelector('.slider-controls__scrollbar__thumb');

const calculateMaxScrollLeft = () => {
  return imageList.scrollWidth - imageList.clientWidth;
};
const updateScrollbarWidth = () => {
  scrollbarThumb.style.width = `${(imageList.clientWidth / imageList.scrollWidth) * 100}%`;
};
let sliderMaxScrollLeft = calculateMaxScrollLeft();
updateScrollbarWidth();

const createSlideButtonClickHandler = (buttonId) => () => {
  const direction = buttonId === 'btn-prev' ? -1 : 1;
  let scrollAmount = imageList.clientWidth * direction;
  imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};
slideButtons.forEach((button) => {
  button.addEventListener('click', createSlideButtonClickHandler(button.id));
});

const updateScrollThumbPosition = () => {
  const scrollPosition = imageList.scrollLeft;
  const thumbPosition =
    (scrollPosition / sliderMaxScrollLeft) *
    (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);

  scrollbarThumb.style.left = `${thumbPosition}px`;
};
imageList.addEventListener('scroll', () => {
  requestAnimationFrame(updateScrollThumbPosition);
});

document.addEventListener('mousedown', (mouseDownEvent) => {
  if (mouseDownEvent.target !== scrollbarThumb) {
    return;
  }

  const startX = mouseDownEvent.clientX;
  const thumbPosition = scrollbarThumb.offsetLeft;
  const maxThumbPosition =
    sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
  const maxScrollLeft = calculateMaxScrollLeft();
  document.body.style.cursor = 'grabbing';
  scrollbarThumb.style.cursor = 'grabbing';
  document.body.style.userSelect = 'none';

  const handleMouseMove = (mouseMoveEvent) => {
    const deltaX = mouseMoveEvent.clientX - startX;
    const newThumbPosition = thumbPosition + deltaX;
    const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
    const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

    scrollbarThumb.style.left = `${boundedPosition}px`;
    imageList.scrollLeft = scrollPosition;
  };

  const handleMouseUp = () => {
    document.body.style.cursor = 'default';
    scrollbarThumb.style.cursor = 'grab';
    document.body.style.userSelect = '';
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

  const maxScrollLeft = calculateMaxScrollLeft();
  const scrollPosition = (newThumbPosition / maxThumbPosition) * maxScrollLeft;

  scrollbarThumb.style.left = `${newThumbPosition}px`;
  imageList.scrollTo({ left: scrollPosition, behavior: 'smooth' });
});

window.addEventListener('resize', () => {
  sliderMaxScrollLeft = calculateMaxScrollLeft();
  updateScrollbarWidth();
});
