import { renderTasks, renderToDoList } from "./modules/render.js";
import { listControl, taskFormControl } from "./modules/control.js";

const username = prompt('Введите имя пользователя:');

const init = username => {
  const app = document.querySelector('.app-container');
  const {
    list,
    taskForm,
  } = renderToDoList(app);
  renderTasks(username, list);
  taskFormControl(taskForm, list, username);
  listControl(list, username);
};

init(username);
