import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Bot, CheckCircle2, Mail, PenLine, Sparkles } from "lucide-react";

const features = [
  "Draft blogs, emails, and LinkedIn posts",
  "Keep recent generations in your workspace",
  "Copy polished output when it is ready",
];

function Landing() {
  return (
    <div className="landing-page">
      <nav className="site-nav">
        <Link to="/" className="brand gradient-text">
          AI Writer Pro
        </Link>

        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register" className="btn btn-small">
            Start Free
          </Link>
        </div>
      </nav>

      <main className="landing-hero">
        <motion.section
          className="hero-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="badge">
            <Sparkles size={18} /> AI content studio for business teams
          </div>

          <h1>Create better business content in fewer drafts.</h1>

          <p>
            Turn rough ideas into polished blogs, launch emails, and LinkedIn posts with a
            focused writing dashboard built for speed and reuse.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="btn">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          </div>

          <div className="feature-list" aria-label="Product highlights">
            {features.map((feature) => (
              <span key={feature}>
                <CheckCircle2 size={17} /> {feature}
              </span>
            ))}
          </div>
        </motion.section>

        <motion.aside
          className="product-preview glass"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          aria-label="AI Writer Pro dashboard preview"
        >
          <div className="preview-topbar">
            <div>
              <span />
              <span />
              <span />
            </div>
            <strong>Generation Sandbox</strong>
          </div>

          <div className="preview-prompt">
            <div>
              <PenLine size={18} />
              <span>Prompt</span>
            </div>
            <p>Write a LinkedIn post about launching an AI content platform for founders.</p>
          </div>

          <div className="preview-output">
            <div className="preview-line wide" />
            <div className="preview-line" />
            <div className="preview-line short" />
            <p>
              Building consistently is easier when your ideas can move from rough notes to
              polished posts in minutes.
            </p>
          </div>

          <div className="preview-footer">
            <span>
              <Bot size={16} /> AI draft ready
            </span>
            <span>
              <Mail size={16} /> Saved to history
            </span>
          </div>
        </motion.aside>
      </main>
    </div>
  );
}

export default Landing;
