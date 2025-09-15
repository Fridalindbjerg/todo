const input = document.querySelector(".todoInput");
const button = document.querySelector("button");
const todoList = document.querySelector("#todoList");

// document.querySelector("#toggle").addEventListener("change", (event) => moveTask(event));
// document.querySelector("button").addEventListener("change", (event) => addTask(event));
button.addEventListener("click", addTask);

function addTask() {
  const text = input.value;
  if (text === "") return;

  const li = document.createElement("li");

  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";

  checkbox.addEventListener("change", moveTask);

  const label = document.createElement("label");
  label.textContent = text;

  li.appendChild(checkbox);
  li.appendChild(label);
  todoList.appendChild(li);

  input.value = "";
}

function moveTask(event) {
  let li = event.target.parentElement;
  //   console.log("li", li);
  if (event.target.checked) {
    todoDone.appendChild(li);
  } else {
    todoList.appendChild(li);
  }
}
