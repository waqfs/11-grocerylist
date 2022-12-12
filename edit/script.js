// Make sure the item exists and then store the contents in "lists"
if(!localStorage.getItem("lists")) localStorage.setItem("lists", "{}");
const lists = JSON.parse(localStorage.getItem("lists"));
// Save the lists to localStorage
function save() {
  localStorage.setItem("lists", JSON.stringify(lists));
}

let editingList = null;

// adds an item to the grocery list
function addItem(listName, itemName, quanity) {
  // if the item doesn't exist in the list already, initialize it to 0
  if(!lists[listName][itemName]) lists[listName][itemName] = 0;
  // add the quanity to the item
  lists[listName][itemName] += quanity;
  save();
  return ["Item added", true];
}

function showEditTools() {
  document.getElementById("content").innerHTML = "<h1>Grocery List</h1>";
  // create a button named "Add Item"
  const addItem = document.createElement("button");
  addItem.textContent = "Add Item";
  addItem.className = "big";
  addItem.onclick = function() {
    showAddItem();
  }

  const customItem = document.createElement("button");
  customItem.textContent = "Add Custom Item";
  customItem.className = "big";
  customItem.onclick = function() {
    showCustomItem();
  }

  const delItem = document.createElement("button");
  delItem.textContent = "Delete Item";
  delItem.className = "big";
  delItem.onclick = function() {
    showDeleteItem();
  }

  const back = document.createElement("button");
  back.textContent = "Back";
  back.className = "big";
  back.onclick = function() {
    location.reload();
  }

  document.getElementById("content").appendChild(addItem);
  document.getElementById("content").appendChild(customItem);
  document.getElementById("content").appendChild(delItem);
  document.getElementById("content").appendChild(back);
}

function showAddItem(category) {
  document.getElementById("content").innerHTML = "<h1>Grocery List</h1>";
  if(!category) {
    for(const category in items) {
      const button = document.createElement("button");
      button.textContent = category;
      button.className = "big";
      button.onclick = function() {
        showAddItem(category);
      }
      document.getElementById("content").appendChild(button);
    }
  }else {
    const categoryItems = items[category];
    for(const item of categoryItems) {
      const button = document.createElement("button");
      button.textContent = item;
      button.className = "big";
      button.onclick = function() {
        showQuantityTool(item);
      }
      document.getElementById("content").appendChild(button);
    }
  }
}

function showCustomItem() {
  document.getElementById("content").innerHTML = "<h1>Grocery List</h1>";
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Item Name";
  input.className = "big";
  document.getElementById("content").appendChild(input);

  const quantity = document.createElement("input");
  quantity.type = "number";
  quantity.placeholder = "Quantity";
  quantity.className = "big";
  document.getElementById("content").appendChild(quantity);

  const button = document.createElement("button");
  button.textContent = "Add";
  button.className = "big";
  button.onclick = function() {
    addItem(editingList, input.value, parseInt(quantity.value));
    showEditTools();
  }
  document.getElementById("content").appendChild(button);
}

function showDeleteItem() {
  document.getElementById("content").innerHTML = "<h1>Grocery List</h1>";
  const listItems = lists[editingList];
  for(const item in listItems) {
    const button = document.createElement("button");
    button.textContent = item + " (" + listItems[item] + "x)";
    button.className = "big";
    button.onclick = function() {
      delete listItems[item];
      save();
      showEditTools();
    }
    document.getElementById("content").appendChild(button);
  }
}

function showQuantityTool(item) {
  document.getElementById("content").innerHTML = "<h1>Grocery List</h1>";
  const input = document.createElement("input");
  input.type = "number";
  input.placeholder = "Quantity";
  input.className = "big";
  document.getElementById("content").appendChild(input);

  const button = document.createElement("button");
  button.textContent = "Add";
  button.className = "big";
  button.onclick = function() {
    alert(addItem(editingList, item, parseInt(input.value)));
    showEditTools();
  }
  document.getElementById("content").appendChild(button);
}

window.onload = function() {
  const content = document.getElementById("content");
  const back = document.createElement("button");
  back.textContent = "Back";
  back.className = "big";
  back.onclick = function() {
    window.location.pathname = "/";
  }
  content.appendChild(back);
  for(const list in lists) {
    // create button element with the list name
    const button = document.createElement("button");
    button.textContent = list + " (" + Object.keys(lists[list]).length + " items)";
    button.className = "big";
    // add the onclick event to the button
    button.onclick = function() {
      editingList = list;
      showEditTools();
    }
    content.appendChild(button);
  }
}