let arrayTodo = checkTodo();
let input_Todo = document.getElementById("inputTodo");
let submit_Button = document.getElementById("submitButton");
let edit_Todo = document.getElementById("editTodo");
let edit_Button = document.getElementById("editButton");
let search_Todo = document.getElementById("searchTodo");

function template(arrayTodo, index) {
  return `
  <p id="textListTodo${index}">${arrayTodo.fullName}</p>
  <img id="deleteListTodo${index}" class="updateTodo float-right icon-small" onclick=deleteTodo(${index}) src="./assets/check.png" alt="V">
  <img id="editListTodo${index}" class="float-right icon-small" onclick=updateTodo(${index}) src="./assets/edit.png" alt="Edit">
  `;
}

function showTodo() {
  listTodo.innerHTML = "";

  // for (var i = 0; i < arrayTodo.length; i++) {
  //   const element = document.createElement("div");
  //   element.innerHTML = template(arrayTodo[i])
  //   listTodo.append(element);
  // }

  arrayTodo.map((arrayTodo, index) => {
    var element = document.createElement("div");
    element.innerHTML = template(arrayTodo, index);
    listTodo.append(element);
  });
}

function checkTodo() {
  if (localStorage.todoLocal) {
    let arrayTodo = JSON.parse(localStorage.todoLocal);
    return arrayTodo;
  } else {
    localStorage.todoLocal = "[]";
    return [];
  }
}

function addTodo() {
  event.preventDefault();

  let objectTodo = {};

  if (input_Todo.value == "") {
    alert("Please add some input");
  } else {
    objectTodo.fullName = input_Todo.value;
    arrayTodo.push(objectTodo);
  }

  input_Todo.value = "";
  storeTodoToLocal(arrayTodo);

  return arrayTodo;
}

function storeTodoToLocal() {
  localStorage.todoLocal = JSON.stringify(arrayTodo);

  showTodo();
}

submit_Button.addEventListener("click", addTodo);
// input_Todo.addEventListener("submit", storeTodoToLocal);
// input_Todo.addEventListener("keyup", function(event) {
//   event.preventDefault();
//   if (event.keyCode === 13) {
//     submit_Button.click();
//   }
// });

showTodo();