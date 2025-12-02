const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.teacher-tab-content');
const closeModalBtn = document.querySelector('.modal__close-btn');
const modalBackdrop = document.querySelector('.modal__backdrop');

const activeButton = (clickedButton) => {
  tabButtons.forEach((button) => {
    button.classList.remove('tab-btn--active');
  });

  clickedButton.classList.add('tab-btn--active');
};

const activeContent = (dataTab) => {
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
    activeButton(button);

    const tab = button.getAttribute('data-tab');
    activeContent(tab);
  });
});

[modalBackdrop, closeModalBtn].forEach((element) => {
  element.addEventListener('click', () => {
    const firstButton = tabButtons[0];
    activeButton(firstButton);
    activeContent(firstButton.getAttribute('data-tab'));
  });
});
