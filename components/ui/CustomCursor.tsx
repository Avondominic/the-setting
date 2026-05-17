"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only activate on fine-pointer devices (not touch)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      dot.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      ring.style.transform = `translate(${x - 16}px, ${y - 16}px)`;
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        ref={dotRef}
        data-cursor
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--ember)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        data-cursor
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(212, 82, 42, 0.45)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          transition: "transform 0.1s ease-out",
        }}
      />
    </>
  );
}
