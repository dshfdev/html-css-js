const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const phoneInput = document.querySelector('#tel');
const emailInput = document.querySelector('#email');

const nameInputErrorField = document.getElementById('name-error');
const phoneInputErrorField = document.getElementById('tel-error');
const emailInputErrorField = document.getElementById('email-error');

const regexName = new RegExp(/^[а-яё\s\-]{2,}$/i);
const regexPhone = new RegExp(/^(\+7|7|8)\d{10}$/);
const regexEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

const validateNameInput = (value) => {
  if (!value.trim()) {
    return 'Поле "Имя" обязательно для заполнения';
  }
  if (value.length < 2) {
    return 'Имя должно содержать минимум 2 символа';
  }
  if (!regexName.test(value)) {
    return 'Имя должно содержать только русские буквы и пробелы';
  }
  return '';
};
const validatePhoneInput = (value) => {
  if (!value.trim()) {
    return 'Поле "Телефон" обязательно для заполнения';
  }
  const digitsOnly = value.replace(/\D/g, '');
  if (!/^(\+7|7|8)/.test(value)) {
    return 'Номер должен начинаться с +7, 7 или 8';
  }
  if (digitsOnly.length < 11) {
    const remainingDigit = 11 - digitsOnly.length;
    return `Введите ещё ${remainingDigit} цифр`;
  }
  if (digitsOnly.length > 11) {
    return 'Номер слишком длинный. Удалите лишние цифры';
  }
  if (!regexPhone.test(value)) {
    return 'Телефон должен содержать только цифры';
  }
  return '';
};
const validateEmailInput = (value) => {
  if (!value.trim()) {
    return 'Поле "Email" обязательно для заполнения';
  }
  if (!regexEmail.test(value)) {
    return 'Введите корректный email адрес';
  }
  return '';
};

const highlightInput = (input, errorField, errorMessage) => {
  if (errorMessage) {
    input.classList.add('input-field__input--error');
    errorField.textContent = errorMessage;
  } else {
    input.classList.remove('input-field__input--error');
    errorField.textContent = '';
  }
};

let formData = {
  name: {
    value: '',
    isValid: false,
  },
  phone: {
    value: '',
    isValid: false,
  },
  email: {
    value: '',
    isValid: false,
  },
};

let isFormSubmit = false;

function handleNameValueChange(event) {
  formData.name.value = event.target.value;

  if (isFormSubmit) {
    const errorMessage = validateNameInput(formData.name.value);
    formData.name.isValid = !errorMessage;
    highlightInput(nameInput, nameInputErrorField, errorMessage);
  }
}
nameInput.addEventListener('input', handleNameValueChange);

function handlePhoneValueChange(event) {
  formData.phone.value = event.target.value;

  if (isFormSubmit) {
    const errorMessage = validatePhoneInput(formData.phone.value);
    formData.phone.isValid = !errorMessage;
    highlightInput(phoneInput, phoneInputErrorField, errorMessage);
  }
}
phoneInput.addEventListener('input', handlePhoneValueChange);

function handleEmailValueChange(event) {
  formData.email.value = event.target.value;

  if (isFormSubmit) {
    const errorMessage = validateEmailInput(formData.email.value);
    formData.email.isValid = !errorMessage;
    highlightInput(emailInput, emailInputErrorField, errorMessage);
  }
}
emailInput.addEventListener('input', handleEmailValueChange);

function checkNameValidity() {
  const errorMessage = validateNameInput(formData.name.value);
  formData.name.isValid = !errorMessage;
  highlightInput(nameInput, nameInputErrorField, errorMessage);
}
function checkPhoneValidity() {
  const errorMessage = validatePhoneInput(formData.phone.value);
  formData.phone.isValid = !errorMessage;
  highlightInput(phoneInput, phoneInputErrorField, errorMessage);
}
function checkEmailValidity() {
  const errorMessage = validateEmailInput(formData.email.value);
  formData.email.isValid = !errorMessage;
  highlightInput(emailInput, emailInputErrorField, errorMessage);
}

function clearInputs() {
  formData = {
    name: {
      value: '',
      isValid: false,
    },
    phone: {
      value: '',
      isValid: false,
    },
    email: {
      value: '',
      isValid: false,
    },
  };
  nameInput.value = '';
  phoneInput.value = '';
  emailInput.value = '';

  nameInput.classList.remove('input-field__input--error');
  phoneInput.classList.remove('input-field__input--error');
  emailInput.classList.remove('input-field__input--error');
  nameInputErrorField.textContent = '';
  phoneInputErrorField.textContent = '';
  emailInputErrorField.textContent = '';

  isFormSubmit = false;
}

function checkFormValidity() {
  checkNameValidity();
  checkPhoneValidity();
  checkEmailValidity();

  const isAllInputsValid =
    formData.name.isValid && formData.phone.isValid && formData.email.isValid;

  if (isAllInputsValid) {
    console.log('Заявка успешно отправлена:', {
      name: formData.name.value,
      phone: formData.phone.value,
      email: formData.email.value,
    });

    clearInputs();
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  isFormSubmit = true;
  checkFormValidity();
});
