"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = ["Trips", "How It Works", "Community", "About"];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="nav-root">
        {/* Mobile: hamburger only */}
        <button
          className="nav-hamburger"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(12,12,10,0.98)",
              zIndex: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                background: "none",
                border: "none",
                color: "var(--fog)",
                fontSize: "1.5rem",
                cursor: "pointer",
                lineHeight: 1,
                minWidth: 44,
                minHeight: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>

            {/* Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center" }}>
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.35, ease: "easeOut" }}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: "2.2rem",
                    color: "var(--paper)",
                    textDecoration: "none",
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {link}
                </motion.a>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="/register"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * NAV_LINKS.length, duration: 0.35, ease: "easeOut" }}
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                bottom: "2.5rem",
                left: "1.25rem",
                right: "1.25rem",
                background: "var(--ember)",
                color: "var(--paper)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textDecoration: "none",
                textAlign: "center",
                padding: "1rem",
                borderRadius: 2,
                minHeight: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              I'm in →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
