import { loginUser } from "../utils/api.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await loginUser(username, password);
    if (res.message === "Login successful") {
      window.location.href = "/profile";
    } else {
      alert(res.message);
    }
  });
});
