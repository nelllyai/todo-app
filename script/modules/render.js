import { createHeader, createTaskForm, createTable, createTaskRow, createModal } from "./createElements.js";
import { getStorage } from "./todoStorage.js";

export const renderContainer = app => {
  app.classList.add('vh-100', 'w-100', 'd-flex',
    'align-items-center', 'justify-content-center',
    'flex-column');
};

export const renderModal = app => {
  const modal = createModal();
  app.append(modal);
  return modal;
};

export const renderToDoList = app => {
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
