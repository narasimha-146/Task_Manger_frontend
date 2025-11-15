import { useState } from "react";
import { markTaskDone, deleteTask, updateTask } from "../api";
import "./TaskTable.css";

export default function TaskTable({ tasks, refresh, allowEdit = true }) {
  const [editTask, setEditTask] = useState(null);

  const handleSave = async () => {
    const updatedData = {
      ...editTask,
      tags: Array.isArray(editTask.tags)
        ? editTask.tags
        : editTask.tags.split(",").map((t) => t.trim()),
    };

    await updateTask(editTask._id, updatedData);
    setEditTask(null);
    refresh();
  };

  return (
    <>
      <div className="table-wrapper">
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>
                  {task.dueDate ? new Date(task.dueDate).toLocaleString() : "-"}
                </td>

                <td className="action-buttons">
                  {/* EDIT BUTTON */}
                  {allowEdit && task.status !== "Completed" && (
                    <button
                      className="action-btn btn-edit"
                      onClick={() =>
                        setEditTask({
                          ...task,
                          tags: task.tags || [],
                          dueDate: task.dueDate || "",
                        })
                      }
                    >
                      Edit
                    </button>
                  )}

                  {/* MARK DONE */}
                  {task.status !== "Completed" && (
                    <button
                      className="action-btn btn-complete"
                      onClick={() => markTaskDone(task._id).then(refresh)}
                    >
                      Done
                    </button>
                  )}

                  {/* DELETE */}
                  <button
                    className="action-btn btn-delete"
                    onClick={() => deleteTask(task._id).then(refresh)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editTask && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Task</h3>

            <label>Title</label>
            <input
              type="text"
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
            />

            <label>Description</label>
            <textarea
              value={editTask.description}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
            />

            <label>Priority</label>
            <select
              value={editTask.priority}
              onChange={(e) =>
                setEditTask({ ...editTask, priority: e.target.value })
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <label>Due Date</label>
            <input
              type="datetime-local"
              value={
                editTask.dueDate
                  ? new Date(editTask.dueDate).toISOString().slice(0, 16)
                  : ""
              }
              onChange={(e) =>
                setEditTask({ ...editTask, dueDate: e.target.value })
              }
            />

            <label>Tags (comma separated)</label>
            <input
              type="text"
              value={Array.isArray(editTask.tags) ? editTask.tags.join(", ") : ""}
              onChange={(e) =>
                setEditTask({
                  ...editTask,
                  tags: e.target.value.split(",").map((t) => t.trim()),
                })
              }
            />

            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setEditTask(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
