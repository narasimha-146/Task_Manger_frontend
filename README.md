# 🎨 Task Manager Frontend (React)

A **modern and responsive frontend** for the Task Manager application built using **React (Vite)**.  
This application connects to a separate backend REST API to handle authentication and task management.

---

## 🚀 Features

- User authentication (Login & Register)
- JWT-based protected routes
- Task listing with sorting & filtering
- Create, update, delete, and complete tasks
- Notifications for upcoming & overdue tasks
- Clean UI with responsive design
- API integration using Fetch
- Environment-based configuration

---

## 🛠️ Tech Stack

- **React.js**
- **Vite**
- **JavaScript (ES6+)**
- **React Router DOM**
- **CSS (Custom styling)**
- **Fetch API**

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── illustration.png       # Static images
│
├── src/
│   ├── api.js                 # Centralized API calls
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── TaskTable.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx
│   │   ├── Tasks.jsx
│   │   ├── Completed.jsx
│   │   └── Notification.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env                       # Environment variables
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the frontend project:

```env
VITE_API_URL=http://localhost:5000/api/tasks
```

Update this URL after deploying the backend.

---

## ▶️ Getting Started

### 1️⃣ Clone the repository
```bash
git clone <frontend-repo-url>
cd <frontend-project>
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Start the development server
```bash
npm run dev
```

The app will run at:
```
http://localhost:5173
```

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend returns a JWT token
3. Token is stored in `localStorage`
4. Protected routes require authentication
5. Token is sent in the `Authorization` header

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🧪 Pages Overview

| Page | Description |
|----|------------|
| /login | User login |
| /register | User registration |
| / | Protected tasks dashboard |

---

## 🎨 UI Highlights

- Split layout authentication pages with illustrations
- Responsive task table
- Sorting options (date, title, priority, status)
- Loading & empty states
- Clean, minimal styling

---

## 🔒 Security Notes

- JWT stored in localStorage
- Protected routes using React Router
- CORS handled at backend

---

## 🧑‍💻 Author

**Narasimha**  
Frontend Developer  
GitHub: https://github.com/narasimha-146

---

## 📌 Note

This repository contains **only frontend code**.  
Backend APIs are maintained in a separate repository.
