// src/components/Navbar.jsx 
import { Link, useLocation } from "react-router-dom"; 
import "./Navbar.css"; 
export default function Navbar() { 
    const location = useLocation(); // Helper to highlight active links 
    const isActive = (path) => (location.pathname === path ? "active" : ""); 
    return ( 
        <nav className="navbar"> 
            <div className="nav-content"> 
                <div className="logo">TaskManager</div> 
                <ul className="nav-links"> 
                    <li> 
                        <Link className={isActive("/")} to="/">Home</Link> 
                    </li> 
                    <li> 
                        <Link className={isActive("/tasks")} to="/tasks">Tasks</Link> 
                    </li> 
                    <li> 
                        <Link className={isActive("/completed")} to="/completed">Completed</Link> 
                    </li> 
                    <li> 
                        <Link className={isActive("/notifications")} to="/notifications">🔔</Link> 
                    </li> 
                </ul> 
            </div> 
        </nav> 
    );
}