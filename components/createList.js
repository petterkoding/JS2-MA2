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

function removeFromList(listItems) {
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
