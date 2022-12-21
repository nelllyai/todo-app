import {renderContainer, renderModal,
  renderToDoList} from './modules/render.js';
import {modalControl} from './modules/control.js';

const init = () => {
  const app = document.querySelector('.app-container');
  renderContainer(app);

  const {
    list,
    taskForm,
  } = renderToDoList(app);

  const modal = renderModal(app);

  modalControl(modal, list, taskForm);
};

init();
