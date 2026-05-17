"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    title: "Pick your vibe.",
    body: "Solo, group, adventure, slow travel — tell us what moves you.",
    image: "/images/moment-railway.jpg",
  },
  {
    number: "02",
    title: "We build the setting.",
    body: "Curated route, hand-picked stays, real local moments.",
    image: "/images/pillar-bonding.jpg",
  },
  {
    number: "03",
    title: "You just show up.",
    body: "Everything handled. All you need to do is arrive.",
    image: "/images/beach-dusk.jpg",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const label = sectionRef.current.querySelector(".hiw-label");
    const cards = sectionRef.current.querySelectorAll(".hiw-card");

    if (label) {
      gsap.fromTo(label,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: label, start: "top 88%", once: true },
        }
      );
    }

    gsap.fromTo(cards,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="hiw-section">
      <p className="hiw-label">How it works</p>
      <div className="hiw-grid">
        {STEPS.map((step) => (
          <div key={step.number} className="hiw-card">
            <div className="hiw-img-wrap">
              <Image
                src={step.image}
                alt={step.title}
                fill
                style={{ objectFit: "cover" }}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
            <div className="hiw-card-text">
              <p className="hiw-step-num">{step.number}</p>
              <p className="hiw-step-title">{step.title}</p>
              <p className="hiw-step-body">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
