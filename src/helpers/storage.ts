function setItemToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getItemFromStorage(key) {
  const itemString = localStorage.getItem(key);
  if (!itemString) {
    return null;
  }
  return JSON.parse(itemString);
}

function deleteItemFromStorage(key) {
  localStorage.removeItem(key);
}

export { setItemToStorage, getItemFromStorage, deleteItemFromStorage };
