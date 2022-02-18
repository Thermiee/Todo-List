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
                <input type="checkbox" name="checkbox" id="checkbox_${index}" ${todoListItem.completed ? 'checked' : ''}>
              <h2>${todoListItem.description}</h2>
            </div>
            <button><i class="fa fa-trash" aria-hidden="true"></i></button>
        </li>
      `;
    });
  }
};

const storeItem = (items) => {
  if (items.length > 0) {
    localStorage.setItem('todoList', JSON.stringify(items));
  } else {
    localStorage.clear();
  }
};

const clearLocalStorage = () => {
  const todoListArr = getDataFromLocalStorage();
  let counter = todoListArr.length;
  while (counter > 0) {
    if (todoListArr[counter - 1].completed) {
      todoListArr.splice(counter - 1, 1);
    }
    counter -= 1;
  }
  storeItem(todoListArr);
  updateView();
};

const clearInput = () => {
  document.getElementById('todoListInput').value = '';
};

const toggleCheckbox = (id) => {
  const todoListArr = getDataFromLocalStorage();
  const checkboxElement = document.getElementById(id).checked;
  const arrIndex = todoListArr.findIndex((item) => `checkbox_${item.id}` === id);
  todoListArr[arrIndex].completed = checkboxElement;
  storeItem(todoListArr);
};

const addItem = (data) => {
  const item = {
    completed: false,
    description: data,
    id: 0,
  };
  const previousTodoList = getDataFromLocalStorage();
  let todoList = [];
  if (previousTodoList !== null) {
    item.id = previousTodoList.length;
    todoList = [...getDataFromLocalStorage(), item];
  } else {
    todoList.push(item);
  }
  storeItem(todoList);
  clearInput();
  updateView();
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addItem(formData.get('new-todo'));
  });

  document
    .getElementById('todo-list')
    .addEventListener('click', (e) => {
      if (e.target.type === 'checkbox') {
        toggleCheckbox(e.target.id);
      }
    });

  document
    .getElementById('clear-completed-button')
    .addEventListener('click', clearLocalStorage, true);
});

document.addEventListener('load', updateView());
