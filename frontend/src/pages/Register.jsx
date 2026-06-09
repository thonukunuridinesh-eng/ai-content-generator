import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register/", form);
    alert("Account created successfully");
    navigate("/login");
  };

  return (
    <div style={styles.page}>
      <form className="glass" style={styles.card} onSubmit={handleSubmit}>
        <h1 className="gradient-text">Create Account</h1>

        <input
          className="input"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn">Register</button>

        <p>
          Already have account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
  },
  card: {
    width: 420,
    padding: 36,
    borderRadius: 28,
    display: "grid",
    gap: 18,
  },
};

export default Register;