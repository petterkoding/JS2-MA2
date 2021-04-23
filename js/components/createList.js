import { removeFromList } from "../script.js";

export default function createList(listItems) {
  const listContainer = document.querySelector("ul");

  listContainer.innerHTML = "";

  listItems.forEach((item) => {
    let twoDigits = `${item.isbn % 100}`;
    let singleDigit = `${item.isbn % 10}`;
    const rgbaValue = `rgba(0,${singleDigit}0, 2${twoDigits}, 0.7)`;

    listContainer.innerHTML += `<li style="background:${rgbaValue}"><h4>Name:${item.name} 
    </h4><span>ISBN: ${item.isbn}</span><i class="far fa-trash-alt" data-id="${item.name}"></i></li>`;
  });

  const trashCans = document.querySelectorAll("li i");

  trashCans.forEach((can) => {
    can.addEventListener("click", removeFromList);
  });
}
