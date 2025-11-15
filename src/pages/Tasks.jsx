// src/pages/Tasks.jsx
import { useEffect, useState } from "react";
import { fetchTasks } from "../api";
import Navbar from "../components/Navbar";
import TaskTable from "../components/TaskTable";
import "./Tasks.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState("date-desc"); // default sorting

  const load = async () => {
    const data = await fetchTasks("Pending");
    const sorted = sortTasks(data);
    setTasks(sorted);
  };

  // Sort function
  const sortTasks = (list) => {
    const sorted = [...list];

    switch (sortBy) {
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "title-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;

      case "priority":
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;

      case "status":
        const statusOrder = { Pending: 1, Overdue: 2, Completed: 3 };
        sorted.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        break;

      case "date-asc":
        sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        break;

      case "date-desc":
      default:
        sorted.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        break;
    }

    return sorted;
  };

  useEffect(() => {
    load();
  }, [sortBy]); // reload + re-sort when sorting changes

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="tasks-header">
          <h2>Pending Tasks</h2>

          {/* Sorting Dropdown */}
          <select
            className="sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date-desc">Due Date: Newest First</option>
            <option value="date-asc">Due Date: Oldest First</option>
            <option value="title-asc">Title: A → Z</option>
            <option value="title-desc">Title: Z → A</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </div>

        <TaskTable tasks={tasks} refresh={load} />
      </div>
    </>
  );
}
