// src/pages/Home.jsx
import { useState } from "react";
import { addTask } from "../api";
import Navbar from "../components/Navbar";
import "./Home.css";

export default function Home() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    tags: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert dueDate to a Date object if it's set
    const dueDateObj = task.dueDate ? new Date(task.dueDate) : null;

    await addTask({
      ...task,
      dueDate: dueDateObj,
      tags: task.tags.split(",").map((t) => t.trim()),
    });

    alert("Task successfully added!");
    setTask({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
      tags: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="form-container">
          <h2>Add New Task</h2>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <label style={{ color: "black", fontWeight: "500", marginBottom: "5px" }}>
              Title
            </label>
            <input
              type="text"
              placeholder="Enter task title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              required
            />

            {/* Description */}
            <label style={{ color: "black", fontWeight: "500", marginBottom: "5px" }}>
              Description
            </label>
            <textarea
              placeholder="Enter task description"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
            />

            {/* Priority */}
            <label style={{ color: "black", fontWeight: "500", marginBottom: "5px" }}>
              Priority
            </label>
            <select
              value={task.priority}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
              style={{ color: "black" }}
            >
              <option style={{ color: "black" }}>Low</option>
              <option style={{ color: "black" }}>Medium</option>
              <option style={{ color: "black" }}>High</option>
            </select>

            {/* Due Date */}
            <label style={{ color: "black", fontWeight: "500", marginBottom: "5px" }}>
              Due Date
            </label>
            <input
              type="datetime-local"
              className="black-placeholder"
              placeholder="Select due date & time"
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            />

            {/* Tags */}
            <label style={{ color: "black", fontWeight: "500", marginBottom: "5px" }}>
              Tags
            </label>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={task.tags}
              onChange={(e) => setTask({ ...task, tags: e.target.value })}
            />

            <button type="submit">Add Task</button>
          </form>
        </div>
      </div>
    </>
  );
}
