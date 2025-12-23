// src/api.js

const API_URL = import.meta.env.VITE_API_URL; // http://localhost:5000/api/tasks
const API_ROOT = API_URL.replace("/tasks", "");

// ====================== HELPERS ======================

// Get JWT token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Handle API responses safely
const handleResponse = async (res) => {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// ====================== AUTH ======================

export const loginUser = async (data) => {
  const res = await fetch(`${API_ROOT}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

export const registerUser = async (data) => {
  const res = await fetch(`${API_ROOT}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

// ====================== TASKS ======================

export const fetchTasks = async (status = "") => {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";

  const res = await fetch(`${API_URL}${query}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });

  return handleResponse(res);
};

export const addTask = async (task) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(task),
  });

  return handleResponse(res);
};

export const updateTask = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  return handleResponse(res);
};

export const markTaskDone = async (id) => {
  const res = await fetch(`${API_URL}/${id}/done`, {
    method: "PATCH",
    headers: {
      ...getAuthHeaders(),
    },
  });

  return handleResponse(res);
};

// ====================== NOTIFICATIONS ======================

export const fetchNotifications = async () => {
  const res = await fetch(`${API_ROOT}/notifications`, {
    headers: {
      ...getAuthHeaders(),
    },
  });

  return handleResponse(res);
};
