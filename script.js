// Make sure the item exists and then store the contents in "lists"
if(!localStorage.getItem("lists")) localStorage.setItem("lists", "{}");
const lists = JSON.parse(localStorage.getItem("lists"));
// Save the lists to localStorage
function save() {
  localStorage.setItem("lists", JSON.stringify(lists));
}

// goto the create page
function createList() {
  window.location.pathname = "grocerylist/create";
}

// goto the edit page
function editList() {
  window.location.pathname = "grocerylist/edit";
}

// goto the remove page
function removeList() {
  window.location.pathname = "grocerylist/remove";
}

// goto the view page
function viewList() {
  window.location.pathname = "grocerylist/view";
}