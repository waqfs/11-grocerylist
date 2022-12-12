// Make sure the item exists and then store the contents in "lists"
if(!localStorage.getItem("lists")) localStorage.setItem("lists", "{}");
const lists = JSON.parse(localStorage.getItem("lists"));
// Save the lists to localStorage
function save() {
  localStorage.setItem("lists", JSON.stringify(lists));
}

// called by user to view a list
function viewList(name) {
  const items = lists[name];
  const content = document.getElementById("content");
  content.innerHTML = "<h1>Grocery List</h1>";
  const back = document.createElement("button");
  back.textContent = "Back";
  back.className = "big";
  back.onclick = function() {
    location.reload();
  }
  content.appendChild(back);
  for(const item in items) {
    const button = document.createElement("button");
    button.textContent = item + " (" + items[item] + ")";
    button.className = "big";
    content.appendChild(button);
  }
}

window.onload = function() {
  const content = document.getElementById("content");
  const back = document.createElement("button");
  back.textContent = "Back";
  back.className = "big";
  back.onclick = function() {
    window.location.pathname = "grocerylist/";
  }
  content.appendChild(back);
  for(const list in lists) {
    // create button element with the list name
    const button = document.createElement("button");
    button.textContent = list + " (" + Object.keys(lists[list]).length + " items)";
    button.className = "big";
    // add the onclick event to the button
    button.onclick = function() {
      viewList(list);
    }
    content.appendChild(button);
  }
}