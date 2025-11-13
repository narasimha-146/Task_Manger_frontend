import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const apiurl = import.meta.env.VITE_API_URL;

  // Fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(apiurl);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Add or Edit Task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTaskId) {
        const response = await fetch(`${apiurl}/${editingTaskId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description }),
        });
        const updated = await response.json();
        setTasks(tasks.map((t) => (t._id === editingTaskId ? updated : t)));
        setEditingTaskId(null);
      } else {
        const response = await fetch(apiurl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description, completed: false }),
        });
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
      }

      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await fetch(`${apiurl}/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Edit task
  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description);
  };

  // Toggle complete/incomplete
  const handleToggleComplete = async (task) => {
    try {
      const response = await fetch(`${apiurl}/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, completed: !task.completed }),
      });
      const updatedTask = await response.json();
      setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating completion:", error);
    }
  };

  // Filter + Search logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "completed"
        ? task.completed
        : !task.completed;
    return matchesSearch && matchesFilter;
  });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
  };

  return (
    <div className="app-container">
      <h1 className="title">📝 Task Manager</h1>

      {/* Search & Filter */}
      <div className="controls">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Main Layout */}
      <div className="main-content">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="task-form">
          <h2>{editingTaskId ? "Edit Task" : "Add New Task"}</h2>

          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <div className="form-actions">
            <button type="submit" className="btn primary">
              {editingTaskId ? "Update Task" : "Add Task"}
            </button>
            {editingTaskId && (
              <button
                type="button"
                className="btn secondary"
                onClick={() => {
                  setEditingTaskId(null);
                  setTitle("");
                  setDescription("");
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Task List Section */}
        <div className="task-list">
          <h2>Tasks</h2>
          {filteredTasks.length === 0 ? (
            <p className="empty">No tasks found!</p>
          ) : (
            filteredTasks.map((task) => (
              <div key={task._id} className="task-card">
                <div className="task-info">
                  <h3 className={task.completed ? "completed" : ""}>
                    {task.title}
                  </h3>
                  <p>{task.description}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {task.completed ? "✅ Completed" : "⏳ Pending"}
                  </p>
                  <p>
                    <small>🗓 Created on: {formatDate(task.createdAt)}</small>
                  </p>
                </div>
                <div className="task-actions">
                  <button
                    onClick={() => handleToggleComplete(task)}
                    className="btn complete"
                  >
                    {task.completed ? "Mark Pending" : "Mark Done"}
                  </button>
                  <button onClick={() => handleEdit(task)} className="btn edit">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
