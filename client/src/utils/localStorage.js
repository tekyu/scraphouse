/* eslint-disable */
function storageAvailable() {
  try {
    var storage = window.localStorage;
    const x = `__storage_test__`;
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === `QuotaExceededError` ||
        // Firefox
        e.name === `NS_ERROR_DOM_QUOTA_REACHED`) &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export const getStorage = () => storageAvailable() && window.localStorage;

export const getItemFromStorage = (key) => {
  const value = getStorage().getItem(key);
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

export const setItemToStorage = (key, value) => {
  getStorage().setItem(key, JSON.stringify(value));
};

export const clearStorage = () => {
  getStorage().clear();
};

export const removeItemFromStorage = (key) => {
  getStorage().removeItem(key);
};
