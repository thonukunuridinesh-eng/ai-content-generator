import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../api";
import { LogOut, Sparkles } from "lucide-react";

function Dashboard() {
  const [contentType, setContentType] = useState("blog");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    const res = await API.get("/ai/history/");
    setHistory(res.data);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const generateContent = async () => {
    setLoading(true);
    setResult("");

    const res = await API.post("/ai/generate/", {
      content_type: contentType,
      prompt,
    });

    setResult(res.data.data.result);
    setLoading(false);
    loadHistory();
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={styles.page}>
      <aside className="glass" style={styles.sidebar}>
        <h2 className="gradient-text">AI Writer Pro</h2>

        <button className="btn" onClick={logout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main style={styles.main}>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass"
          style={styles.generator}
        >
          <h1>
            <Sparkles color="#38bdf8" /> Generate Premium Content
          </h1>

          <select
            className="input"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="blog">AI Blog Generator</option>
            <option value="email">AI Email Writer</option>
            <option value="linkedin">AI LinkedIn Post Generator</option>
          </select>

          <textarea
            className="input"
            rows="6"
            placeholder="Example: Write a LinkedIn post about my Django React SaaS project..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>

          <button className="btn" onClick={generateContent}>
            {loading ? "Generating..." : "Generate Content"}
          </button>

          {result && (
            <motion.div
              style={styles.result}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2>Generated Output</h2>
              <p>{result}</p>
            </motion.div>
          )}
        </motion.div>

        <div style={styles.history}>
          <h2>Recent History</h2>

          {history.map((item) => (
            <motion.div
              key={item.id}
              className="glass"
              style={styles.historyCard}
              whileHover={{ scale: 1.02 }}
            >
              <strong>{item.content_type.toUpperCase()}</strong>
              <p>{item.prompt}</p>
              <small>{new Date(item.created_at).toLocaleString()}</small>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    minHeight: "100vh",
  },
  sidebar: {
    padding: 28,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  main: {
    padding: 36,
  },
  generator: {
    padding: 32,
    borderRadius: 28,
    display: "grid",
    gap: 18,
  },
  result: {
    background: "#0f172a",
    padding: 24,
    borderRadius: 18,
    whiteSpace: "pre-line",
  },
  history: {
    marginTop: 32,
    display: "grid",
    gap: 16,
  },
  historyCard: {
    padding: 20,
    borderRadius: 20,
  },
};

export default Dashboard;