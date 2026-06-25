import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import API, { getApiError } from "../api";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login/", form);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      navigate("/dashboard");
    } catch (err) {
      setError(getApiError(err, "Could not sign in with those details."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-card glass" onSubmit={handleSubmit}>
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1 className="gradient-text">Login</h1>
          <p className="auth-copy">Sign in to continue generating polished business content.</p>
        </div>

        {successMessage && <p className="status-message status-success">{successMessage}</p>}

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
          placeholder="Your username"
          value={form.username}
          autoComplete="username"
          required
          onChange={(e) => updateField("username", e.target.value)}
        />

        <label className="field-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="input"
          type="password"
          placeholder="Your password"
          value={form.password}
          autoComplete="current-password"
          required
          onChange={(e) => updateField("password", e.target.value)}
        />

        <button className="btn" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="auth-switch">
          New user? <Link to="/register">Create account</Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
