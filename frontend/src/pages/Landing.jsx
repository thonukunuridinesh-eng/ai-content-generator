import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Bot, PenLine, Mail } from "lucide-react";

function Landing() {
  return (
    <div style={{ minHeight: "100vh", overflow: "hidden" }}>
      <nav style={styles.nav}>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-text"
        >
          AI Writer Pro
        </motion.h2>

        <div style={styles.navLinks}>
          <Link to="/login">Login</Link>
          <Link to="/register" className="btn">Start Free</Link>
        </div>
      </nav>

      <section style={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.heroText}
        >
          <div style={styles.badge}>
            <Sparkles size={18} /> AI SaaS for Businesses
          </div>

          <h1 style={styles.title}>
            Create Premium Business Content with{" "}
            <span className="gradient-text">AI Power</span>
          </h1>

          <p style={styles.subtitle}>
            Generate blogs, emails, LinkedIn posts and marketing content in seconds.
            Built with Django, React, and OpenAI API.
          </p>

          <div style={styles.heroButtons}>
            <Link to="/register" className="btn">Get Started</Link>
            <Link to="/login" style={styles.secondaryBtn}>Login</Link>
          </div>
        </motion.div>

        <motion.div
          className="glass"
          style={styles.aiCard}
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div style={styles.cardHeader}>
            <Bot size={24} color="#7c3aed" />
            <span>AI Generation Sandbox</span>
          </div>
          <div style={styles.cardRow}>
            <PenLine size={16} color="#06b6d4" />
            <span style={{ color: "#94a3b8" }}>Blog Outline Blueprint</span>
          </div>
          <div style={styles.cardRow}>
            <Mail size={16} color="#22c55e" />
            <span style={{ color: "#94a3b8" }}>Cold Sales Conversion Sequence</span>
          </div>
          <div style={styles.cardRow}>
            {/* Custom visual anchor replaces the conflicting icon module dependency */}
            <div style={styles.customIcon}>in</div> 
            <span style={{ color: "#94a3b8" }}>LinkedIn Professional Authority Post</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 80px",
    background: "rgba(5, 8, 22, 0.7)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    width: "100%"
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    fontWeight: "600",
  },
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "180px 80px 100px 80px",
    maxWidth: "1400px",
    margin: "0 auto",
    gap: "50px",
  },
  heroText: {
    maxWidth: "650px",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(124, 58, 237, 0.15)",
    color: "#a78bfa",
    padding: "8px 16px",
    borderRadius: "30px",
    fontSize: "14px",
    fontWeight: "600",
    border: "1px solid rgba(124, 58, 237, 0.3)",
    marginBottom: "24px",
  },
  title: {
    fontSize: "54px",
    lineHeight: "1.15",
    fontWeight: "800",
    letterSpacing: "-1px",
    marginBottom: "24px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#94a3b8",
    lineHeight: "1.6",
    marginBottom: "40px",
  },
  heroButtons: {
    display: "flex",
    gap: "20px",
  },
  secondaryBtn: {
    border: "1px solid #334155",
    padding: "14px 22px",
    borderRadius: "14px",
    fontWeight: "700",
    transition: "0.3s",
    background: "#0f172a",
  },
  aiCard: {
    flex: "1",
    maxWidth: "500px",
    borderRadius: "24px",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "18px",
    fontWeight: "700",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    paddingBottom: "15px",
  },
  cardRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(0, 0, 0, 0.2)",
    padding: "14px",
    borderRadius: "12px",
    fontSize: "14px",
  },
  customIcon: {
    background: "#2563eb",
    color: "white",
    fontWeight: "800",
    fontSize: "11px",
    width: "16px",
    height: "16px",
    borderRadius: "3px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1",
    paddingBottom: "2px"
  }
};

export default Landing;
