"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PLACES = [
  {
    image: "/images/place-varkala.png",
    imagePosition: "center center",
    region: "KERALA · BEACH",
    name: "Varkala",
    description:
      "Red cliffs, endless coast, and sunsets that don't quit. The kind of beach that makes you forget what day it is.",
    visited: "Visited 8 times",
  },
  {
    image: "/images/place-hampi.png",
    imagePosition: "center 70%",
    region: "KARNATAKA · HERITAGE",
    name: "Hampi",
    description:
      "Boulder fields, ancient ruins, and silence loud enough to hear yourself think. Time-travel disguised as a weekend.",
    visited: "Visited 12 times",
  },
  {
    image: "/images/place-ddhills.png",
    imagePosition: "center center",
    region: "KARNATAKA · TREK",
    name: "Devarayanadurga",
    description:
      "Sunrise hikes through fog-soaked hills 90 minutes from Bangalore. Most people have never heard of it. Their loss.",
    visited: "Visited 6 times",
  },
  {
    image: "/images/place-udipi.png",
    imagePosition: "center 70%",
    region: "KARNATAKA · COAST",
    name: "Udipi",
    description:
      "Quiet beaches, temple towns, and the best coastal food you'll ever eat. Locals call it home. We call it home for a weekend.",
    visited: "Visited 5 times",
  },
  {
    image: "/images/place-malnad.png",
    imagePosition: "center 65%",
    region: "WESTERN GHATS · FARMSTAY",
    name: "Malnad Farmstay",
    description:
      "Deep in the Western Ghats, a working farm where you wake up to birdsong and sleep to silence. The disconnect you didn't know you needed.",
    visited: "Visited 9 times",
  },
  {
    image: "/images/place-yercaud.png",
    imagePosition: "center 30%",
    region: "TAMIL NADU · HILLS",
    name: "Yercaud",
    description:
      "Coffee estates, mist-covered hills, and roads that wind forever. Ooty's quieter, cooler cousin.",
    visited: "Visited 7 times",
  },
];

export default function PlacesVisited() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.querySelectorAll("[data-pv-line]"),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.7, ease: "power2.out", stagger: 0.12,
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", once: true },
        }
      );
    }

    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.querySelectorAll(".pv-card"),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8, ease: "power2.out", stagger: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: "top 88%", once: true },
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="pv-section">
      {/* HEADER */}
      <div ref={headerRef} className="pv-header">
        <p data-pv-line className="pv-eyebrow">Where We&apos;ve Been</p>
        <h2 data-pv-line className="pv-headline">
          <span className="pv-headline-ember">All offbeat.</span>
          <span>Many more coming.</span>
        </h2>
        <p data-pv-line className="pv-subtext">
          Every one of them offbeat. Every one of them worth it.
        </p>
      </div>

      {/* PLACES GRID */}
      <div ref={gridRef} className="pv-grid">
        {PLACES.map((place) => (
          <div key={place.name} className="pv-card">
            {/* Image */}
            <div className="pv-card-img-wrap">
              <Image
                src={place.image}
                alt={place.name}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: place.imagePosition,
                  transform: place.imageScale ? `scale(${place.imageScale})` : undefined,
                  transformOrigin: "center center",
                }}
                className="pv-card-img"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="pv-card-img-overlay" />
            </div>

            {/* Content */}
            <div className="pv-card-content">
              <p className="pv-card-region">{place.region}</p>
              <p className="pv-card-name">{place.name}</p>
              <p className="pv-card-desc">{place.description}</p>
              <div className="pv-card-footer">
                <span className="pv-card-visited">{place.visited}</span>
                <span className="pv-card-cta">View trips →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
