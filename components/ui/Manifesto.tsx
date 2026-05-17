"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll("[data-manifesto-line]");
    gsap.fromTo(els,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: "power2.out", stagger: 0.15,
        scrollTrigger: { trigger: contentRef.current, start: "top 80%", once: true },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      <section className="manifesto-section">
        <Image
          src="/images/manifesto-bg.jpg"
          alt="Manifesto"
          fill
          style={{ objectFit: "cover" }}
          loading="lazy"
          sizes="100vw"
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(12,12,10,0.6)" }} />

        <div ref={contentRef} className="manifesto-content">
          <p data-manifesto-line className="manifesto-label">Our manifesto</p>
          <p data-manifesto-line className="manifesto-quote">
            Travel isn't about ticking boxes.
            It's about the moment the light hits different, the conversation that
            lasts till 3am, the detour that becomes the whole point.
            <br /><br />
            We build those moments on purpose.
          </p>
          <div data-manifesto-line className="manifesto-rule" />
        </div>
      </section>
    </>
  );
}
