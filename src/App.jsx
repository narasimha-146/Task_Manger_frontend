// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Completed from "./pages/Completed";
import Notifications from "./pages/Notifications";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
