export function doesItExist(listItems, name) {
  const found = listItems.some((el) => el.name === name);
  if (found) {
    return true;
  }
}
