// src/api.js
const API_URL = import.meta.env.VITE_API_URL;
const API_ROOT = API_URL.replace("/tasks", "");

// Helper to get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ====================== AUTH ======================
export const loginUser = async (data) => {
  const res = await fetch(`${API_ROOT}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const registerUser = async (data) => {
  const res = await fetch(`${API_ROOT}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// ====================== TASKS ======================
export const fetchTasks = async (status = "") => {
  const res = await fetch(`${API_URL}?status=${status}`, {
    headers: { ...getAuthHeaders() },
  });
  return res.json();
};

export const addTask = async (task) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });
};

export const markTaskDone = async (id) => {
  const res = await fetch(`${API_URL}/${id}/done`, {
    method: "PATCH",
    headers: { ...getAuthHeaders() },
  });
  return res.json();
};

// ====================== NOTIFICATIONS ======================
export const fetchNotifications = async () => {
  const res = await fetch(`${API_ROOT}/notifications`, {
    headers: { ...getAuthHeaders() },
  });
  return res.json();
};
