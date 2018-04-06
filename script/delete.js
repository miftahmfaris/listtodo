function deleteTodo(index) {
  arrayTodo.splice(index, 1);
  localStorage.todoLocal = JSON.stringify(arrayTodo);
  showTodo();
}