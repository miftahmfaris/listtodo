const API_URL = `http://localhost:3001`;

let storage = [];

// let arrayTodo = checkTodo();
let input_Todo = document.getElementById("inputTodo");
let submit_Button = document.getElementById("submitButton");
let edit_Todo = document.getElementById("editTodo");
let edit_Button = document.getElementById("editButton");
let search_Todo = document.getElementById("searchTodo");
let list_Todo = document.getElementById("listTodo");

const getStorage = () => {
  return storage;
};

const setStorage = data => {
  storage = data;
};

const requestGET = (id = "") => {
  return fetch(`${API_URL}/todo/${id}`)
    .then(res => res.json())
    .then(res => res.data);
};

const requestPOST = (payload = {}) => {
  return fetch(`${API_URL}/todo`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => res);
};

const requestDELETE = (id = "") => {
  return fetch(`${API_URL}/todo/${id}`, {
    method: "DELETE"
  }).then(res => res);
};

const requestPUT = (id = "", payload = {}) => {
  return fetch(`${API_URL}/todo/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => res);
};

const template = (index = "", todo = {}) => {
  return `
  <p id="textListTodo${todo.id}">${todo.text}</p>
  <img id="deleteListTodo-${
    todo.id
  }" class="deleteTodo float-right icon-small" src="./assets/check.png" alt="Edit">
  <img id="editListTodo-${
    todo.id
  }" class="updateTodo float-right icon-small" src="./assets/edit.png" alt="V">
  `;
};

const showTodo = (response = requestGET()) => {
  listTodo.innerHTML = "";

  response.then(todos => {
    setStorage(todos);

    todos.map((todo, index) => {
      const element = document.createElement("div");
      element.innerHTML = template(index, todo);
      listTodo.append(element);
    });
  });
};

const showStorage = (todos = getStorage()) => {
  listTodo.innerHTML = "";

  todos.map((todo, index) => {
    const element = document.createElement("div");
    element.innerHTML = template(index, todo);
    listTodo.append(element);
  });
};

const addTodo = async event => {
  event.preventDefault();

  const todos = getStorage();
  const text = document.getElementById("inputTodo").value;
  inputTodo.value = "";

  if (text) {
    await requestPOST({
      text
    });
    showTodo();
  } else {
    alert("Input cannot be empty");
  }
};

async function deleteTodo(event) {
  if (event.target.matches(".deleteTodo")) {
    const id = event.target.id.replace("deleteListTodo-", "");

    await requestDELETE(id);

    showTodo();
  }
}

function searchingTodo(event) {
  const value = event.target.value.toLowerCase();
  const todos = getStorage();
  const filtered = todos.filter(todo =>
    todo.text.toLowerCase().includes(value)
  );
  showStorage(filtered);
}

async function addUpdateTodo(event) {
  // console.log(index);
  event.preventDefault();
  if (event.target.matches(".updateTodo")) {
    const todos = getStorage();
    // console.log(todos[index].id);
    const id = event.target.id.replace("editListTodo-", "");

    console.log(id);
    // const editInput = document.getElementById("editTodo");
    // console.log(id);
    const edit = prompt(`Update Your Task:`);
    // console.log(edit);
    todos.forEach(todo => {
      if (todo.id == id) {
        todo.text = edit;
      }
    });
    await requestPUT(id, {
      text: edit
    });
    console.log(todos);
    showTodo();
  }
}

list_Todo.addEventListener("click", addUpdateTodo);
search_Todo.addEventListener("keyup", searchingTodo);
list_Todo.addEventListener("click", deleteTodo);
submit_Button.addEventListener("click", addTodo);
edit_Button.addEventListener("click", addUpdateTodo);
edit_Todo.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    addUpdateTodo();
  }
});
// input_Todo.addEventListener("submit", storeTodoToLocal);
// input_Todo.addEventListener("keyup", function(event) {
//   event.preventDefault();
//   if (event.keyCode === 13) {
//     submit_Button.click();
//   }
// });

showTodo();