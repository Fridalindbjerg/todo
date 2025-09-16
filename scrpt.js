const input = document.querySelector(".todoInput");
const button = document.querySelector("button");
const todoList = document.querySelector("#todoList");

button.addEventListener("click", addTask);

// **********************************************************************
// Fjernet nedenstående - udskiftet med label-type længere nede

// document.querySelector("#dropDown").addEventListener("change", (event) => {
//   console.log(event.target.value);

//   if (event.target.value === "Work") {
//     console.log("WORK!");
//     document.querySelector("h3").textContent = event.target.value; // eller "Work"
//     console.log("true");
//   }
// });
// *****************************************************************************

let tasks = []; // array til alle tasks
const receivedFromLocalStorage = localStorage.getItem("tasks");

if (receivedFromLocalStorage !== null) {
  tasks = JSON.parse(receivedFromLocalStorage);
  renderTasks();
}
console.log("localstorage", localStorage.getItem("tasks"));

function addTask() {
  const text = input.value;

  // Ligesom i dit change event, kan vi hente værdien direkte, når vi opretter en task:
  const type = document.querySelector("#dropDown").value; // henter valgt type

  if (text === "") return;

  // Udvider task-objekt, så det indeholder type:
  const task = {
    text: text,
    done: false,
    id: Date.now(),
    type: type, // Her
  };

  tasks.push(task);
  renderTasks();
  input.value = "";
}

function renderTasks() {
  todoList.innerHTML = ""; // ryd TODO-liste
  todoDone.innerHTML = ""; // ryd DONE-liste

  localStorage.setItem("tasks", JSON.stringify(tasks));

  tasks.forEach((task) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn"); // <-- giver en klasse til styling
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked; // opdater objektet
      console.log(tasks);
      renderTasks(); // genrender listen
    });

    // ****************** Lavet denne ændring ************************

    // Bygger label, og tilføjer task.type foran teksten:
    const label = document.createElement("label");
    label.textContent = `${task.type}: ${task.text}`;

    //     const label = document.createElement("label");
    //     label.textContent = task.text;

    // ***************************************************************

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
  if (confirm("You are about to delete this task! Press OK to delete task.")) {
    tasks.splice(0, 1); // slet tasken
    renderTasks(); // opdater DOM
  } else {
    console.log("User canceled their action");
  }
}

// document.querySelector("#dropDown").addEventListener("change", (event) => {
//   console.log(event.target.value);
//   if (event.target.value === "Work") {
//     document.querySelector("#type").textContent = work;
//     console.log("true");
//     // const headLine = document.createElement("h3");
//     // headLine.textContent = event.target.value;
//   }
// });

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
