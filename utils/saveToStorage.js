export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function retrieveFromStorage(key) {
  const currentList = localStorage.getItem(key);

  if (!currentList) {
    return [];
  }

  return JSON.parse(currentList);
}
