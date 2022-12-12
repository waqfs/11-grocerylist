// Make sure the item exists and then store the contents in "lists"
if(!localStorage.getItem("lists")) localStorage.setItem("lists", "{}");
const lists = JSON.parse(localStorage.getItem("lists"));
// Save the lists to localStorage
function save() {
  localStorage.setItem("lists", JSON.stringify(lists));
}

// called by user to remove a list
function removeList(name) {
  // delete the list from the lists object
  delete lists[name];
  save();
  location.reload();
}

window.onload = function() {
  const back = document.createElement("button");
  back.textContent = "Back";
  back.className = "big";
  back.onclick = function() {
    location.href = "/";
  }
  document.getElementById("content").appendChild(back);

  for(const list in lists) {
    const button = document.createElement("button");
    button.textContent = list + " (" + Object.keys(lists[list]).length + " items)";
    button.className = "big";
    button.onclick = function() {
      removeList(list);
    }
    document.getElementById("content").appendChild(button);
  }
}