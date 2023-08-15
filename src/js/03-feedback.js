import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('form'),
};

let formContent = {};
const storageKey = 'feedback-form-state';

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onSubmit);

updateFormOutput();

function onFormInput(evt) {
  evt.preventDefault();

  const value = evt.target.value.trim();
  const key = evt.target.name.trim();
  formContent[key] = value;

  storageSave(storageKey, formContent);
}

function updateFormOutput() {
  const dataFromStorage = storageLoad(storageKey) || {};

  refs.form.elements.email.value = dataFromStorage?.email || '';
  refs.form.elements.message.value = dataFromStorage?.message || '';

  formContent = dataFromStorage;
}

function onSubmit(evt) {
  evt.preventDefault();
  if (refs.form.elements.email.value && refs.form.elements.message.value) {
    evt.target.reset();
    storageRemove(storageKey);
    console.log(formContent);
    formContent = {};
  }
}

// =======

function storageSave(key, value) {
  try {
    const str = JSON.stringify(value);
    localStorage.setItem(key, str);
  } catch (error) {
    console.error('Set error: ', error.message);
  }
}

function storageLoad(key) {
  try {
    const str = localStorage.getItem(key);
    return str === null ? undefined : JSON.parse(str);
  } catch (error) {
    console.error('Get error: ', error.message);
  }
}

function storageRemove(key) {
  localStorage.removeItem(key);
}
