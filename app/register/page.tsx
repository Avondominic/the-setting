"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
}

export default function RegisterPage() {
  const leftRef  = useRef<HTMLDivElement>(null);
  const formRef  = useRef<HTMLDivElement>(null);
  const btnRef   = useRef<HTMLButtonElement>(null);

  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [mobile,  setMobile]  = useState("");
  const [errors,  setErrors]  = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    if (leftRef.current) {
      gsap.fromTo(leftRef.current,
        { x: -35, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power2.out" }
      );
    }
    if (formRef.current) {
      const fields = formRef.current.querySelectorAll(".reg-field");
      gsap.fromTo(fields,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, delay: 0.3, ease: "power2.out" }
      );
    }
    if (btnRef.current) {
      gsap.fromTo(btnRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  function validate(): boolean {
    const e: FormErrors = {};
    if (!name.trim() || name.trim().length < 2)
      e.name = "Please enter your name";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      e.email = "Please enter a valid email address";
    const digits = mobile.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 12)
      e.mobile = "Please enter a valid contact number";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error("submit failed");
      setSuccess(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style suppressHydrationWarning>{`
        .reg-page {
          min-height: 100vh;
          display: flex;
          flex-direction: row;
          background: var(--ink);
        }
        /* ── LEFT ── */
        .reg-left {
          position: relative;
          width: 50%;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 3.5rem;
          overflow: hidden;
        }
        .reg-left-content { position: relative; z-index: 2; }
        .reg-brand {
          font-family: var(--font-syne);
          font-weight: 800;
          font-size: 0.9rem;
          letter-spacing: 0.35em;
          color: var(--paper);
          text-transform: uppercase;
        }
        .reg-brand-dot { color: var(--ember); }
        .reg-headline {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          color: var(--paper);
          line-height: 1.05;
          margin-top: 1rem;
          white-space: pre-line;
        }
        .reg-sub {
          font-family: var(--font-cormorant);
          font-style: italic;
          font-size: 1rem;
          color: var(--dust);
          margin-top: 1rem;
          white-space: pre-line;
          line-height: 1.6;
        }
        .reg-badges {
          display: flex;
          gap: 1.5rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }
        .reg-badge {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--fog);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ── RIGHT ── */
        .reg-right {
          width: 50%;
          background: #0f0f0d;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4rem 3.5rem;
          overflow-y: auto;
        }
        .reg-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.4em;
          color: var(--ember);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .reg-form-title {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: 1.8rem;
          color: var(--paper);
          margin-bottom: 2.5rem;
        }

        /* Fields */
        .reg-field { margin-bottom: 1.75rem; }
        .reg-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: var(--fog);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 0.5rem;
        }
        .reg-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(122,117,112,0.35);
          color: var(--paper);
          font-family: var(--font-cormorant);
          font-size: 1.1rem;
          padding: 0.75rem 0;
          outline: none;
          transition: border-color 0.3s ease;
          min-height: 44px;
        }
        .reg-input:focus { border-bottom-color: var(--ember); }
        #reg-mobile { font-variant-numeric: lining-nums; font-feature-settings: "lnum" 1; }
        .reg-input::placeholder { color: rgba(122,117,112,0.45); }
        .reg-input.invalid { border-bottom-color: #ef4444; }
        .reg-error {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: #ef4444;
          margin-top: 0.4rem;
          display: block;
        }

        /* Button */
        .reg-btn {
          width: 100%;
          margin-top: 2.5rem;
          background: var(--ember);
          color: var(--paper);
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: none;
          border-radius: 0;
          padding: 1rem 2rem;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          min-height: 52px;
        }
        .reg-btn:hover:not(:disabled) {
          background: var(--paper);
          color: var(--ember);
        }
        .reg-btn:disabled { opacity: 0.7; pointer-events: none; }
        .reg-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(242,237,228,0.3);
          border-top-color: var(--paper);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Error note */
        .reg-error-note {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--ember);
          margin-top: 1rem;
          display: block;
        }
        .reg-error-note a { color: var(--ember); text-decoration: underline; }

        /* Success */
        .reg-success {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
          animation: fadeUp 0.8s ease forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .reg-success-icon {
          font-size: 42px;
          color: var(--ember);
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .reg-success-title {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: 1.8rem;
          color: var(--paper);
        }
        .reg-success-sub {
          font-family: var(--font-cormorant);
          font-style: italic;
          font-size: 1rem;
          color: var(--dust);
          margin-top: 0.25rem;
        }
        .reg-success-cta {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--ember);
          margin-top: 1.5rem;
          text-decoration: none;
          display: inline-block;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .reg-page { flex-direction: column; }
          .reg-left {
            width: 100%;
            height: 42vh;
            min-height: 260px;
            padding: 2rem 1.25rem;
          }
          .reg-right {
            width: 100%;
            padding: 2.5rem 1.25rem 3rem;
            justify-content: center;
            min-height: 58vh;
          }
          .reg-input { font-size: 16px; }
          .reg-success { align-items: center; text-align: center; padding: 2rem 0; }
        }
      `}</style>

      <div className="reg-page">
        {/* ── LEFT ── */}
        <div ref={leftRef} className="reg-left">
          <Image
            src="/images/hero-bg.jpg"
            alt="The Setting"
            fill
            style={{ objectFit: "cover", zIndex: 0 }}
            priority
            sizes="50vw"
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(12,12,10,0.65)", zIndex: 1 }} />

          <div className="reg-left-content">
            <p className="reg-brand">
              THE SETTING<span className="reg-brand-dot">·</span>
            </p>
            <h1 className="reg-headline">{`One trip.\nEverything changes.`}</h1>
            <p className="reg-sub">{`Offbeat places. Vetted people.\nReal trips. No fluff.`}</p>
            <div className="reg-badges">
              <span className="reg-badge">Crazy</span>
              <span className="reg-badge">Memorable</span>
              <span className="reg-badge">Adventurous</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="reg-right">
          {success ? (
            <div className="reg-success">
              <div className="reg-success-icon">✦</div>
              <p className="reg-success-title">{"You're on the list."}</p>
              <p className="reg-success-sub">{"We'll WhatsApp you soon."}</p>
              <a href="/#trips" className="reg-success-cta">
                While you wait, check upcoming trips →
              </a>
            </div>
          ) : (
            <div ref={formRef}>
              <p className="reg-eyebrow">Join The Setting</p>
              <p className="reg-form-title">Tell us about yourself.</p>

              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="reg-field">
                  <label className="reg-label" htmlFor="reg-name">Full name</label>
                  <input
                    id="reg-name"
                    className={`reg-input${errors.name ? " invalid" : ""}`}
                    type="text"
                    placeholder="What do we call you?"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
                    autoComplete="name"
                  />
                  {errors.name && <span className="reg-error">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="reg-field">
                  <label className="reg-label" htmlFor="reg-email">Email address</label>
                  <input
                    id="reg-email"
                    className={`reg-input${errors.email ? " invalid" : ""}`}
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                    autoComplete="email"
                  />
                  {errors.email && <span className="reg-error">{errors.email}</span>}
                </div>

                {/* Mobile */}
                <div className="reg-field">
                  <label className="reg-label" htmlFor="reg-mobile">WhatsApp / Mobile number</label>
                  <input
                    id="reg-mobile"
                    className={`reg-input${errors.mobile ? " invalid" : ""}`}
                    type="tel"
                    placeholder="Enter your contact number"
                    value={mobile}
                    onChange={(e) => { setMobile(e.target.value); setErrors((p) => ({ ...p, mobile: undefined })); }}
                    autoComplete="tel"
                  />
                  {errors.mobile && <span className="reg-error">{errors.mobile}</span>}
                </div>

                <button ref={btnRef} className="reg-btn" type="submit" disabled={loading}>
                  {loading ? (
                    <><div className="reg-spinner" />Sending...</>
                  ) : (
                    "I'm in. Let's go. →"
                  )}
                </button>

                {error && (
                  <span className="reg-error-note">
                    Something went wrong.{" "}
                    <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">
                      WhatsApp us directly →
                    </a>
                  </span>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
