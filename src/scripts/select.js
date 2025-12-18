const tabButtons = document.querySelectorAll('.teacher-tab-buttons__btn');
const tabContents = document.querySelectorAll('.teacher-tab-content');
const selectBtn = document.querySelector('#select-btn');
const selectList = document.querySelector('#select-list');
const selectOptions = document.querySelectorAll('#select-list li');
const selectBtnText = document.querySelector('.select__selected-text');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.modal__close-btn');

const showSelectList = () => {
  selectList.removeAttribute('hidden');
  selectBtn.setAttribute('aria-expanded', 'true');
};

const hideSelectList = () => {
  selectList.setAttribute('hidden', '');
  selectBtn.setAttribute('aria-expanded', 'false');
};

const handleSelectBtnClick = () => {
  if (!selectList.hasAttribute('hidden')) {
    hideSelectList();
    return;
  }

  showSelectList();
};

const updateActiveTabBtn = (dataTab) => {
  tabButtons.forEach((button) => {
    if (button.getAttribute('data-tab') !== dataTab) {
      button.classList.remove('teacher-tab-buttons__btn--active');
      return;
    }

    button.classList.add('teacher-tab-buttons__btn--active');
  });
};

const setActiveOption = (selectedOption) => {
  selectOptions.forEach((option) => {
    option.setAttribute('aria-selected', 'false');
  });

  selectedOption.setAttribute('aria-selected', 'true');

  selectBtnText.innerText = selectedOption.innerText.trim();

  const dataTab = selectedOption.getAttribute('data-tab');
  updateActiveTabBtn(dataTab);
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
  if (event.target.closest('.select')) {
    return;
  }

  hideSelectList();
};
modal.addEventListener('click', handleModalClick);

const handleModalClose = () => {
  hideSelectList();

  const defaultOption = selectOptions[0];
  if (!defaultOption) {
    return;
  }

  setActiveOption(defaultOption);
  setActiveContent(defaultOption);
};
closeModalBtn.addEventListener('click', handleModalClose);
