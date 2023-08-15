import throttle from 'lodash.throttle';

refs = {
  form: document.querySelector('form'),
};

let formContent = {};
const storageKey = 'feedback-form-state';

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onSubmit);

updateFormOutput();

function onFormInput(evt) {
  evt.preventDefault();

  const value = evt.target.value;
  const key = evt.target.name;
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
  evt.target.reset();
  storageRemove(storageKey);
  formContent = {};
}

// ======== Ф-ії роботи зi сховищем можна винести в окремий файл, але умовами задачі не передбачено =======

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
