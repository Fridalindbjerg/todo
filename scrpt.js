const input = document.querySelector(".todoInput");
const button = document.querySelector("button");
const todoList = document.querySelector("#todoList");

button.addEventListener("click", addTask);

const tasks = []; // array til alle tasks

function addTask() {
  const text = input.value;
  if (text === "") return;

  // opret et objekt for task
  const task = {
    text: text,
    done: false,
    id: Date.now(), // unik id, fx baseret på tidspunkt
    // type: input.value
  };

  console.log(task);

  tasks.push(task); // tilføj til array

  renderTasks(); // opdater listen i DOM
  input.value = "";
}

function renderTasks() {
  todoList.innerHTML = ""; // ryd TODO-liste
  todoDone.innerHTML = ""; // ryd DONE-liste

  tasks.forEach((task) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", deleteTask);

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked; // opdater objektet
      console.log(tasks);
      renderTasks(); // genrender listen
    });

    const label = document.createElement("label");
    label.textContent = task.text;

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);

    if (task.done) {
      todoDone.appendChild(li);
    } else {
      todoList.appendChild(li);
    }
  });
}

function deleteTask() {
  console.log("deleteBtn is clicked");
  if (confirm("Press ok to delete your task")) {
    tasks.splice(0, 1); // slet tasken
    renderTasks(); // opdater DOM
  } else {
    console.log("User canceled their action");
  }
}

// function addTask() {
//   const text = input.value;
//   if (text === "") return;

//   const li = document.createElement("li");

//   const checkbox = document.createElement("input");

//   checkbox.type = "checkbox";

//   checkbox.addEventListener("change", moveTask);

//   const label = document.createElement("label");
//   label.textContent = text;

//   li.appendChild(checkbox);
//   li.appendChild(label);
//   todoList.appendChild(li);

//   input.value = "";
// }

// function moveTask(event) {
//   let li = event.target.parentElement;
//   //   console.log("li", li);
//   if (event.target.checked) {
//     todoDone.appendChild(li);
//   } else {
//     todoList.appendChild(li);
//   }
// }

// document.querySelector("#toggle").addEventListener("change", (event) => moveTask(event));
// document.querySelector("button").addEventListener("change", (event) => addTask(event));
