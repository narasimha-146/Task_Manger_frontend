import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import "./LoginRegister.css";


export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* Left */}
        <div className="auth-left">
          <img src="/illustration.png" alt="Login Illustration" />
        </div>

        {/* Right */}
        <div className="auth-right">
          <h2 className="auth-title">Create Account</h2>

          {error && <p className="auth-error">{error}</p>}

          <form onSubmit={handleSignup}>
            <input
              className="auth-input"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <input
              className="auth-input"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />

            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "CREATING ACCOUNT..." : "SIGN UP"}
            </button>
          </form>

          <div className="auth-link">
            <Link to="/login">Already have an account? Login →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
