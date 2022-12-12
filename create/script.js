// Make sure the item exists and then store the contents in "lists"
if(!localStorage.getItem("lists")) localStorage.setItem("lists", "{}");
const lists = JSON.parse(localStorage.getItem("lists"));
// Save the lists to localStorage
function save() {
  localStorage.setItem("lists", JSON.stringify(lists));
  console.log("saved", localStorage.getItem("lists"));
}

// called by user to create a new list
function createList(name) {
  // if list already exists with the given name
  if(lists[name]) return ["List already exists", false];
  // otherwise create the list
  lists[name] = {};
  save();
  return ["List created", true];
}

// called when the user clicks a button
function button() {
  const name = document.getElementById("listName").value;
  const result = createList(name);
  if(result[1]) {
    window.location.pathname = "grocerylist/edit";
  }else {

  }
}