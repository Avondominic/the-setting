"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  { src: "/images/community-1.jpg",  alt: "Community" },
  { src: "/images/sunset-group.jpg", alt: "Mountain viewpoint sunset" },
  { src: "/images/trip-forest.jpg",  alt: "Forest trail" },
  { src: "/images/boat-sunset.jpg",  alt: "Group on boat at sunset" },
  { src: "/images/moment-beach.jpg", alt: "Beach" },
  { src: "/images/night-gather.jpg", alt: "Night gathering" },
  { src: "/images/ruins-group.jpg",  alt: "Group at ruins" },
];

export default function CommunityWall() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll<HTMLElement>(".community-item");
    if (!items?.length) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section className="community-section">
      <p className="community-label">From the road</p>
      <div ref={gridRef} className="community-grid">
        {IMAGES.map((img, i) => (
          <div key={i} className="community-item community-item--hover">
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={i % 3 === 0 ? 750 : 500}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
                filter: "saturate(0.9)",
              }}
              loading="lazy"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="community-item-overlay" />
          </div>
        ))}
      </div>
    </section>
  );
}
