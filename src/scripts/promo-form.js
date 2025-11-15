const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const phoneInput = document.querySelector('#tel');
const emailInput = document.querySelector('#email');

const nameInputErrorField = document.getElementById('name-error');
const phoneInputErrorField = document.getElementById('tel-error');
const emailInputErrorField = document.getElementById('email-error');

const regexName = new RegExp(/^[а-яё\s-]{2,}$/i);
const regexPhone = new RegExp(/^(\+7|7|8)\d{10}$/);
const regexEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

let formData = {
  name: {
    value: '',
    isValid: true,
  },
  phone: {
    value: '',
    isValid: true,
  },
  email: {
    value: '',
    isValid: true,
  },
};

const highlightInput = (input, isValid) => {
  if (isValid) {
    input.classList.remove('input-field__input--error');
    return;
  }

  input.classList.add('input-field__input--error');
};

const checkNameInputValidity = () => {
  if (!formData.name.value.length) {
    nameInputErrorField.innerText = 'Поле "Имя" обязательно для заполнения';
    formData.name.isValid = false;
    highlightInput(nameInput, false);
    return false;
  }

  if (formData.name.value.length < 2) {
    nameInputErrorField.innerText = 'Имя должно содержать минимум 2 символа';
    formData.name.isValid = false;
    highlightInput(nameInput, false);
    return false;
  }

  if (!formData.name.value.match(regexName)) {
    nameInputErrorField.innerText = 'Имя должно содержать только русские буквы и пробелы';
    formData.name.isValid = false;
    highlightInput(nameInput, false);
    return false;
  }

  nameInputErrorField.innerText = '';
  formData.name.isValid = true;
  highlightInput(nameInput, true);

  return true;
};

nameInput.addEventListener('input', (event) => {
  formData.name.value = event.target.value;
  if (!formData.name.isValid) {
    checkNameInputValidity();
  }
});

const checkPhoneInputValidity = () => {
  if (!formData.phone.value.length) {
    phoneInputErrorField.innerText = 'Поле "Телефон" обязательно для заполнения';
    formData.phone.isValid = false;
    highlightInput(phoneInput, false);
    return false;
  }

  if (!formData.phone.value.match(regexPhone)) {
    phoneInputErrorField.innerText = 'Введите корректный номер телефона';
    formData.phone.isValid = false;
    highlightInput(phoneInput, false);
    return false;
  }

  phoneInputErrorField.innerText = '';
  formData.phone.isValid = true;
  highlightInput(phoneInput, true);

  return true;
};

phoneInput.addEventListener('input', (event) => {
  formData.phone.value = event.target.value;
  if (!formData.phone.isValid) {
    checkPhoneInputValidity();
  }
});

const checkEmailInputValidity = () => {
  if (!formData.email.value.length) {
    emailInputErrorField.innerText = 'Поле "Email" обязательно для заполнения';
    formData.email.isValid = false;
    highlightInput(emailInput, false);
    return false;
  }

  if (!formData.email.value.match(regexEmail)) {
    emailInputErrorField.innerText = 'Введите корректный email адрес';
    formData.email.isValid = false;
    highlightInput(emailInput, false);
    return false;
  }

  emailInputErrorField.innerText = '';
  formData.email.isValid = true;
  highlightInput(emailInput, true);

  return true;
};

emailInput.addEventListener('input', (event) => {
  formData.email.value = event.target.value;
  if (!formData.email.isValid) {
    checkEmailInputValidity();
  }
});

const resetForm = () => {
  form.reset();
  formData = {
    name: {
      value: '',
      isValid: true,
    },
    phone: {
      value: '',
      isValid: true,
    },
    email: {
      value: '',
      isValid: true,
    },
  };
};

const validateAllFields = () => {
  checkNameInputValidity();
  checkPhoneInputValidity();
  checkEmailInputValidity();
};

const checkFormValidity = () => {
  validateAllFields();

  return checkNameInputValidity() && checkPhoneInputValidity() && checkEmailInputValidity();
};

form.addEventListener('submit', (formSubmitEvent) => {
  formSubmitEvent.preventDefault();

  const isFormValid = checkFormValidity();
  if (!isFormValid) {
    return;
  }

  console.info('Заявка успешно отправлена:', {
    name: formData.name.value,
    phone: formData.phone.value,
    email: formData.email.value,
  });

  resetForm();
});
