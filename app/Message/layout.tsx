"use client";

import { useState, useEffect } from "react";
import CustomNav from "@/components/CustomNav";
import Message from "./mobile";

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Set mobile view for widths < 768px
    };

    handleResize(); // Check on first load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="w-full mt-4">
        <CustomNav className="w-full relative" Page="Message" />
      </div>

      {/* Conditional Rendering Based on Screen Size */}
      {isMobile ? (
        // Mobile Layout
        <div className="flex flex-col items-center justify-center px-4 mt-5 pb-10">
          <div className="w-full max-w-md text-center"><Message/></div>
        </div>
      ) : (
        // Desktop Layout
        <div className="flex flex-col items-center justify-center flex-grow px-8 mt-5 pb-10">
          <div className="w-full text-center">{children}</div>
        </div>
      )}
    </section>
  );
}
