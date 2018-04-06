function searchingTodo() {
  var arraySearch = [];
  // const value = event.target.value;
  // const todos = checkTodo();
  // const searched = todos.filter(todo =>
  //   todo.fullName.includes(value)
  // );
  // console.log(searched);
  for (var i = 0; i < arrayTodo.length; i++) {
    if (arrayTodo[i].fullName.includes(search_Todo.value)) {
      arraySearch.push(arrayTodo[i]);
    }
  }
  console.log(arraySearch);
  displaySearch(arraySearch);
  // return arraySearch;
}

function displaySearch(arraySearch) {
  // console.log(arraySearch);
  listTodo.innerHTML = "";

  arraySearch.forEach((arraySearch, index) => {
    const element = document.createElement("div");

    element.innerHTML = template(arraySearch, index);
    listTodo.append(element);
  });
}

search_Todo.addEventListener("keyup", searchingTodo);