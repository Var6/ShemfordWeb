"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

export function CardSpotlight({
  children,
  className,
  radius = 400,
  color = "rgba(249,115,22,0.12)",
}: {
  children: React.ReactNode;
  className?: string;
  radius?: number;
  color?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const { left, top } = divRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    divRef.current.style.background = `radial-gradient(${radius}px circle at ${x}px ${y}px, ${color}, transparent 80%)`;
  };

  const handleMouseLeave = () => {
    if (!divRef.current) return;
    divRef.current.style.background = "";
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 border-orange-100 dark:border-orange-900/30 bg-white dark:bg-gray-900 transition-shadow duration-300 hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ── HoverCard grid (Aceternity "Card hover effect") ── */
export function HoverCards({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    icon?: React.ReactNode;
    stat?: string;
  }[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {items.map((item, i) => (
        <CardSpotlight key={i} className="p-6 group cursor-default">
          {/* glow ring that pulses on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
            ring-2 ring-orange-300/40 dark:ring-orange-600/30 pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-4">
            {item.icon && (
              <div className="w-11 h-11 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center
                group-hover:bg-orange-600 transition-colors duration-300">
                <span className="text-orange-600 group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </span>
              </div>
            )}
            {item.stat && (
              <p className="text-3xl font-extrabold text-orange-600 dark:text-orange-400">{item.stat}</p>
            )}
            <div>
              <p className="font-bold text-gray-900 dark:text-white mb-1 leading-snug">{item.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.description}</p>
            </div>
          </div>
        </CardSpotlight>
      ))}
    </div>
  );
}
