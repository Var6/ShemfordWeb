"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon, NavIcon } from "../icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure animations only run on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative bg-transparent z-10 mb-3">
      {/* Small hoverable area */}
      <div
        className="h-[25px] bg-gradient-to-r from-orange-600 to-yellow-400 w-full mb-10 absolute top-0 left-0"
        onMouseEnter={() => setIsOpen(true)}
      ></div>

      {/* Menu button */}
      <button
        className="absolute top-2 right-2 bg-yellow-400 text-white px-4 mt-3 py-2 rounded flex items-center gap-1 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
        <ChevronDownIcon />
      </button>

      {/* Navbar with animation - Only render after client is ready */}
      {isClient && (
        <motion.nav
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -50 }}
          transition={{
            duration: isOpen ? 0.6 : 0.8,
            ease: isOpen ? "easeOut" : "easeIn",
          }}
          className={`fixed top-0 left-0 w-full bg-gradient-to-l from-orange-400 to-yellow-400 shadow-md p-4 ${
            isOpen ? "relative" : "hidden"
          } flex flex-col md:flex-row items-start md:items-center justify-between`}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* Logo (Left Side on Medium Screens) */}
          <div className="hidden sm:flex w-full md:w-1/3 items-center justify-start px-4">
            <Link href="/" className="flex items-center w-full justify-center">
              <Image
                src="/icon.png"
                alt="logo"
                width={100}
                height={100}
                className="scale-75"
              />
              <p className="font-bold text-white ml-2">Shemford</p>
            </Link>
          </div>

          {/* Main Container for Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full text-left items-start gap-4 md:w-2/3">
            {/* Column 1 */}
            <div className="flex flex-col gap-2">
              <Link href="/Message" onClick={() => setIsOpen(false)} className="px-4 py-2 text-white hover:bg-orange-500 rounded flex items-start gap-1">
                <NavIcon /> Message
              </Link>
              <Link href="/Journal" onClick={() => setIsOpen(false)} className="px-4 py-2 text-white hover:bg-orange-500 rounded flex items-start gap-1">
                <NavIcon /> Journal
              </Link>
              <Link href="/Calender" onClick={() => setIsOpen(false)} className="px-4 py-2 text-white hover:bg-orange-500 rounded flex items-start gap-1">
                <NavIcon /> Calender
              </Link>
              <Link href="/CBSE" onClick={() => setIsOpen(false)} className="px-4 py-2 text-white hover:bg-orange-500 rounded flex items-start gap-1">
                <NavIcon /> CBSE
              </Link>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-2">
              <Link href="/Campus" onClick={() => setIsOpen(false)} className="px-4 py-2 text-white hover:bg-orange-500 rounded flex items-start gap-1">
                <NavIcon /> Campus
              </Link>
              <Link href="/Achivement" onClick={() => setIsOpen(false)} className="px-4 py-2 text-white hover:bg-orange-500 rounded flex items-start gap-1">
                <NavIcon /> Achivement
              </Link>
              <Link href="/Events" onClick={() => setIsOpen(false)} className="px-4 py-2 text-white hover:bg-orange-500 rounded flex items-start gap-1">
                <NavIcon /> Events
              </Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className="px-4 py-2 text-white hover:bg-orange-500 rounded flex items-start gap-1">
                <NavIcon /> About Us
              </Link>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-2">
              <Link href="/Announcement" onClick={() => setIsOpen(false)} className="px-4 py-2 text-white hover:bg-orange-500 rounded flex items-start gap-1">
                <NavIcon /> Announcement
              </Link>
              <Link href="/Faculties" onClick={() => setIsOpen(false)} className="px-4 py-2 text-white hover:bg-orange-500 rounded flex items-start gap-1">
                <NavIcon /> Our Faculties
              </Link>
            </div>
          </div>
        </motion.nav>
      )}
    </div>
  );
}