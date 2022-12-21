import { createHeader, createTaskForm, createTable, createTaskRow } from "./createElements.js";
import { getStorage } from "./todoStorage.js";

export const renderToDoList = app => {
  app.classList.add('vh-100', 'w-100', 'd-flex',
    'align-items-center', 'justify-content-center',
    'flex-column');

  const taskForm = createTaskForm();
  const table = createTable();

  app.append(createHeader());
  app.append(taskForm);
  app.append(table);

  return {
    taskForm,
    list: table.tbody,
  };
};

export const renderTasks = (user, list) => {
  let counter = 0;
  const allRows = getStorage(user).map(item => createTaskRow(item, ++counter));
  list.append(...allRows);
  return allRows;
};
