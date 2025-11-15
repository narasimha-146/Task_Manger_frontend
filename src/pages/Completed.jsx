// src/pages/Completed.jsx
import { useEffect, useState } from "react";
import { fetchTasks } from "../api";
import Navbar from "../components/Navbar";
import TaskTable from "../components/TaskTable";

export default function Completed() {
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    const data = await fetchTasks("Completed");
    setTasks(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h2>Completed Tasks</h2>
        <TaskTable tasks={tasks} refresh={load} allowEdit={false} />
      </div>
    </>
  );
}
