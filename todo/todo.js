const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("ul");

const TODOS_LS = "toDos";
let toDos = [];

function delteToDos(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function implementToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  delBtn.innerText = "X";

  delBtn.addEventListener("click", delteToDos);
  const newId = toDos.length + 1;
  li.id = newId;
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  toDoList.appendChild(li);
  const toDoObj = {
    text,
    id: newId
  };

  toDos.push(toDoObj);
  saveToDos();
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const currentInput = toDoInput.value;

  implementToDo(currentInput);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      implementToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleToDoSubmit);
}

init();
