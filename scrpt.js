const input = document.querySelector(".todoInput");
const button = document.querySelector("button");
const todoList = document.querySelector("#todoList");
const receivedFromLocalStorage = localStorage.getItem("tasks");

button.addEventListener("click", addTask);

let tasks = []; // array til alle tasks

if (receivedFromLocalStorage !== null) {
  tasks = JSON.parse(receivedFromLocalStorage);
  renderTasks();
}
console.log("localstorage", localStorage.getItem("tasks"));

function addTask() {
  const text = input.value;

  // Ligesom i dit change event, kan vi hente værdien direkte, når vi opretter en task:
  const type = document.querySelector("#dropDown").value; // henter valgt type

  // hvis tekstfeltet er tomt, sker der ikke noget
  if (text === "") return;

  // Udvider task-objekt, så det indeholder type:
  //her bruges vores konstanter fra ovenstående
  const task = {
    text: text,
    done: false,
    id: Date.now(),
    type: type, // Her
  };

  // når en task bliver oprettet bliver den tilføjet med push til vores array
  tasks.push(task);

  // herefter kaldes vores renderTasks
  renderTasks();

  //tekstfeltet tømmes, så en ny opgave kan tilføjes igen
  input.value = "";
}

function renderTasks() {
  //vi starter alle vores lister er tomme, menmindre de er gemt i local storage
  todoList.innerHTML = ""; // ryd TODO-liste
  todoDone.innerHTML = ""; // ryd DONE-liste

  //gemmer vores taskarray i localstorage, så computeren husker dem ved refresh
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // i vores task array giver vi hver task nedenstående
  tasks.forEach((task) => {
    //vi opretter en li til vores ul.liste
    const li = document.createElement("li");
    //vi gør klar til at lave en checkbox
    const checkbox = document.createElement("input");
    //vi laver en checkbox
    checkbox.type = "checkbox";
    //vi fortæller, at hvid checkbox er checked er tasken done
    checkbox.checked = task.done;

    // vi opretter vores delete-button med tekst og class
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn"); // <-- giver en klasse til styling

    //vi adder eventlistener med click og opretter en anonym funk og sender id'et med
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    //vi adder eventlistener på checkbox, som lytter på om den er checked og opdatere vores liste efter det
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked; // opdater objektet
      console.log(tasks);
      renderTasks(); // genrender listen
    });

    // Her bygger vi vores label, og tilføjer task.type foran teksten med template literals
    const label = document.createElement("label");
    label.textContent = `${task.type}: ${task.text}`;

    //her bygger vores elemnter fra createElement med appendChild
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);

    //hver bestemmer om tasken skal sættes ind på done eller todo baseret på checkboxens status
    if (task.done) {
      todoDone.appendChild(li);
    } else {
      todoList.appendChild(li);
    }
  });
}

//her laver vi en alert, som fortæller brugeren, at den er ved at slette en task
function deleteTask() {
  console.log("deleteBtn is clicked");
  if (confirm("You are about to delete this task! Press OK to delete task.")) {
    tasks.splice(0, 1); // slet tasken
    renderTasks(); // opdater DOM
  } else {
    console.log("User canceled their action");
  }
}
