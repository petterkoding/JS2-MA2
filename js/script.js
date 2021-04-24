import { listKey } from "./settings/listKey.js";
import { displayMessage } from "./components/displayMessage.js";
import { saveToStorage, retrieveFromStorage } from "./utils/saveToStorage.js";
import createList from "./components/createList.js";
import { doesItExist } from "./components/doesItExist.js";

let listItems = retrieveFromStorage(listKey);

createList(listItems);

const listInput = document.querySelector("input");
const button = document.querySelector("button");

button.disabled = true;

const alert = ".alert";

function checkIfDisabled() {
  if (listInput.value.trim().length >= 2) {
    displayMessage("", "", alert);
    button.disabled = false;
  } else {
    button.disabled = true;
    displayMessage(
      "",
      `Min two characters<i class="fas fa-exclamation-circle"></i>`,
      alert
    );
  }
}

function addToList() {
  const name = listInput.value.trim();
  const isbn = Date.now();

  const newestItem = { name: name, isbn: isbn };

  if (doesItExist(listItems, name)) {
    button.disabled = true;
    displayMessage(
      "warning",
      `This already exists! <i class="fas fa-exclamation-circle"></i>`,
      alert
    );
  }
  if (!doesItExist(listItems, name)) {
    listItems.push(newestItem);
    createList(listItems);
    saveToStorage(listKey, listItems);
    listInput.value = "";
    listInput.focus();
    button.disabled = true;
  }
}

export function removeFromList(event) {
  const deleteItem = event.target.dataset.id;

  const newList = listItems.filter((item) => {
    if (deleteItem !== item.name) {
      return true;
    }
  });

  listItems = newList;
  createList(listItems);
  saveToStorage(listKey, newList);

  if (listItems.length === 0) {
    displayMessage("", "List is empty", alert);
  }
}

listInput.addEventListener("keyup", checkIfDisabled);
button.addEventListener("click", addToList);
