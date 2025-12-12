const tabButtons = document.querySelectorAll('.teacher-tab-buttons__btn');
const tabContents = document.querySelectorAll('.teacher-tab-content');
const selectBtn = document.querySelector('#select-btn');
const selectList = document.querySelector('#select-list');
const selectOptions = document.querySelectorAll('[role="option"]');
const selectBtnText = document.querySelector('.select__selected-text');
const selectBtnIcon = document.querySelector('.select__icon');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.modal__close-btn');

const showSelectList = () => {
  selectList.removeAttribute('hidden');
  selectBtn.setAttribute('aria-expanded', 'true');
  selectBtnIcon.classList.add('select__icon--rotated');
};

const hideSelectList = () => {
  selectList.setAttribute('hidden', '');
  selectBtn.setAttribute('aria-expanded', 'false');
  selectBtnIcon.classList.remove('select__icon--rotated');
};

const handleSelectBtnClick = () => {
  const isExpanded = selectBtn.getAttribute('aria-expanded') === 'true';
  if (isExpanded) {
    hideSelectList();
  } else {
    showSelectList();
  }
};

const setActiveOption = (selectedOption) => {
  selectOptions.forEach((option) => {
    option.setAttribute('aria-selected', 'false');
  });

  selectedOption.setAttribute('aria-selected', 'true');

  selectBtnText.innerText = selectedOption.innerText.trim();
};

const setActiveContent = (selectedOption) => {
  const dataTab = selectedOption.getAttribute('data-tab');

  tabContents.forEach((content) => {
    content.classList.remove('teacher-tab-content--active');
  });

  const tabContent = document.querySelector(`.teacher-tab-content[data-tab-content="${dataTab}"]`);
  if (tabContent) {
    tabContent.classList.add('teacher-tab-content--active');
    tabContent.scrollTo({ top: 0 });
  }

  tabButtons.forEach((button) => {
    if (button.getAttribute('data-tab') === dataTab) {
      button.classList.add('teacher-tab-buttons__btn--active');
    } else {
      button.classList.remove('teacher-tab-buttons__btn--active');
    }
  });
};

const handleOptionSelect = (selectedOption) => {
  setActiveOption(selectedOption); // ставим опцию в селекте
  setActiveContent(selectedOption); // ставим активный контент
  hideSelectList();
};

selectOptions.forEach((option) => {
  option.addEventListener('click', (event) => {
    handleOptionSelect(event.target);
  });
});

selectBtn.addEventListener('click', handleSelectBtnClick);

const handleModalClick = (event) => {
  if (!event.target.closest('.select')) {
    hideSelectList();
  }
};
modal.addEventListener('click', handleModalClick);

const handleModalClose = () => {
  hideSelectList();

  const defaultOption = selectOptions[0];
  if (defaultOption) {
    setActiveOption(defaultOption);
    setActiveContent(defaultOption);
  }
};
closeModalBtn.addEventListener('click', handleModalClose);
