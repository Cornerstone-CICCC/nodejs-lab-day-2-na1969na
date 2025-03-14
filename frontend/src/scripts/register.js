import { registerUser } from "../utils/api.js";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userData = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
    };

    const res = await registerUser(userData);
    if (res.message === "User created successfully") {
      window.location.href = "/login";
    } else {
      alert(res.message);
    }
  });
});
