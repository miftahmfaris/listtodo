let submit_button = document.getElementById("submitButton");
let input_Todo = document.getElementById("inputTodo");

const API_URL = "http://localhost:3000";

function template(datas, index) {
  return `
  <p id="textListTodo${index}">${datas.todo}</p>
  <img id="deleteListTodo${index}" class="updateTodo float-right icon-small" onclick=deleteData(${index}) src="./assets/check.png" alt="V">
  <img id="editListTodo${index}" class="float-right icon-small" onclick=updateData(${index}) src="./assets/edit.png" alt="Edit">
  `;
}

const getAll = () => {
  return axios
    .get(`${API_URL}/todo`)
    .then(rawResponse => {
      listTodo.innerHTML = "";

      let datas = rawResponse.data;
      datas.data.map((datas, index) => {
        var element = document.createElement("div");
        element.innerHTML = template(datas, index);
        listTodo.append(element);
        input_Todo.value = "";
      });
    })
    .catch(error => {
      console.log(error);
    });
};

const getOne = () => {
  return axios
    .get(`${API_URL}/todo/1`)
    .then(rawResponse => {
      console.log("Get One Data");
      console.log(rawResponse.data);
    })
    .catch(error => {
      console.log(error);
    });
};

const addNew = () => {
  event.preventDefault();
  return axios
    .post(`${API_URL}/todo`, {
      todo: input_Todo.value,
      done: true
    })
    .then(rawResponse => {
      getAll();
    })
    .catch(error => {
      console.log(error);
    });
};

const deleteData = index => {
  return axios
    .delete(`${API_URL}/todo/0`)
    .then(rawResponse => {
      console.log("Delete data");
      console.log(rawResponse.data);
      getAll();
    })
    .catch(error => {
      console.log(error);
    });
};

const updateData = index => {
  return axios
    .put(`${API_URL}/todo/0`, {
      todo: input_Todo.value,
      done: false
    })
    .then(rawResponse => {
      console.log(rawResponse.data);
      getAll();
    })
    .catch(error => {
      console.log(error);
    });
};

const searchData = () => {
  return axios
    .get(`${API_URL}/todo/search?todo=d`)
    .then(rawResponse => {
      console.log("Data Found");
      console.log(rawResponse.data);
    })
    .catch(error => {
      console.log(error);
    });
};

submit_button.addEventListener("click", addNew);

getAll();