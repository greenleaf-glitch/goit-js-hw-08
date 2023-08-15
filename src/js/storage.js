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

export { storageSave, storageLoad, storageRemove };
