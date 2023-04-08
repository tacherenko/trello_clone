// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"modules/clock.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clock = clock;
exports.time = time;
function time() {
  var date = new Date();
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return "".concat(hours, ":").concat(minutes);
}
function clock() {
  var clock = document.querySelector(".header-clock");
  setInterval(function () {
    clock.innerHTML = time();
  }, 1000);
}
},{}],"modules/modalTask.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearModalTask = clearModalTask;
exports.createModalTask = createModalTask;
exports.modalTaskTitle = exports.modalTaskSelect = exports.modalTaskDescription = exports.modalTaskContainer = exports.modalTaskBtnConfirm = exports.modalSelectUserName = void 0;
// import { body } from "./modalWarning.js";
// import { selectUsers } from "./selectUsers.js";
var modalTaskSelect = document.createElement("select");
exports.modalTaskSelect = modalTaskSelect;
var modalTaskBtnConfirm = document.createElement("button");
exports.modalTaskBtnConfirm = modalTaskBtnConfirm;
var modalTaskContainer = document.createElement("div");
exports.modalTaskContainer = modalTaskContainer;
var modalTaskTitle = document.createElement("input");
exports.modalTaskTitle = modalTaskTitle;
var modalTaskDescription = document.createElement("textarea");
exports.modalTaskDescription = modalTaskDescription;
var modalSelectUserName = document.createElement("option");
exports.modalSelectUserName = modalSelectUserName;
function createModalTask(name) {
  modalSelectUserName.innerText = name;
  modalSelectUserName.setAttribute("selected", "selected");
  modalTaskSelect.prepend(modalSelectUserName);

  //   body.style.overflow = "hidden";

  modalTaskContainer.classList.add("modalTaskContainer");
  var modalTaskDialog = document.createElement("div");
  modalTaskDialog.classList.add("modalTaskDialog");
  var modalTask = document.createElement("div");
  modalTask.classList.add("modalTask");
  var boards = document.querySelector(".card-todo");
  modalTaskTitle.classList.add("modalTaskTitle");
  modalTaskTitle.placeholder = "Title";
  modalTaskDescription.classList.add("modalTaskDescription");
  modalTaskDescription.placeholder = "Description";
  var modalTaskbtns = document.createElement("div");
  modalTaskbtns.classList.add("modalbtns");
  modalTaskSelect.classList.add("modalSelect");
  modalTaskSelect.addEventListener("click", function () {
    if (modalTaskSelect.length === 1) {
      modalSelectUserName.remove();
      selectUsers();
    }
  });
  var modalTaskBtnCancel = document.createElement("button");
  modalTaskBtnCancel.classList.add("modalTaskCancel");
  modalTaskBtnCancel.innerText = "Cancel";
  modalTaskBtnCancel.addEventListener("click", function () {
    clearModalTask();
  });
  modalTaskBtnConfirm.classList.add("modalTaskConfirm");
  modalTaskBtnConfirm.innerText = "Confirm";
  boards.append(modalTaskContainer);
  modalTaskContainer.append(modalTaskDialog);
  modalTaskDialog.append(modalTask);
  modalTask.append(modalTaskTitle);
  modalTask.append(modalTaskDescription);
  modalTask.append(modalTaskbtns);
  modalTaskbtns.append(modalTaskSelect, modalTaskBtnCancel, modalTaskBtnConfirm);
}
function clearModalTask() {
  body.style.overflow = "";
  modalTaskTitle.value = "";
  modalTaskDescription.value = "";
  modalSelectUserName.remove();
  modalTaskSelect.value = "";
  modalTaskContainer.innerHTML = "";
  modalTaskContainer.remove();
}
},{}],"modules/counter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chengeCounters = chengeCounters;
exports.todoCount = exports.progressCount = exports.doneCount = void 0;
var todoCount = document.querySelector(".board-todo-count");
exports.todoCount = todoCount;
todoCount.innerHTML = "(0)";
var progressCount = document.querySelector(".board-progress-count");
exports.progressCount = progressCount;
progressCount.innerHTML = "(0)";
var doneCount = document.querySelector(".board-done-count");
exports.doneCount = doneCount;
doneCount.innerHTML = "(0)";
function chengeCounters(keyLocal, elementHtml) {
  var count = 0;
  if (localStorage.getItem(keyLocal)) {
    count = JSON.parse(localStorage.getItem(keyLocal)).length;
    elementHtml.innerHTML = count;
  } else {
    elementHtml.innerHTML = count;
  }
  return count;
}
},{}],"modules/localStorage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocalStorage = getLocalStorage;
exports.updateLocalStorage = updateLocalStorage;
function updateLocalStorage(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
},{}],"modules/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = app;
var _clock = require("./clock.js");
var _modalTask = require("./modalTask.js");
var _counter = require("./counter.js");
var _localStorage = require("./localStorage.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function app() {
  (0, _clock.clock)();
  // time();
  var todo = [];
  var inProgress = [];
  var done = [];
  var inProgressCard = {};
  var todoCard = {};
  var doneCard = {};
  var ID;
  var flag = 0;
  var todoCards = document.querySelector(".card-todo");
  var progressCards = document.querySelector(".board-progress-cards");
  var doneCards = document.querySelector(".board-done-cards");
  if ((0, _localStorage.getLocalStorage)("todoBoard")) {
    todo = (0, _localStorage.getLocalStorage)("todoBoard");
    todo.forEach(function (item) {
      createCardTodo(item);
    });
    (0, _counter.chengeCounters)("todoBoard", _counter.todoCount);
  }
  if ((0, _localStorage.getLocalStorage)("inProgressBoard")) {
    inProgress = (0, _localStorage.getLocalStorage)("inProgressBoard");
    inProgress.forEach(function (item) {
      createCardProgress(item);
    });
    (0, _counter.chengeCounters)("inProgressBoard", _counter.progressCount);
  }
  if ((0, _localStorage.getLocalStorage)("doneBoard")) {
    done = (0, _localStorage.getLocalStorage)("doneBoard");
    done.forEach(function (item) {
      createCardDone(item);
    });
    (0, _counter.chengeCounters)("doneBoard", _counter.doneCount);
  }
  var boardsTodoAdd = document.querySelector(".board-todo-add");
  boardsTodoAdd.addEventListener("click", function () {
    flag = 1;
    (0, _modalTask.createModalTask)("Select User Name");
    // if (modalTaskSelect.length == 1) {
    //   selectUsers();
    // }
  });

  var delAll = document.querySelector(".board-done-delall");
  delAll.addEventListener("click", function () {
    if (doneCards.innerHTML) {
      openModalWarning(delAllWarning, done, doneCards);
    }
  });
  _modalTask.modalTaskBtnConfirm.addEventListener("click", function () {
    var cardTitle = _modalTask.modalTaskTitle.value;
    var cardDescription = _modalTask.modalTaskDescription.value;
    var cardUserName = _modalTask.modalTaskSelect.value;
    if (flag === 1) {
      todoCard.id = generateId();
      cardTitle ? todoCard.title = cardTitle : todoCard.title = "Title";
      cardDescription ? todoCard.description = cardDescription : todoCard.description = "Description";
      todoCard.name = cardUserName;
      todoCard.time = (0, _clock.time)();
      todo.push(todoCard);
      createCardTodo(todoCard);
      todoCard = {};
    } else if (flag === 2) {
      todo.forEach(function (item) {
        if (item.id === ID) {
          item.title = cardTitle;
          item.description = cardDescription;
          item.name = cardUserName;
        }
      });
      var editCard = document.getElementById("".concat(ID));
      var titleEdit = editCard.children[1];
      var descEdit = editCard.children[2].firstChild;
      var userEdit = editCard.children[3].firstChild;
      cardTitle ? titleEdit.innerText = cardTitle : titleEdit.innerText = "Title";
      cardDescription ? descEdit.innerText = cardDescription : descEdit.innerText = "Description";
      userEdit.innerText = _modalTask.modalTaskSelect.value;
    }
    flag = 0;
    (0, _localStorage.updateLocalStorage)("todoBoard", todo);
    (0, _counter.chengeCounters)("todoBoard", _counter.todoCount);
    (0, _modalTask.clearModalTask)();
  });
  function createCardTodo(obj) {
    var card = document.createElement("div");
    card.classList.add("card");
    card.id = obj.id;
    todoCards.append(card);
    var btnsHeadWrap = document.createElement("div");
    btnsHeadWrap.classList.add("btnsHeadWrap");
    card.append(btnsHeadWrap);
    var btnEdit = document.createElement("button");
    btnEdit.classList.add("btnEdit");
    btnEdit.innerText = "Edit";
    btnEdit.addEventListener("click", function () {
      var editItem = todo.filter(function (item) {
        return item.id == card.id;
      });
      _modalTask.modalTaskTitle.value = editItem[0].title;
      _modalTask.modalTaskDescription.value = editItem[0].description;
      ID = editItem[0].id;
      var editName = editItem[0].name;
      _modalTask.modalTaskSelect.value = editItem[0].name;
      flag = 2;
      (0, _modalTask.createModalTask)(editName);
    });
    var btnDelete = document.createElement("button");
    btnDelete.classList.add("btnDelete");
    btnDelete.innerText = "Delete";
    btnDelete.addEventListener("click", function () {
      openModalWarning(dellCard, obj, card);
    });
    btnsHeadWrap.append(btnEdit, btnDelete);
    var titleCard = document.createElement("h4");
    titleCard.classList.add("titleCard");
    titleCard.innerText = obj.title;
    card.append(titleCard);
    var descrWrap = document.createElement("div");
    descrWrap.classList.add("descrWrap");
    card.append(descrWrap);
    var description = document.createElement("div");
    description.classList.add("description");
    description.innerText = obj.description;
    var btnSend = document.createElement("button");
    btnSend.classList.add("btnSend");
    btnSend.innerText = ">";
    btnSend.addEventListener("click", function () {
      if (_counter.progressCount.innerHTML > 5) {
        card.style.backgroundColor = "#c0616163";
        openModalWarning(cardSend, obj, card);
      } else {
        cardSend(obj, card);
      }
    });
    descrWrap.append(description, btnSend);
    var userWrap = document.createElement("div");
    userWrap.classList.add("userWrap");
    card.append(userWrap);
    var userName = document.createElement("div");
    userName.innerText = obj.name;
    var cardTime = document.createElement("div");
    cardTime.innerText = obj.time;
    userWrap.append(userName, cardTime);
  }
  function createCardProgress(obj) {
    var card = document.createElement("div");
    card.classList.add("card");
    card.id = obj.id;
    progressCards.append(card);
    var btnsHeadWrap = document.createElement("div");
    btnsHeadWrap.classList.add("btnsHeadWrap");
    card.append(btnsHeadWrap);
    var btnBack = document.createElement("button");
    btnBack.classList.add("btnBack");
    btnBack.innerText = "Back";
    btnBack.addEventListener("click", function () {
      inProgress.forEach(function (item) {
        if (item.id === obj.id) {
          todoCard = _objectSpread({}, item);
        }
      });
      todo.push(todoCard);
      createCardTodo(todoCard);
      (0, _localStorage.updateLocalStorage)("todoBoard", todo);
      todoCard = {};
      inProgress = inProgress.filter(function (item) {
        return item.id !== obj.id;
      });
      (0, _localStorage.updateLocalStorage)("inProgressBoard", inProgress);
      card.remove();
      (0, _counter.chengeCounters)("todoBoard", _counter.todoCount);
      (0, _counter.chengeCounters)("inProgressBoard", _counter.progressCount);
    });
    var btnComplete = document.createElement("button");
    btnComplete.classList.add("btnComplete");
    btnComplete.innerText = "Complete";
    btnComplete.addEventListener("click", function () {
      inProgress.forEach(function (item) {
        if (item.id === obj.id) {
          doneCard = _objectSpread({}, item);
        }
      });
      done.push(doneCard);
      createCardDone(doneCard);
      (0, _localStorage.updateLocalStorage)("doneBoard", done);
      doneCard = {};
      inProgress = inProgress.filter(function (item) {
        return item.id !== obj.id;
      });
      (0, _localStorage.updateLocalStorage)("inProgressBoard", inProgress);
      card.remove();
      (0, _counter.chengeCounters)("inProgressBoard", _counter.progressCount);
      (0, _counter.chengeCounters)("doneBoard", _counter.doneCount);
    });
    btnsHeadWrap.append(btnBack, btnComplete);
    var titleCard = document.createElement("h4");
    titleCard.classList.add("titleCard");
    titleCard.innerText = obj.title;
    card.append(titleCard);
    var descrWrap = document.createElement("div");
    descrWrap.classList.add("descrWrap");
    card.append(descrWrap);
    var description = document.createElement("div");
    description.classList.add("description");
    description.innerText = obj.description;
    descrWrap.append(description);
    var userWrap = document.createElement("div");
    userWrap.classList.add("userWrap");
    card.append(userWrap);
    var userName = document.createElement("div");
    userName.innerText = obj.name;
    var cardTime = document.createElement("div");
    cardTime.innerText = obj.time;
    userWrap.append(userName, cardTime);
  }
  function createCardDone(obj) {
    var card = document.createElement("div");
    card.classList.add("card");
    card.id = obj.id;
    doneCards.append(card);
    var btnsHeadWrap = document.createElement("div");
    btnsHeadWrap.classList.add("btnsHeadWrap");
    card.append(btnsHeadWrap);
    var btnDelete = document.createElement("button");
    btnDelete.classList.add("btnDelete");
    btnDelete.innerText = "Delete";
    btnDelete.addEventListener("click", function () {
      openModalWarning(dellCardDone, obj, card);
    });
    btnsHeadWrap.append(btnDelete);
    var titleCard = document.createElement("h4");
    titleCard.classList.add("titleCard");
    titleCard.innerText = obj.title;
    card.append(titleCard);
    var descrWrap = document.createElement("div");
    descrWrap.classList.add("descrWrap");
    card.append(descrWrap);
    var description = document.createElement("div");
    description.classList.add("description");
    description.innerText = obj.description;
    descrWrap.append(description);
    var userWrap = document.createElement("div");
    userWrap.classList.add("userWrap");
    card.append(userWrap);
    var userName = document.createElement("div");
    userName.innerText = obj.name;
    var cardTime = document.createElement("div");
    cardTime.innerText = obj.time;
    userWrap.append(userName, cardTime);
  }
  function delAllWarning(done, doneCards) {
    done.length = 0;
    (0, _localStorage.updateLocalStorage)("doneBoard", done);
    doneCards.innerHTML = "";
    (0, _counter.chengeCounters)("doneBoard", _counter.doneCount);
  }
  function cardSend(obj, card) {
    todo.forEach(function (item) {
      if (item.id === obj.id) {
        inProgressCard = _objectSpread({}, item);
      }
    });
    inProgress.push(inProgressCard);
    createCardProgress(inProgressCard);
    (0, _localStorage.updateLocalStorage)("inProgressBoard", inProgress);
    inProgressCard = {};
    todo = todo.filter(function (item) {
      return item.id !== obj.id;
    });
    (0, _localStorage.updateLocalStorage)("todoBoard", todo);
    card.remove();
    (0, _counter.chengeCounters)("todoBoard", _counter.todoCount);
    (0, _counter.chengeCounters)("inProgressBoard", _counter.progressCount);
  }
  function dellCard(obj, card) {
    todo = todo.filter(function (item) {
      return item.id !== obj.id;
    });
    (0, _localStorage.updateLocalStorage)("todoBoard", todo);
    card.remove();
    (0, _counter.chengeCounters)("todoBoard", _counter.todoCount);
  }
  function dellCardDone(obj, card) {
    done = done.filter(function (item) {
      return item.id !== obj.id;
    });
    (0, _localStorage.updateLocalStorage)("doneBoard", done);
    card.remove();
    (0, _counter.chengeCounters)("doneBoard", _counter.doneCount);
  }
}
},{"./clock.js":"modules/clock.js","./modalTask.js":"modules/modalTask.js","./counter.js":"modules/counter.js","./localStorage.js":"modules/localStorage.js"}],"script.js":[function(require,module,exports) {
"use strict";

var _app = require("./modules/app.js");
window.addEventListener("DOMContentLoaded", function () {
  (0, _app.app)();
});
},{"./modules/app.js":"modules/app.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58716" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map