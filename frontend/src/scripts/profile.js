import { fetchUserData, logoutUser } from "../utils/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const profileDiv = document.getElementById("profile");
  const logoutButton = document.getElementById("logoutButton");

  // Fetch user data
  const userData = await fetchUserData();
  if (userData.username) {
    profileDiv.innerHTML = `
      <p>Username: ${userData.username}</p>
      <p>First Name: ${userData.firstname}</p>
      <p>Last Name: ${userData.lastname}</p>
    `;
  } else {
    window.location.href = "/login";
  }

  // Logout
  logoutButton.addEventListener("click", async () => {
    await logoutUser();
    window.location.href = "/login";
  });
});
