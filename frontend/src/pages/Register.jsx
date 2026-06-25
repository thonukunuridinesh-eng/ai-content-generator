import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import API, { getApiError } from "../api";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/auth/register/", form);
      const loginResponse = await API.post("/auth/login/", {
        username: form.username,
        password: form.password,
      });

      localStorage.setItem("access", loginResponse.data.access);
      localStorage.setItem("refresh", loginResponse.data.refresh);

      navigate("/dashboard");
    } catch (err) {
      setError(getApiError(err, "Could not create your account."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-card glass" onSubmit={handleSubmit}>
        <div>
          <p className="eyebrow">Start free</p>
          <h1 className="gradient-text">Create Account</h1>
          <p className="auth-copy">Set up your writing workspace in a few seconds.</p>
        </div>

        {error && (
          <p className="status-message status-error" role="alert">
            <AlertCircle size={16} /> {error}
          </p>
        )}

        <label className="field-label" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          className="input"
          placeholder="Choose a username"
          value={form.username}
          autoComplete="username"
          required
          onChange={(e) => updateField("username", e.target.value)}
        />

        <label className="field-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="input"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          autoComplete="email"
          required
          onChange={(e) => updateField("email", e.target.value)}
        />

        <label className="field-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="input"
          type="password"
          placeholder="Create a secure password"
          value={form.password}
          autoComplete="new-password"
          required
          onChange={(e) => updateField("password", e.target.value)}
        />

        <button className="btn" disabled={loading}>
          {loading ? "Creating account..." : "Register and Continue"}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}

export default Register;
