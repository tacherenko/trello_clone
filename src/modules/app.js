import { time, clock } from "./clock.js";
import {
  modalTaskBtnConfirm,
  createModalTask,
  modalTaskSelect,
} from "./modalTask.js";
import {
  modalTaskTitle,
  modalTaskDescription,
  clearModalTask,
} from "./modalTask.js";
import {
  chengeCounters,
  todoCount,
  progressCount,
  doneCount,
} from "./counter.js";
import { updateLocalStorage, getLocalStorage } from "./localStorage.js";
import { generateId } from "./generateId.js";
import { openModalWarning } from "./modalWarning.js";
import { selectUsers } from "./selectUsers.js";
import { openModalWarningDelete } from "./modalDelete.js";

export function app() {
  clock();

  let todo = [];
  let inProgress = [];
  let done = [];
  let inProgressCard = {};
  let todoCard = {};
  let doneCard = {};

  let ID;
  let flag = 0;

  const todoCards = document.querySelector(".card-todo");
  const progressCards = document.querySelector(".board-progress-cards");
  const doneCards = document.querySelector(".board-done-cards");

  if (getLocalStorage("todoBoard")) {
    todo = getLocalStorage("todoBoard");
    todo.forEach((item) => {
      createCardTodo(item);
    });
    chengeCounters("todoBoard", todoCount);
  }
  if (getLocalStorage("inProgressBoard")) {
    inProgress = getLocalStorage("inProgressBoard");
    inProgress.forEach((item) => {
      createCardProgress(item);
    });
    chengeCounters("inProgressBoard", progressCount);
  }
  if (getLocalStorage("doneBoard")) {
    done = getLocalStorage("doneBoard");
    done.forEach((item) => {
      createCardDone(item);
    });
    chengeCounters("doneBoard", doneCount);
  }

  const boardsTodoAdd = document.querySelector(".board-todo-add");
  boardsTodoAdd.addEventListener("click", () => {
    flag = 1;
    createModalTask("Select User Name");
    if (modalTaskSelect.length == 1) {
      selectUsers();
    }
  });

  const delAll = document.querySelector(".board-done-delall");
  delAll.addEventListener("click", () => {
    if (doneCards.innerHTML) {
      openModalWarningDelete(delAllWarning, done, doneCards);
    }
  });

  modalTaskBtnConfirm.addEventListener("click", () => {
    let cardTitle = modalTaskTitle.value;
    let cardDescription = modalTaskDescription.value;
    let cardUserName = modalTaskSelect.value;
    if (flag === 1) {
      todoCard.id = generateId();
      cardTitle ? (todoCard.title = cardTitle) : (todoCard.title = "Title");
      cardDescription
        ? (todoCard.description = cardDescription)
        : (todoCard.description = "Description");
      todoCard.name = cardUserName;
      todoCard.time = time();
      todo.push(todoCard);
      createCardTodo(todoCard);
      todoCard = {};
    } else if (flag === 2) {
      todo.forEach((item) => {
        if (item.id === ID) {
          item.title = cardTitle;
          item.description = cardDescription;
          item.name = cardUserName;
        }
      });
      let editCard = document.getElementById(`${ID}`);
      let titleEdit = editCard.children[0];
      let descEdit = editCard.children[1].firstChild;
      let userEdit = editCard.children[2].firstChild;

      cardTitle
        ? (titleEdit.innerText = cardTitle)
        : (titleEdit.innerText = "Title");
      cardDescription
        ? (descEdit.innerText = cardDescription)
        : (descEdit.innerText = "Description");
      userEdit.innerText = modalTaskSelect.value;
    }
    flag = 0;
    updateLocalStorage("todoBoard", todo);
    chengeCounters("todoBoard", todoCount);
    clearModalTask();
  });

  function createCardTodo(obj) {
    const article = document.createElement("div");
    article.classList.add("article");
    article.id = obj.id;
    todoCards.append(article);

    const titleCard = document.createElement("h4");
    titleCard.classList.add("titleCard");
    titleCard.innerText = obj.title;
    article.append(titleCard);

    const descrWrap = document.createElement("div");
    descrWrap.classList.add("descrWrap");
    article.append(descrWrap);

    const description = document.createElement("div");
    description.classList.add("description");
    description.innerText = obj.description;

    const btnSend = document.createElement("button");
    btnSend.classList.add("btnSend");
    btnSend.addEventListener("click", () => {
      if (progressCount.innerHTML > ` (${5})`) {
        openModalWarning(cardSend, obj, article);
        document.getElementById("btnWarningConfirm").disabled = true;
      } else {
        cardSend(obj, article);
      }
    });
    descrWrap.append(description, btnSend);

    const userWrap = document.createElement("div");
    userWrap.classList.add("userWrap");
    article.append(userWrap);

    const userName = document.createElement("div");
    userName.innerText = obj.name;
    userWrap.append(userName);

    const btnsFooterWrap = document.createElement("div");
    btnsFooterWrap.classList.add("btnsFooterWrap");
    article.append(btnsFooterWrap);

    const btnsCard = document.createElement("div");
    btnsCard.classList.add("btnsCard");
    btnsFooterWrap.append(btnsCard);

    const btnEdit = document.createElement("button");
    btnEdit.classList.add("btnEdit");
    btnEdit.addEventListener("click", () => {
      flag = 2;
      let editItem = todo.filter((item) => item.id == article.id);
      modalTaskTitle.value = editItem[0].title;
      modalTaskDescription.value = editItem[0].description;
      ID = editItem[0].id;
      let editName = editItem[0].name;
      modalTaskSelect.value = editItem[0].name;
      createModalTask(editName);
    });
    btnsCard.append(btnEdit);

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btnDelete");
    btnDelete.addEventListener("click", () => {
      todo = todo.filter((item) => item.id !== obj.id);
      updateLocalStorage("todoBoard", todo);
      article.remove();
      chengeCounters("todoBoard", todoCount);
    });
    btnsCard.append(btnDelete);

    const cardTime = document.createElement("div");
    cardTime.classList.add("cardTime");
    cardTime.innerText = obj.time;

    btnsFooterWrap.append(cardTime, btnsCard);
  }

  function createCardProgress(obj) {
    const article = document.createElement("div");
    article.classList.add("article");
    article.id = obj.id;
    progressCards.append(article);

    const titleCard = document.createElement("h4");
    titleCard.classList.add("titleCard");
    titleCard.innerText = obj.title;
    article.append(titleCard);

    const descrWrap = document.createElement("div");
    descrWrap.classList.add("descrWrap");
    article.append(descrWrap);

    const description = document.createElement("div");
    description.classList.add("description");
    description.innerText = obj.description;
    descrWrap.append(description);

    const userWrap = document.createElement("div");
    userWrap.classList.add("userWrap");
    article.append(userWrap);

    const userName = document.createElement("div");
    userName.innerText = obj.name;
    userWrap.append(userName);

    const cardTime = document.createElement("div");
    cardTime.classList.add("cardTime");
    cardTime.innerText = obj.time;
    article.append(cardTime);

    const btnsHeadWrap = document.createElement("div");
    btnsHeadWrap.classList.add("btnsHeadWrap");
    article.append(btnsHeadWrap);

    const btnBack = document.createElement("button");
    btnBack.classList.add("btnBack");
    btnBack.addEventListener("click", () => {
      inProgress.forEach((item) => {
        if (item.id === obj.id) {
          todoCard = { ...item };
        }
      });
      todo.push(todoCard);
      createCardTodo(todoCard);
      updateLocalStorage("todoBoard", todo);
      todoCard = {};

      inProgress = inProgress.filter((item) => item.id !== obj.id);
      updateLocalStorage("inProgressBoard", inProgress);
      article.remove();
      chengeCounters("todoBoard", todoCount);
      chengeCounters("inProgressBoard", progressCount);
    });

    const btnComplete = document.createElement("button");
    btnComplete.classList.add("btnComplete");

    btnComplete.addEventListener("click", () => {
      inProgress.forEach((item) => {
        if (item.id === obj.id) {
          doneCard = { ...item };
        }
      });
      done.push(doneCard);
      createCardDone(doneCard);
      updateLocalStorage("doneBoard", done);
      doneCard = {};

      inProgress = inProgress.filter((item) => item.id !== obj.id);
      updateLocalStorage("inProgressBoard", inProgress);
      article.remove();
      chengeCounters("inProgressBoard", progressCount);
      chengeCounters("doneBoard", doneCount);
    });
    btnsHeadWrap.append(btnBack, btnComplete);
  }

  function createCardDone(obj) {
    const article = document.createElement("div");
    article.classList.add("article");
    article.id = obj.id;
    doneCards.append(article);

    const titleCard = document.createElement("h4");
    titleCard.classList.add("titleCard");
    titleCard.innerText = obj.title;
    article.append(titleCard);

    const descrWrap = document.createElement("div");
    descrWrap.classList.add("descrWrap");
    article.append(descrWrap);

    const description = document.createElement("div");
    description.classList.add("description");
    description.innerText = obj.description;
    descrWrap.append(description);

    const userWrap = document.createElement("div");
    userWrap.classList.add("userWrap");
    article.append(userWrap);

    const userName = document.createElement("div");
    userName.innerText = obj.name;
    userWrap.append(userName);

    const cardTime = document.createElement("div");
    cardTime.classList.add("cardTime");
    cardTime.innerText = obj.time;
    article.append(cardTime);

    const btnsHeadWrap = document.createElement("div");
    btnsHeadWrap.classList.add("btnsHeadWrap");
    article.append(btnsHeadWrap);

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btnDeleteDone");
    btnDelete.addEventListener("click", () => {
      done = done.filter((item) => item.id !== obj.id);
      updateLocalStorage("doneBoard", done);
      article.remove();
      chengeCounters("doneBoard", doneCount);
    });
    btnsHeadWrap.append(btnDelete);
  }

  function delAllWarning(done, doneCards) {
    done.length = 0;
    updateLocalStorage("doneBoard", done);
    doneCards.innerHTML = "";
    chengeCounters("doneBoard", doneCount);
  }

  function cardSend(obj, article) {
    todo.forEach((item) => {
      if (item.id === obj.id) {
        inProgressCard = { ...item };
      }
    });
    inProgress.push(inProgressCard);
    createCardProgress(inProgressCard);
    updateLocalStorage("inProgressBoard", inProgress);
    inProgressCard = {};

    todo = todo.filter((item) => item.id !== obj.id);
    updateLocalStorage("todoBoard", todo);
    article.remove();

    chengeCounters("todoBoard", todoCount);
    chengeCounters("inProgressBoard", progressCount);
  }
}
