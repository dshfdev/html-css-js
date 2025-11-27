const modal = document.querySelector('.modal');
const openModalBtns = document.querySelectorAll('.teacher-card__btn');
const closeModalBtn = document.querySelector('.modal__close-btn');
const modalBackdrop = document.querySelector('.modal__backdrop');

const handleModalOpen = () => {
  document.body.classList.toggle('disable-scroll');
  modal.hidden = false;
  modal.classList.add('modal--is-open');
};

const handleModalClose = () => {
  document.body.classList.toggle('disable-scroll');
  modal.hidden = true;
  modal.classList.remove('modal--is-open');
};

openModalBtns.forEach((btn) => {
  btn.addEventListener('click', handleModalOpen);
});

closeModalBtn.addEventListener('click', handleModalClose);
modalBackdrop.addEventListener('click', handleModalClose);
