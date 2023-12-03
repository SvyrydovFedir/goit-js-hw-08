import throttle from 'lodash.throttle';
const feedbackForm = document.querySelector('.feedback-form');
const STORAGE_KEY_NAME = 'feedback-form-state';

const email = feedbackForm.email;
const message = feedbackForm.message;

feedbackForm.addEventListener('input', throttle(handlerInputForm, 500));
feedbackForm.addEventListener('submit', throttle(handlerSubmitForm, 500));

function handlerInputForm(event) {
  event.preventDefault();

  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
    const currentValues = {
      email: email.value,
      message: message.value,
    };

    localStorage.setItem(STORAGE_KEY_NAME, JSON.stringify(currentValues));

    const savedStorage = localStorage.getItem(STORAGE_KEY_NAME);
    if (savedStorage) {
      email.value = JSON.parse(savedStorage).email || '';
      message.value = JSON.parse(savedStorage).message || '';
    }
  }
}

function handlerSubmitForm(event) {
  event.preventDefault();

  localStorage.removeItem(STORAGE_KEY_NAME);
  console.log(`email: ${email.value}; message ${message.value}`);
}
