class Task {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.completed = false;
  }
}

const tasks = [];

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const emptyNote = document.createElement("li");
    emptyNote.className = "empty-note";
    emptyNote.textContent = "No tasks yet. Add one above.";
    taskList.appendChild(emptyNote);
    return;
  }

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = "task-item";
    if (task.completed) {
      listItem.classList.add("completed");
    }

    const taskText = document.createElement("p");
    taskText.className = "task-text";
    taskText.textContent = task.text;
    taskText.addEventListener("click", () => toggleTask(task.id));

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    listItem.append(taskText, deleteButton);
    taskList.appendChild(listItem);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    return;
  }

  const task = new Task(Date.now(), text);
  tasks.push(task);
  taskInput.value = "";
  taskInput.focus();
  renderTasks();
}

function toggleTask(taskId) {
  const task = tasks.find((item) => item.id === taskId);
  if (!task) {
    return;
  }
  task.completed = !task.completed;
  renderTasks();
}

function deleteTask(taskId) {
  const taskIndex = tasks.findIndex((item) => item.id === taskId);
  if (taskIndex === -1) {
    return;
  }
  tasks.splice(taskIndex, 1);
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

renderTasks();
