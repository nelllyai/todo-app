import { createTaskRow } from "./createElements.js";
import { addStorage, editStorage, getStorage, removeStorage } from "./todoStorage.js";
import { renderToDoList, renderTasks } from "./render.js";

const addTaskToList = (task, list, num) => {
  list.append(createTaskRow(task, num));
};

const addTaskToStorage = (taskText, user) => {
  addStorage(user, taskText);
};

const removeTaskFromStorage = (taskId, user) => {
  removeStorage(user, taskId);
};

const editTaskStatusOnPage = rowTask => {
  rowTask.classList.replace(rowTask.className, 'table-success');
  rowTask.querySelector('.task').classList.add('text-decoration-line-through');
  rowTask.querySelectorAll('td')[2].textContent = 'Выполнена';
};

const editTaskStatus = (taskId, user) => {
  editStorage(user, taskId, 'status', 'finished');
};

const rebuildNumbers = list => {
  const rows = list.querySelectorAll('tbody > tr');
  let counter = 0;
  rows.forEach(row => {
    row.querySelectorAll('td')[0].textContent = ++counter;
  });
};

export const modalControl = (modal, list, taskForm) => {
  modal.addEventListener('submit', event => {
    event.preventDefault();

    const {username} = Object.fromEntries(new FormData(event.target));

    modal.remove();

    renderTasks(username, list);
    taskFormControl(taskForm, list, username);
    listControl(list, username);
  });
};

export const taskFormControl = (form, list, user) => {
  form.addEventListener('input', event => {
    const target = event.target;

    if (target.value.trim() !== '') {
      form.addButton.disabled = false;
    } else {
      form.addButton.disabled = true;
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const newTask = {
      id: Math.random().toString().substring(2, 10),
      task: formData.get('task'),
      importance: formData.get('importance'),
      status: 'processed'
    };

    const len = getStorage(user).length;

    addTaskToList(newTask, list, len + 1);
    addTaskToStorage(newTask, user);

    form.reset();
    form.addButton.disabled = true;
  });

  form.addEventListener('reset', () => {
    form.addButton.disabled = true;
  });
};

export const listControl = (list, username) => {
  list.addEventListener('click', event => {
    const target = event.target;
    const currentTr = target.closest('tr');
    const currentTask = currentTr.querySelector('.task');
    const currentId = currentTask.id;

    if (target.closest('.btn-danger')) {
      if (confirm('Вы действительно хотите удалить задачу?')) {
        removeTaskFromStorage(currentId, username);
        currentTr.remove();
        rebuildNumbers(list, username);
      }
    } else if (target.closest('.btn-success')) {
      editTaskStatus(currentId, username);
      editTaskStatusOnPage(currentTr);
    } else if (target.closest('.btn-primary') && !currentTask.classList.contains('text-decoration-line-through')) {
      currentTask.contentEditable = true;
      currentTask.addEventListener('blur', () => currentTask.contentEditable = false);
    }
  });
};
