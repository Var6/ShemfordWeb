"use client";

import { useEffect, useState } from "react";

const shapeData = [
  {
    id: 1,
    className: "shape-1",
    baseX: -140,
    baseY: -100,
    factorX: 0.05,
    factorY: 0.08,
    rotate: "-18deg",
  },
  {
    id: 2,
    className: "shape-2",
    baseX: 70,
    baseY: 40,
    factorX: -0.03,
    factorY: 0.12,
    rotate: "12deg",
  },
  {
    id: 3,
    className: "shape-3",
    baseX: 180,
    baseY: 210,
    factorX: 0.02,
    factorY: -0.06,
    rotate: "10deg",
  },
  {
    id: 4,
    className: "shape-4",
    baseX: -120,
    baseY: 420,
    factorX: 0.07,
    factorY: 0.05,
    rotate: "-14deg",
  },
];

interface BackgroundShapesProps {
  overlay?: boolean;
}

export default function BackgroundShapes({ overlay = false }: BackgroundShapesProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`homepage-bg pointer-events-none ${
        overlay ? "absolute inset-0 z-10" : "fixed inset-0 -z-20"
      }`}
    >
      {shapeData.map((shape) => (
        <div
          key={shape.id}
          className={`shape ${shape.className}`}
          style={{
            transform: `translate3d(${shape.baseX + scrollY * shape.factorX}px, ${shape.baseY + scrollY * shape.factorY}px, 0) rotate(${shape.rotate})`,
          }}
        />
      ))}
    </div>
  );
}
