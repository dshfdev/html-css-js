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

function handleNameValueChange(event) {
  formData.name.value = event.target.value;
  formData.name.isValid = true;
  nameInput.classList.remove('input-field__input--error');
  nameInputErrorField.textContent = '';
}
nameInput.addEventListener('input', handleNameValueChange);
nameInput.addEventListener('paste', handleNameValueChange);
nameInput.addEventListener('keydown', handleNameValueChange);

function handlePhoneValueChange(event) {
  formData.phone.value = event.target.value;
  formData.phone.isValid = true;
  phoneInput.classList.remove('input-field__input--error');
  phoneInputErrorField.textContent = '';
}
phoneInput.addEventListener('input', handlePhoneValueChange);
phoneInput.addEventListener('paste', handlePhoneValueChange);
phoneInput.addEventListener('keydown', handlePhoneValueChange);

function handleEmailValueChange(event) {
  formData.email.value = event.target.value;
  formData.phone.isValid = true;
  emailInput.classList.remove('input-field__input--error');
  emailInputErrorField.textContent = '';
}
emailInput.addEventListener('input', handleEmailValueChange);
emailInput.addEventListener('paste', handleEmailValueChange);
emailInput.addEventListener('keydown', handleEmailValueChange);

function checkNameValidity() {
  const isValidValue = formData.name.value.match(regexName);
  formData.name.isValid = isValidValue;
  if (!isValidValue) {
    nameInput.classList.add('input-field__input--error');
    nameInputErrorField.textContent = 'Имя должно содержать только русские буквы (мин. 2 символа)';
    return;
  }
  nameInput.classList.remove('input-field__input--error');
  nameInputErrorField.textContent = '';
}

function checkPhoneValidity() {
  const isValidValue = formData.phone.value.match(regexPhone);
  formData.phone.isValid = isValidValue;
  if (!isValidValue) {
    phoneInput.classList.add('input-field__input--error');
    phoneInputErrorField.textContent = 'Введите корректный номер телефона';
    return;
  }
  phoneInput.classList.remove('input-field__input--error');
  phoneInputErrorField.textContent = '';
}
function checkEmailValidity() {
  const isValidValue = formData.email.value.match(regexEmail);
  formData.email.isValid = isValidValue;
  if (!isValidValue) {
    emailInput.classList.add('input-field__input--error');
    emailInputErrorField.textContent = 'Введите корректный email адрес';
    return;
  }
  emailInput.classList.remove('input-field__input--error');
  emailInputErrorField.textContent = '';
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

  nameInputErrorField.textContent = '';
  phoneInputErrorField.textContent = '';
  emailInputErrorField.textContent = '';
}

function checkFormValidity() {
  checkNameValidity();
  checkPhoneValidity();
  checkEmailValidity();

  const formNativeValidity = form.checkValidity();
  const isAllInputsValid = Object.values(formData).filter((value) => !value.isValid).length;

  if (formNativeValidity && Boolean(!isAllInputsValid)) {
    console.info('Заявка успешно отправлена:', {
      name: formData.name.value,
      phone: formData.phone.value,
      email: formData.email.value,
    });

    clearInputs();
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkFormValidity();
});
