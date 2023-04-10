export const container = document.querySelector(".container");
export const body = document.querySelector("body");

export function openModalWarning(foo, a, b) {
  body.style.overflow = "hidden";

  const modalWarningContainer = document.createElement("div");
  modalWarningContainer.classList.add("modalTaskContainer");

  const modalWarningDialog = document.createElement("div");
  modalWarningDialog.classList.add("modalTaskDialog");

  const modalWarning = document.createElement("div");
  modalWarning.classList.add("modalWarning");
  modalWarning.innerHTML = "Warning! <br>You need to do at least some tasks";

  const btnAllWarning = document.createElement("div");
  btnAllWarning.classList.add("btnAllWarning");

  const btnWarningCancel = document.createElement("button");
  btnWarningCancel.classList.add("btnWarningCancel");
  btnWarningCancel.innerText = "Cancel";

  const btnWarningConfirm = document.createElement("button");
  btnWarningConfirm.classList.add("btnWarningConfirm");
  btnWarningConfirm.id = "btnWarningConfirm";
  btnWarningConfirm.disabled = "false";
  btnWarningConfirm.innerText = "Confirm";

  container.append(modalWarningContainer);
  modalWarningContainer.append(modalWarningDialog);
  modalWarningDialog.append(modalWarning);
  modalWarning.append(btnAllWarning);
  btnAllWarning.append(btnWarningCancel, btnWarningConfirm);

  btnWarningCancel.addEventListener("click", () => {
    if (b.style.backgroundColor) {
      b.style.backgroundColor = "";
    }
    body.style.overflow = "";
    modalWarningContainer.remove();
  });
  btnWarningConfirm.addEventListener("click", () => {
    foo(a, b);
    body.style.overflow = "";
    modalWarningContainer.remove();
  });
}
