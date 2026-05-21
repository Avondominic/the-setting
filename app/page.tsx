"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Navigation from "@/components/ui/Navigation";
import Pillars from "@/components/ui/Pillars";
import HowItWorks from "@/components/ui/HowItWorks";
import Manifesto from "@/components/ui/Manifesto";
import CommunityWall from "@/components/ui/CommunityWall";
import PlacesVisited from "@/components/sections/PlacesVisited";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-hero-line]", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });
    },
    { scope: heroRef }
  );

  return (
    <>
      <Navigation />

      {/* ── HERO ── */}
      <main
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero background"
          fill
          style={{ objectFit: "cover", zIndex: 0 }}
          priority
          sizes="100vw"
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(12,12,10,0.55)", zIndex: 1 }} />

        <div className="hero-inner">
          <p data-hero-line className="hero-eyebrow">
            THE SETTING<span style={{ color: "var(--ember)" }}>·</span>
          </p>

          <h1 className="hero-headline">
            <span data-hero-line className="hero-line-1">Still waiting for the right time?</span>
            <span data-hero-line className="hero-line-2">We find the spots.</span>
            <span data-hero-line className="hero-line-3">You find yourself.</span>
          </h1>

          <a data-hero-line href="/register" className="hero-cta">
            Join a trip →
          </a>
        </div>

        {/* Mobile-only scroll hint */}
        <p className="hero-scroll-hint">scroll ↓</p>
      </main>

      {/* ── PILLARS ── */}
      <section id="trips"><Pillars /></section>

      {/* ── PLACES VISITED ── */}
      <section id="places"><PlacesVisited /></section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works"><HowItWorks /></section>

      {/* ── MANIFESTO ── */}
      <section id="about"><Manifesto /></section>

      {/* ── COMMUNITY WALL ── */}
      <section id="community"><CommunityWall /></section>
    </>
  );
}
