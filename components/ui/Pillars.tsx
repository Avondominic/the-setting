"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    id: 1,
    image: "/images/pillar-yourself.jpg",
    imagePosition: "center center",
    overlay: "rgba(12,12,10,0.35)",
    bigWord: "Find Yourself.",
    subtext: "Somewhere between the journey\nand the destination, it happens.",
    extra: "One weekend. The right place.\nThe wrong plan. That's all it takes.",
    stat: "47 trips. Every single one changed someone.",
  },
  {
    id: 2,
    image: "/images/pillar-moment.jpg",
    imagePosition: "center center",
    overlay: "rgba(12,12,10,0.45)",
    bigWord: "Live the Moment.",
    subtext: "Street food at midnight.\nThis is the trip.",
    extra: "No itinerary. No schedule.\nJust whatever happens next.",
    stat: "Zero itineraries. Every time.",
  },
  {
    id: 3,
    image: "/images/pillar-adventure.png",
    imagePosition: "center center",
    overlay: "rgba(12,12,10,0.4)",
    bigWord: "Go Beyond.",
    subtext: "Places that aren't on any list.\nWe know them all.",
    extra: "The hidden ones, the quiet ones,\nthe ones worth the journey.",
    stat: "100% offbeat. Always.",
  },
  {
    id: 4,
    image: "/images/community-2.jpg",
    imagePosition: "center center",
    overlay: "rgba(12,12,10,0.5)",
    bigWord: "Your Tribe.",
    subtext: "30 strangers board.\n30 friends get off.",
    extra: "The group is the trip.\nGet the group right and it doesn't matter.",
    stat: "Every person vetted. Every time.",
  },
  {
    id: 5,
    image: "/images/manifesto-bg.jpg",
    imagePosition: "20% center",
    overlay: "rgba(12,12,10,0.45)",
    bigWord: "Unforgettable Memories.",
    subtext: "You'll talk about this one\nfor years. Trust us.",
    extra: "30 people who get it.\nThe places nobody talks about.",
    stat: "Est. 2022. Still going.",
  },
];

export default function Pillars() {
  const outerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const panels = panelRefs.current;
    if (!panels.length || !outerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      // Desktop: sticky crossfade
      gsap.set(panels, { opacity: 0 });
      gsap.set(panels[0], { opacity: 1 });

      const total = PILLARS.length;
      // Transitions fill first 5/6 of the container (500vh of 600vh).
      // The remaining 1/6 (100vh) is dwell time on the last panel before
      // the section exits — so the user can actually read it.
      const scale = total / (total + 1);
      panels.forEach((_, i) => {
        if (i === 0) return;
        ScrollTrigger.create({
          trigger: outerRef.current,
          start: `top+=${(i / total) * scale * 100}% top`,
          end: `top+=${((i + 1) / total) * scale * 100}% top`,
          onEnter: () => {
            gsap.to(panels[i - 1], { opacity: 0, duration: 0.7, ease: "power2.inOut" });
            gsap.to(panels[i], { opacity: 1, duration: 0.7, ease: "power2.inOut" });
            setActive(i);
          },
          onLeaveBack: () => {
            gsap.to(panels[i], { opacity: 0, duration: 0.7, ease: "power2.inOut" });
            gsap.to(panels[i - 1], { opacity: 1, duration: 0.7, ease: "power2.inOut" });
            setActive(i - 1);
          },
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        gsap.set(panels, { opacity: 1 });
      };
    });

    mm.add("(max-width: 768px)", () => {
      // Mobile: each panel fades + slides up as it enters viewport
      gsap.set(panels, { opacity: 0, y: 50 });
      panels.forEach((panel) => {
        gsap.to(panel, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 88%",
            once: true,
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <div ref={outerRef} className="pillars-outer">
        <div className="pillars-sticky">
          {PILLARS.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => { panelRefs.current[i] = el; }}
              className="pillar-panel"
            >
              <div className="pillar-frame">
                {/* LEFT — image */}
                <div className="pillar-image-col">
                  <Image
                    src={p.image}
                    alt={p.bigWord}
                    fill
                    style={{ objectFit: "cover", objectPosition: p.imagePosition }}
                    priority={i === 0}
                    loading={i === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, 55vw"
                  />
                  <div style={{ position: "absolute", inset: 0, background: p.overlay }} />
                </div>

                {/* RIGHT — text */}
                <div className="pillar-text-col">
                  <p className="pillar-bigword">{p.bigWord}</p>
                  <div className="pillar-rule" />
                  <p className="pillar-subtext">{p.subtext}</p>
                  <p className="pillar-extra">{p.extra}</p>
                  <p className="pillar-stat">{p.stat}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Dot nav — desktop only */}
          <div className="pillar-dots">
            {PILLARS.map((_, i) => (
              <div
                key={i}
                className="pillar-dot"
                style={{
                  background: active === i ? "var(--ember)" : "rgba(242,237,228,0.2)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

