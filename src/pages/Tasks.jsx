import { useEffect, useState } from "react";
import { fetchTasks } from "../api";
import Navbar from "../components/Navbar";
import TaskTable from "../components/TaskTable";
import "./Tasks.css";

export default function Tasks() {
  const [rawTasks, setRawTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState("date-desc");
  const [loading, setLoading] = useState(true);

  // Fetch tasks once
  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks("Pending");
      setRawTasks(data);
      setTasks(sortTasks(data));
    } finally {
      setLoading(false);
    }
  };

  // Sorting logic
  const sortTasks = (list) => {
    const sorted = [...list];

    switch (sortBy) {
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "title-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;

      case "priority": {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        sorted.sort(
          (a, b) =>
            (priorityOrder[a.priority] || 99) -
            (priorityOrder[b.priority] || 99)
        );
        break;
      }

      case "status": {
        const statusOrder = { Pending: 1, Overdue: 2, Completed: 3 };
        sorted.sort(
          (a, b) =>
            (statusOrder[a.status] || 99) -
            (statusOrder[b.status] || 99)
        );
        break;
      }

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
  }, []);

  useEffect(() => {
    setTasks(sortTasks(rawTasks));
  }, [sortBy, rawTasks]);

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="tasks-header">
          <h2>Pending Tasks</h2>

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

        {loading && <p className="loading-text">Loading tasks...</p>}

        {!loading && tasks.length === 0 && (
          <p className="empty-state">🎉 No pending tasks</p>
        )}

        {!loading && tasks.length > 0 && (
          <TaskTable tasks={tasks} refresh={load} />
        )}
      </div>
    </>
  );
}
