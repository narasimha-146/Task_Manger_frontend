// src/api.js
const API_URL = import.meta.env.VITE_API_URL;
const API_ROOT = API_URL.replace("/tasks", "");

export const fetchTasks = async (status = "") => {
  const res = await fetch(`${API_URL}?status=${status}`);
  return res.json();
};

export const addTask = async (task) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

export const markTaskDone = async (id) => {
  const res = await fetch(`${API_URL}/${id}/done`, {
    method: "PATCH",
  });
  return res.json();
};

export const fetchNotifications = async () => {
  const res = await fetch(`${API_ROOT}/notifications`);
  return res.json();
};
