import { modalTaskSelect } from "./modalTask.js";

export async function selectUsers() {
  const USERS_URL = "https://jsonplaceholder.typicode.com/users";
  const response = await fetch(USERS_URL);
  const users = await response.json();
  users.forEach(({ id, name, userName, email, address }) => {
    const modalTaskSelectUser = document.createElement("option");
    modalTaskSelectUser.innerHTML = name;
    modalTaskSelect.append(modalTaskSelectUser);
  });
}
