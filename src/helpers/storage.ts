function setItemToStorage(key: string, value: string) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getItemFromStorage(key: string) {
  const itemString = localStorage.getItem(key);
  if (!itemString) {
    return null;
  }
  return JSON.parse(itemString);
}

function deleteItemFromStorage(key: string) {
  localStorage.removeItem(key);
}

export { setItemToStorage, getItemFromStorage, deleteItemFromStorage };
