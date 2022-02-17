import './style.css';

const getDataFromLocalStorage = () => {
  const todoList = localStorage.getItem('todoList');
  return JSON.parse(todoList);
};

const updateView = () => {
  const todoList = getDataFromLocalStorage();
  const todo = document.getElementById('todo-list');
  todo.innerHTML = '';
  if (todoList) {
    todoList.forEach((todoListItem, index) => {
      todo.innerHTML += `
        <li><hr></li>
        <li class="todo">
            <div>
                <input type="checkbox" name="checkbox" value="${index}" ${todoListItem.completed ? 'checked' : ''}>
              <h2>${todoListItem.description}</h2>
            </div>
            <button><i class="fa fa-ellipsis-v" aria-hidden="true"></i></button>
        </li>
      `;
    });
  }
};

const clearLocalStorage = () => {
  localStorage.clear();
  updateView();
};

const clearInput = () => {
  document.getElementById('todoListInput').value = '';
};

const storeInLocalStorage = (data) => {
  const item = {
    completed: false,
    description: data,
  };
  const previousTodoList = getDataFromLocalStorage();
  let todoList = [];
  if (previousTodoList !== null) {
    todoList = [...getDataFromLocalStorage(), item];
  } else {
    todoList.push(item);
  }
  localStorage.setItem('todoList', JSON.stringify(todoList));
  clearInput();
  updateView();
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    storeInLocalStorage(formData.get('new-todo'));
  });

  document
    .getElementById('clear-completed-button')
    .addEventListener('click', clearLocalStorage, true);
});

document.addEventListener('load', updateView());
