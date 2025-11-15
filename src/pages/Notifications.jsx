// src/pages/Notifications.jsx
import { useEffect, useState } from "react";
import { fetchNotifications } from "../api";
import Navbar from "../components/Navbar";
export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications().then(setNotifications);
  }, []);

  return (
    <>
        <Navbar />
        <div className="page-container">
        <h2>Notifications</h2>

        {notifications.length === 0 ? (
            <p>No notifications</p>
        ) : (
            notifications.map((n, i) => (
            <div key={i} className="notification">
                <strong>{n.title}</strong>
                <p>{n.message}</p>
            </div>
            ))
        )}
        </div>
    </>
  );
}
