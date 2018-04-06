function updateTodo(index) {
  edit_Todo.value = JSON.parse(localStorage.todoLocal)[index].fullName;
  deleteTodo(index);
  hideSubmitEditButton();
}

function hideSubmitAddButton() {
  submit_Button.style.display = "inline";
  input_Todo.style.display = "inline";
  edit_Button.style.display = "none";
  edit_Todo.style.display = "none";
}

function hideSubmitEditButton(index) {
  submit_Button.style.display = "none";
  input_Todo.style.display = "none";
  edit_Button.style.display = "inline";
  edit_Todo.style.display = "inline";
}

function addUpdateTodo(index) {
  event.preventDefault();
  if (edit_Todo.value === "") {
    alert("Please input your task")
  } else {
    var edit = edit_Todo.value;
    console.log(edit);
    var objectEdit = JSON.parse(`{"fullName":"${edit}"}`);
    arrayTodo.unshift(objectEdit)
    localStorage.todoLocal = JSON.stringify(arrayTodo);
    hideSubmitAddButton();
    input_Todo.value = "";
  }
  showTodo();
}

edit_Button.addEventListener("click", addUpdateTodo);
// edit_Todo.addEventListener("keyup", function(event) {
//   event.preventDefault();
//   if (event.keyCode === 13) {
//     edit_Button.click();
//   }
// });