import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Clock,
  Copy,
  FileText,
  LogOut,
  Mail,
  PenLine,
  Send,
  Sparkles,
} from "lucide-react";
import API, { getApiError } from "../api";

const CONTENT_TYPES = [
  {
    id: "blog",
    label: "Blog",
    description: "Structured long-form copy with a clear angle.",
    placeholder: "Write a 900-word blog post about using AI to speed up a small business content calendar.",
    icon: FileText,
  },
  {
    id: "email",
    label: "Email",
    description: "Concise campaigns, launches, and follow-ups.",
    placeholder: "Write a friendly launch email for a new AI writing dashboard aimed at founders.",
    icon: Mail,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    description: "Professional posts with a crisp hook and CTA.",
    placeholder: "Write a LinkedIn post about building a Django and React SaaS project.",
    icon: PenLine,
  },
];

function Dashboard() {
  const [contentType, setContentType] = useState("blog");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [error, setError] = useState("");
  const [historyError, setHistoryError] = useState("");
  const [copied, setCopied] = useState(false);

  const activeType = useMemo(
    () => CONTENT_TYPES.find((type) => type.id === contentType) || CONTENT_TYPES[0],
    [contentType]
  );

  const loadHistory = useCallback(async () => {
    try {
      const res = await API.get("/ai/history/");
      setHistoryError("");
      setHistory(res.data);
    } catch (err) {
      setHistoryError(getApiError(err, "Could not load recent generations."));
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadHistory);
  }, [loadHistory]);

  const generateContent = async () => {
    const cleanedPrompt = prompt.trim();

    if (!cleanedPrompt) {
      setError("Add a prompt before generating content.");
      return;
    }

    setLoading(true);
    setResult("");
    setError("");
    setCopied(false);

    try {
      const res = await API.post("/ai/generate/", {
        content_type: contentType,
        prompt: cleanedPrompt,
      });

      setResult(res.data.data.result);
      await loadHistory();
    } catch (err) {
      setError(getApiError(err, "Could not generate content right now."));
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    if (!result) {
      return;
    }

    if (!navigator.clipboard) {
      setError("Clipboard access is not available in this browser.");
      return;
    }

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setError("Could not copy the generated content.");
    }
  };

  const reuseGeneration = (item) => {
    setContentType(item.content_type);
    setPrompt(item.prompt);
    setResult(item.result);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar glass">
        <div>
          <p className="eyebrow">Workspace</p>
          <h2 className="gradient-text">AI Writer Pro</h2>
          <p className="sidebar-copy">
            Generate, review, and reuse business-ready drafts from one clean dashboard.
          </p>
        </div>

        <button className="btn btn-ghost" onClick={logout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <section className="dashboard-header">
          <div>
            <p className="eyebrow">Content Studio</p>
            <h1>Generate Premium Content</h1>
            <p>
              Pick a format, describe the goal, and keep your best generations close.
            </p>
          </div>
          <div className="stat-card">
            <Sparkles size={18} />
            <span>{history.length}</span>
            <small>saved drafts</small>
          </div>
        </section>

        <div className="dashboard-grid">
          <section className="generator-panel glass" aria-label="Content generator">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Format</p>
                <h2>What are we writing?</h2>
              </div>
            </div>

            <div className="type-grid" role="group" aria-label="Content type">
              {CONTENT_TYPES.map((type) => {
                const Icon = type.icon;
                const isActive = type.id === contentType;

                return (
                  <button
                    key={type.id}
                    type="button"
                    className={`type-card ${isActive ? "is-active" : ""}`}
                    onClick={() => setContentType(type.id)}
                    aria-pressed={isActive}
                  >
                    <Icon size={20} />
                    <strong>{type.label}</strong>
                    <span>{type.description}</span>
                  </button>
                );
              })}
            </div>

            <label className="field-label" htmlFor="prompt">
              Prompt
            </label>
            <textarea
              id="prompt"
              className="input prompt-input"
              maxLength={1200}
              placeholder={activeType.placeholder}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                setError("");
              }}
            />

            <div className="field-meta">
              <span>{prompt.length}/1200 characters</span>
              <span>{activeType.label} mode</span>
            </div>

            {error && (
              <p className="status-message status-error" role="alert">
                <AlertCircle size={16} /> {error}
              </p>
            )}

            <div className="generator-actions">
              <button
                className="btn"
                onClick={generateContent}
                disabled={loading || !prompt.trim()}
              >
                <Send size={18} />
                {loading ? "Generating..." : "Generate Content"}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setPrompt("");
                  setResult("");
                  setError("");
                }}
                disabled={loading || (!prompt && !result)}
              >
                Reset
              </button>
            </div>

            {result && (
              <motion.section
                className="output-panel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="output-header">
                  <div>
                    <p className="eyebrow">Generated Output</p>
                    <h2>Ready to refine</h2>
                  </div>
                  <button className="icon-button" type="button" onClick={copyResult}>
                    <Copy size={18} />
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="generated-copy">{result}</div>
              </motion.section>
            )}
          </section>

          <aside className="history-panel" aria-label="Recent history">
            <div className="section-heading">
              <div>
                <p className="eyebrow">History</p>
                <h2>Recent Drafts</h2>
              </div>
              <button className="text-button" type="button" onClick={loadHistory}>
                Refresh
              </button>
            </div>

            {historyLoading && <p className="empty-state">Loading recent drafts...</p>}

            {historyError && (
              <p className="status-message status-error" role="alert">
                <AlertCircle size={16} /> {historyError}
              </p>
            )}

            {!historyLoading && !historyError && history.length === 0 && (
              <p className="empty-state">
                Your generated drafts will appear here after the first run.
              </p>
            )}

            <div className="history-list">
              {history.map((item) => (
                <motion.article
                  key={item.id}
                  className="history-card glass"
                  whileHover={{ y: -2 }}
                >
                  <div className="history-card-header">
                    <strong>{item.content_type}</strong>
                    <span>
                      <Clock size={14} />
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p>{item.prompt}</p>
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => reuseGeneration(item)}
                  >
                    Reuse draft
                  </button>
                </motion.article>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
