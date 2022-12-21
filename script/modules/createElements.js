export const createHeader = () => {
  const header = document.createElement('h3');
  header.textContent = 'Todo App';
  return header;
};

export const createTaskForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');
  
  form.insertAdjacentHTML('afterbegin', `
    <label class="form-group me-3 mb-0">
      <input type="text" class="form-control" name="task" placeholder="ввести задачу">
    </label>

    <button type="submit" class="btn btn-primary me-3" disabled>
      Сохранить
    </button>

    <button type="reset" class="btn btn-warning">
      Очистить
    </button>
  `);

  form.addButton = form.querySelector('.btn-primary');

  return form;
};

export const createTable = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');

  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');
  
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
    </tr>
  `;

  tableWrapper.thead = thead;

  const tbody = document.createElement('tbody');
  tableWrapper.tbody = tbody;

  table.append(thead, tbody);
  tableWrapper.append(table);

  return tableWrapper;
};

export const createTaskRow = ({ id, task, status }, n) => {
  const tr = document.createElement('tr');

  const tdNum = document.createElement('td');
  tdNum.textContent = n;

  const tdTask = document.createElement('td');
  tdTask.classList.add('task');
  tdTask.textContent = task;
  tdTask.id = id;

  const tdStatus = document.createElement('td');

  if (status === 'processed') {
    tr.classList.add('table-light');
    tdStatus.textContent = 'В процессе';
  } else {
    tr.classList.add('table-success');
    tdStatus.textContent = 'Выполнена';
    tdTask.classList.add('text-decoration-line-through');
  }

  const tdButtonGroup = document.createElement('td');
  
  const buttonDelete = document.createElement('button');
  buttonDelete.classList.add('btn', 'btn-danger', 'me-1');
  buttonDelete.textContent = 'Удалить';

  const buttonEdit = document.createElement('button');
  buttonEdit.classList.add('btn', 'btn-primary', 'me-1');
  buttonEdit.textContent = 'Изменить';

  const buttonFinish = document.createElement('button');
  buttonFinish.classList.add('btn', 'btn-success');
  buttonFinish.textContent = 'Завершить';

  tdButtonGroup.append(buttonDelete, buttonEdit, buttonFinish);

  tr.append(tdNum, tdTask, tdStatus, tdButtonGroup);

  return tr;
};