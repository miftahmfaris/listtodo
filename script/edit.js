function updateTodo(index) {
  edit_Todo.value = JSON.parse(localStorage.todoLocal)[index].fullName;
  deleteTodo(index);
  hideSubmitEditButton();
}

function hideSubmitAddButton() {
  submit_Button.style.display = "inline";
  input_Todo.style.display = "inline";
  search_Todo.style.display = "block"
  edit_Button.style.display = "none";
  edit_Todo.style.display = "none";
}

function hideSubmitEditButton(index) {
  submit_Button.style.display = "none";
  input_Todo.style.display = "none";
  search_Todo.style.display = "none"
  edit_Button.style.display = "inline";
  edit_Todo.style.display = "inline";
}

function addUpdateTodo(index) {
  event.preventDefault();
  const editInput = document.getElementById("editTodo");
  console.log(editInput.value);

  if (editInput.value !== "") {
    var edit = editInput.value;
    var objectEdit = JSON.parse(`{"fullName":"${edit}"}`);

    editInput.value = "";
    arrayTodo.unshift(objectEdit);
    localStorage.todoLocal = JSON.stringify(arrayTodo);

    hideSubmitAddButton();
    showTodo();
  } else {
    alert("Please input your task!!!");
  }
}

edit_Button.addEventListener("click", addUpdateTodo);
edit_Todo.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    addUpdateTodo();
  }
});