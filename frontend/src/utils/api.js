const API_URL = 'http://localhost:3000';

export const loginUser = async (username, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};

export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const fetchUserData = async () => {
  const res = await fetch(`${API_URL}/check-auth`, {
    method: 'GET',
    credentials: 'include',
  });
  return res.json();
};

export const logoutUser = async () => {
  await fetch(`${API_URL}/logout`, {
    method: 'GET',
    credentials: 'include',
  });
};
