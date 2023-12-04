import throttle from 'lodash.throttle';
const feedbackForm = document.querySelector('.feedback-form');
const STORAGE_KEY_NAME = 'feedback-form-state';

const email = feedbackForm.email;
const message = feedbackForm.message;
let currentValues = {};

feedbackForm.addEventListener('input', throttle(handlerInputForm, 500));
feedbackForm.addEventListener('submit', handlerSubmitForm);
document.addEventListener('DOMContentLoaded', restoreFormData);

function handlerInputForm(event) {
  event.preventDefault();

  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
    currentValues.email = email.value;
    currentValues.message = message.value;
    localStorage.setItem(STORAGE_KEY_NAME, JSON.stringify(currentValues));
  }
}

function handlerSubmitForm(event) {
  event.preventDefault();

  localStorage.removeItem(STORAGE_KEY_NAME);
  event.currentTarget.reset();
  console.log({ email: currentValues.email, message: currentValues.message });
}

function restoreFormData() {
  const savedStorage = JSON.parse(localStorage.getItem(STORAGE_KEY_NAME));

  if (savedStorage) {
    email.value = savedStorage.email || '';
    message.value = savedStorage.message || '';
  }

  console.log(savedStorage);
}
