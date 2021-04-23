import { removeFromList } from "../script.js";

export default function createList(listItems) {
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
