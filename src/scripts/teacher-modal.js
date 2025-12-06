const tabButtons = document.querySelectorAll('.teacher-tab-buttons__btn');
const tabContents = document.querySelectorAll('.teacher-tab-content');
const closeModalBtn = document.querySelector('.modal__close-btn');
const modalBackdrop = document.querySelector('.modal__backdrop');

const setButtonActive = (clickedButton) => {
  tabButtons.forEach((button) => {
    button.classList.remove('teacher-tab-buttons__btn--active');
  });

  clickedButton.classList.add('teacher-tab-buttons__btn--active');
};

const setContentActive = (dataTab) => {
  tabContents.forEach((tab) => {
    tab.classList.remove('teacher-tab-content--active');
  });

  const tabContent = document.querySelector(`.teacher-tab-content[data-tab-content="${dataTab}"]`);
  if (!tabContent) {
    return;
  }

  tabContent.classList.add('teacher-tab-content--active');
  tabContent.scrollTo({ top: 0 });
};

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setButtonActive(button);

    const tab = button.getAttribute('data-tab');
    setContentActive(tab);
  });
});

[modalBackdrop, closeModalBtn].forEach((element) => {
  element.addEventListener('click', () => {
    const firstButton = tabButtons[0];
    setButtonActive(firstButton);
    setContentActive(firstButton.getAttribute('data-tab'));
  });
});
