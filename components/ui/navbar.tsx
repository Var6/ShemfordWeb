"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon, NavIcon } from "../icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative bg-orange-600 z-10 mb-3" >
      {/* Small hoverable area */}
      <div
        className="h-[25px] bg-gradient-to-r  from-orange-600 to-yellow-400 w-full mb-10 absolute top-0 left-0"
        onMouseEnter={() => setIsOpen(true)}
      ></div>
      
      {/* Menu button */}
      <button
        className="absolute top-2 right-2 bg-yellow-400 text-white px-4 py-2 rounded flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
        <ChevronDownIcon/>
      </button>

      {/* Navbar with animation */}
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -50 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 w-full 
          bg-gradient-to-l from-orange-600 to-yellow-400 shadow-md p-4 ${isOpen ? "relative" : "absolute -z-10"} flex items-center justify-between`}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Hide logo on small screens */}
        <div className="hidden md:flex md:w-1/3 items-center justify-center gap-2">
  <Link href="/" className="flex flex-col items-center">
    <Image
      src="/icon.png"
      className="scale-75"
      alt="logo"
      height={150}
      width={150}
    />
    <p className="font-bold text-white">Shemford</p>
  </Link>
</div>
        <div className="flex md:w-2/3  flex-row">
{/* Main div for links */}
        <div className="flex md:w-1/3  flex-col">
{/* First div for links */}
        <ul className="flex-col gap-4 justify-center md:justify-center">
          <li>
            <Link href="/Message" className=" px-4 py-2 text-white hover:bg-orange-500 rounded flex items-center gap-1">
            <NavIcon/>Message
            </Link>
          </li>
          <li>
            <Link href="/blog" className=" px-4 py-2 text-white hover:bg-orange-500 rounded flex items-center gap-1">
            <NavIcon/> Blog
            </Link>
          </li>
          <li>
            <Link href="/Notification" className=" px-4 py-2 text-white hover:bg-orange-500 rounded flex items-center gap-1">
            <NavIcon/>Notification
            </Link>
          </li>
          <li>
            <Link href="/CBSE" className=" px-4 py-2 text-white hover:bg-orange-500 rounded flex items-center gap-1 ">
             <NavIcon/> CBSE
            </Link>
          </li>
        </ul>
        </div>
        {/* Second Div for links */}
        <div className="flex-col w-1/3">
          {/* Test links */}
          <ul className="flex-col gap-4 justify-center md:justify-center">
          <li>
            <Link href="/about" className="flex items-center gap-1 px-4 py-2 text-white hover:bg-orange-500 rounded">
            <NavIcon/>About Us
            </Link>
          </li>
          <li>
            <Link href="/blog" className="flex items-center gap-1 px-4 py-2 text-white hover:bg-orange-500 rounded">
            <NavIcon/>Blog
            </Link>
          </li>
          </ul>
        </div>
{/* third div for links */}
        <div className="flex-col w-1/3">
        {/* Test links */}
        <ul className="flex-col gap-4 justify-center md:justify-center">
          <li>
            <Link href="/Message" className="flex items-center gap-1 px-4 py-2 text-white hover:bg-orange-500 rounded">
            <NavIcon/>Message
            </Link>
          </li>
          <li>
            <Link href="/blog" className="flex items-center gap-1 px-4 py-2 text-white hover:bg-orange-500 rounded">
            <NavIcon/>Blog
            </Link>
          </li>
          </ul>
        </div>
        </div>
      </motion.nav>
    </div>
  );
}
