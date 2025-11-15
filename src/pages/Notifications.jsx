import { useEffect, useState } from "react";
import { fetchNotifications, deleteTask } from "../api";
import Navbar from "../components/Navbar";
import "./Notifications.css";

export default function Notifications() {
  const [tasks, setTasks] = useState([]);

  const loadNotifications = async () => {
    const data = await fetchNotifications();
    // Sort by createdAt descending (newest first)
    const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setTasks(sorted);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(id);
      loadNotifications(); // refresh list
    }
  };

  const now = new Date();

  return (
    <>
      <Navbar />
      <div className="notifications-container">
        <h2>Notifications</h2>
        {tasks.length === 0 && <p>No notifications right now!</p>}
        <ul>
          {tasks.map((task) => {
            const due = new Date(task.dueDate);
            const isOverdue = due < now;

            let priorityClass = "";
            if (task.priority === "Low") priorityClass = "priority-low";
            else if (task.priority === "Medium") priorityClass = "priority-medium";
            else if (task.priority === "High") priorityClass = "priority-high";

            return (
              <li
                key={task._id}
                className={`${isOverdue ? "task-overdue" : "task-upcoming"} ${priorityClass}`}
              >
                <div className="task-content">
                  <strong>{task.title}</strong> - {task.description}
                  <br />
                  <small>
                    Due: {due.toLocaleString()} | Priority: {task.priority}
                  </small>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(task._id)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
