// src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation(); // highlight active links
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const isActive = (path) => (location.pathname === path ? "active" : "");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // optional
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo">TaskManager</div>

        <ul className="nav-links">
          <li>
            <Link className={isActive("/")} to="/">
              Home
            </Link>
          </li>

          {token ? (
            <>
              <li>
                <Link className={isActive("/tasks")} to="/tasks">
                  Tasks
                </Link>
              </li>
              <li>
                <Link className={isActive("/completed")} to="/completed">
                  Completed
                </Link>
              </li>
              <li>
                <Link className={isActive("/notifications")} to="/notifications">
                  🔔
                </Link>
              </li>
              <li>
                <button className="btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className={isActive("/login")} to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className={isActive("/register")} to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
