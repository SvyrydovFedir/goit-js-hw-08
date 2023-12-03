import throttle from 'lodash.throttle';
const feedbackForm = document.querySelector('.feedback-form');
const STORAGE_KEY_NAME = 'feedback-form-state';

feedbackForm.addEventListener('input', throttle(handlerForm, 500));

function handlerForm(event) {
  event.preventDefault();
  const email = feedbackForm.email;
  const message = feedbackForm.message;

  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
    const currentValues = {
      email: email.value,
      message: message.value,
    };

    localStorage.setItem(STORAGE_KEY_NAME, JSON.stringify(currentValues));

    const savedStorage = localStorage.getItem(STORAGE_KEY_NAME);
    if (savedStorage) {
      email.value = JSON.parse(savedStorage).email;
      message.value = JSON.parse(savedStorage).message;
    }
  }
}
