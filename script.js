/* Your code here */
const taskInput = document.querySelector("#taskInput");
const addTask = document.querySelector("#addtask");
const toDos = document.querySelector("#toDos");
const doneTasks = document.querySelector("#doneTasks");

let toDosTask = [];   // task  doing
let donetoDos = [];  // tack done

const toDoKey = "toDos";
const doneTasksKey = "doneTasks";
//local storage
const isSupported = () => (typeof (Storage) !== "undefined");

function getFormatedDateTime(timestamp) {
  if (timestamp !== null) {
    const dateAndTime = new Date(timestamp.toDate());

    let formatDate = dateAndTime.toLocaleDateString([], {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    formatDate += " | ";

    if (lastTime !== null) {
      if (lastTime.toDateString() === dateAndTime.toDateString()) {
        formatDate = "";
      }
    }

    lastTime = dateAndTime;

    let formatTime = dateAndTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return formatDate + formatTime;
  } else {
    return "";
  }
}
// addTask click or enter
taskInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTask.click();
  }
});

addTask.addEventListener("click", () => {
  if (taskInput.value === "") {
    alert("Task cannot be empty");
    return;
  }
  const time = new Date();
  console.log(time);
  const taskData =  taskInput.value;  //รับค่า
  addToDo(taskData);  //เก็บค่า
  taskInput.value = "";   // เคลียค่า
});

// เก็บค่า
const addToDo = (taskData) => {
  toDosTask.unshift(taskData); // ใส่ตำแหน่งแรก
  // console.log(now.getDay());
  addTaskToDoUI(taskData);

  updateStorage(toDoKey);
}

const addDoneTask = (taskData) => {
  donetoDos.unshift(taskData);
  taskDoneUI(taskData);
  updateStorage(doneTasksKey);
}


const updateStorage = (key) => {
  if (isSupported) {
    let arr = JSON.parse(localStorage.getItem(key)) || [];
    if (key === toDoKey) arr = toDosTask;
    if (key === doneTasksKey) arr = donetoDos;
    localStorage.setItem(key, JSON.stringify(arr));
  }
}

const addTaskToDoUI = (taskData) => {
  const taskBox = document.createElement("div");
  const taskInfo = document.createElement("span");
  const taskBtns = document.createElement("div");

  taskInfo.innerHTML = taskData;


  const doneBtn = document.createElement("button");
  doneBtn.innerHTML = "done";
  doneBtn.className = "done";
  doneBtn.addEventListener("click", () => finishToDo(toDos, taskBox));


  const delBtn = document.createElement("button");
  delBtn.innerHTML = "delete";
  delBtn.className = "del";
  delBtn.addEventListener("click", () => deleteTodo(toDos, taskBox));

  taskBtns.append(doneBtn);
  taskBtns.append(delBtn);

  taskBox.className = "todo-line todo-hidden" ;
  taskInfo.className = "flex-grow show";
  taskBtns.className = "btn hidden";

  taskBox.append(taskInfo);
  taskBox.append(taskBtns);

  toDos.insertBefore(taskBox, toDos.childNodes[0]);
}

const taskDoneUI = (taskData) => {
  const taskName = document.createElement("span");
  taskName.innerHTML = taskData;
  taskName.className = "justify-items-stretch";
  taskName.style.textDecoration = "line-through";

  taskName.append(document.createElement("br"));
  doneTasks.insertBefore(taskName, doneTasks.childNodes[0]);
}

// done todo
const finishToDo = (taskList, taskElem) => {
  const index = Array.prototype.indexOf.call(taskList.children, taskElem);
  const FinishTask = toDosTask[index];

  toDosTask.splice(index, 1);
  updateStorage(toDoKey);
  addDoneTask(FinishTask);

  taskList.removeChild(taskElem);
}


// delete
const deleteTodo = (taskList, taskElem) => {
  const index = Array.prototype.indexOf.call(taskList.children, taskElem);
  toDosTask.splice(index, 1);
  updateStorage(toDoKey);

  taskList.removeChild(taskElem);
}




// Data in local
const requestDataFromStorage = () => {
  const savedToDos = JSON.parse(localStorage.getItem(toDoKey));
  const savedDoneTasks = JSON.parse(localStorage.getItem(doneTasksKey));

  if (savedToDos !== null) {
    toDosTask = [...savedToDos];
    savedToDos.reverse().forEach(task => {
      addTaskToDoUI(task);
    });
  }

  if (savedDoneTasks !== null) {
    donetoDos = [...savedDoneTasks];
    savedDoneTasks.reverse().forEach((task) => {
      taskDoneUI(task);
    });
  }
}
requestDataFromStorage();
