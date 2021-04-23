import { listKey } from "../settings/listKey.js";
import { displayMessage } from "../components/displayMessage.js";
import { saveToStorage, retrieveFromStorage } from "../utils/saveToStorage.js";

let listItems = retrieveFromStorage(listKey);

createList(listItems);

const listInput = document.querySelector("input");
const button = document.querySelector("button");

button.disabled = true;

listInput.addEventListener("keyup", checkIfDisabled);

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

button.addEventListener("click", addToList);

function addToList() {
  const name = listInput.value.trim();
  const isbn = Date.now();

  const newestItem = { name: name, isbn: isbn };
  //

  const found = listItems.some((el) => el.name === name);
  if (found) {
    button.disabled = true;
    displayMessage(
      "warning",
      `This already exists! <i class="fas fa-exclamation-circle"></i>`,
      alert
    );
  }
  if (!found) {
    listItems.push(newestItem);
    createList(listItems);
    saveToStorage(listKey, listItems);
    listInput.value = "";
    listInput.focus();
    button.disabled = false;
  }
}

function createList() {
  const listContainer = document.querySelector("ul");

  listContainer.innerHTML = "";

  listItems.forEach((item) => {
    listContainer.innerHTML += `<li><span>Name:${item.name} ISBN: ${item.isbn}</span><i class="far fa-trash-alt" data-id="${item.name}"></i></li>`;
  });

  const trashCans = document.querySelectorAll("li i");

  trashCans.forEach((can) => {
    can.addEventListener("click", removeFromList);
  });
}

function removeFromList() {
  const deleteItem = event.target.dataset.id;
  const newList = listItems.filter((item) => {
    if (deleteItem !== item.name) {
      return true;
    }
  });

  listItems = newList;
  createList(listItems);
  saveToStorage(listKey, newList);
}
