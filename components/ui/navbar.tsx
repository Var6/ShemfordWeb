"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { siteConfig } from "@/config/site";

interface NavItem {
  label: string;
  href?: string;
  items?: NavItem[];
}

const socialLinks = [
  { label: "Facebook", href: siteConfig.links.facebook, Icon: Facebook },
  { label: "Instagram", href: siteConfig.links.instagram, Icon: Instagram },
  { label: "YouTube", href: siteConfig.links.youtube, Icon: Youtube },
  { label: "Twitter", href: siteConfig.links.twitter, Icon: Twitter },
];

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Academics",
    items: [
      { label: "CBSE", href: "/CBSE" },
      { label: "Calendar", href: "/Calender" },
      { label: "Admission", href: "/admission" },
      { label: "Facilities", href: "/Facilities" },
      { label: "Faculties", href: "/Faculties" },
    ],
  },
  {
    label: "Campus",
    items: [
      { label: "Overview", href: "/Campus" },
      {
        label: "Student Life",
        items: [
          { label: "Events", href: "/Events" },
          { label: "Achievements", href: "/Achivement" },
          { label: "Announcements", href: "/Announcement" },
        ],
      },
    ],
  },
  {
    label: "Connect",
    items: [
      { label: "Message", href: "/Message" },
      { label: "Journal", href: "/Journal" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

function renderNavItem(
  item: NavItem,
  activeMenu: string | null,
  setActiveMenu: (value: string | null) => void,
  activeSubmenu: string | null,
  setActiveSubmenu: (value: string | null) => void,
  menuLeaveTimer: React.MutableRefObject<number | null>,
  submenuLeaveTimer: React.MutableRefObject<number | null>,
) {
  const isRightAligned = item.label === 'Campus' || item.label === 'Connect';

  if (item.items) {
    return (
      <li
        key={item.label}
        className="relative"
        onMouseEnter={() => {
          if (menuLeaveTimer.current) {
            window.clearTimeout(menuLeaveTimer.current);
            menuLeaveTimer.current = null;
          }
          setActiveMenu(item.label);
        }}
        onMouseLeave={() => {
          if (menuLeaveTimer.current) {
            window.clearTimeout(menuLeaveTimer.current);
          }
          menuLeaveTimer.current = window.setTimeout(() => {
            setActiveMenu(null);
            setActiveSubmenu(null);
            menuLeaveTimer.current = null;
          }, 2000);
        }}
      >
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-3xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70"
          aria-expanded={activeMenu === item.label}
          aria-haspopup="menu"
        >
          {item.label}
          <span className="text-xs">▾</span>
        </button>

        <div
          className={`absolute top-full z-50 mt-3 min-w-[20rem] rounded-[28px] border border-slate-700/60 bg-orange-700 p-4 shadow-2xl backdrop-blur-xl transition duration-200 ${
            isRightAligned ? 'right-0' : 'left-0'
          } ${
            activeMenu === item.label
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible -translate-y-2'
          }`}
        >
          <ul className="space-y-2">
            {item.items.map((child) => (
              <li
                key={child.label}
                className="relative"
                onMouseEnter={() => {
                  if (submenuLeaveTimer.current) {
                    window.clearTimeout(submenuLeaveTimer.current);
                    submenuLeaveTimer.current = null;
                  }
                  setActiveSubmenu(child.label);
                }}
                onMouseLeave={() => {
                  if (submenuLeaveTimer.current) {
                    window.clearTimeout(submenuLeaveTimer.current);
                  }
                  submenuLeaveTimer.current = window.setTimeout(() => {
                    setActiveSubmenu(null);
                    submenuLeaveTimer.current = null;
                  }, 2000);
                }}
              >
                {child.items ? (
                  <>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between rounded-2xl bg-orange-600 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-orange-400"
                      aria-expanded={activeSubmenu === child.label}
                      aria-haspopup="menu"
                    >
                      <span>{child.label}</span>
                      <span className="text-xs">▸</span>
                    </button>
                    <div
                      className={`absolute top-0 z-50 min-w-[18rem] rounded-[28px] border border-orange-600 bg-orange-600 p-4 shadow-2xl backdrop-blur-xl transition duration-200 ${
                        isRightAligned ? 'right-full mr-3' : 'left-full ml-3'
                      } ${
                        activeSubmenu === child.label
                          ? 'opacity-100 visible translate-x-0'
                          : 'opacity-0 invisible -translate-x-2'
                      }`}
                    >
                      <ul className="space-y-2">
                        {child.items.map((nested) => (
                          <li key={nested.label}>
                            <Link
                              href={nested.href || '#'}
                              className="block rounded-2xl px-4 py-3 text-sm text-white transition hover:bg-orange-400"
                            >
                              {nested.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={child.href || '#'}
                    className="block rounded-2xl bg-orange-600 px-4 py-3 text-sm text-white transition hover:bg-orange-400"
                  >
                    {child.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li key={item.label}>
      <Link
        href={item.href || '#'}
        className="inline-flex rounded-3xl px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
      >
        {item.label}
      </Link>
    </li>
  );
}

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuLeaveTimer = useRef<number | null>(null);
  const submenuLeaveTimer = useRef<number | null>(null);

  return (
    <header className="w-full z-50 sticky top-0"> 
      <div className="bg-orange-600 text-slate-300 text-xs px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between flex-wrap gap-2 border-b border-white/10 shadow-[0_1px_20px_rgba(0,0,0,0.2)]">
        <div className="flex flex-wrap items-center gap-4 text-slate-200">
          <a
            href="mailto:info@shemfordpatna.com"
            className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors"
          >
            ✉ info@shemfordpatna.com
          </a>
          <span className="h-3 w-px bg-orange-700" />
          <a
            href="tel:+919431201060"
            className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors"
          >
            ☎ +91 94312 1060
          </a>
          <span className="h-3 w-px bg-orange-700" />
          <a
            href="mailto:admissions@shemfordpatna.com"
            className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors"
          >
            ✉ admissions@shemfordpatna.com
          </a>
        </div>
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-300">
          {socialLinks.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/20 hover:text-yellow-300"
            >
              <s.Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <nav className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 px-4 sm:px-6 lg:px-8 py-3 shadow-xl border-b border-white/20">
        <div className="absolute inset-x-0 bottom-0 h-2 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_54%)] pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 py-2 flex-shrink-0">
            <Image
              src="/icon.png"
              alt="Shemford logo"
              width={52}
              height={52}
              className="rounded-2xl border border-white/25 bg-white/10 p-1"
            />
            <div className="leading-tight">
              <p className="text-white font-bold text-xl tracking-tight">Shemford</p>
              <p className="text-white/90 text-[0.72rem] uppercase tracking-[0.28em]">Futuristic School</p>
            </div>
          </Link>

          <ul className="flex flex-wrap items-center gap-2">
            {navLinks.map((item) =>
              renderNavItem(
                item,
                activeMenu,
                setActiveMenu,
                activeSubmenu,
                setActiveSubmenu,
                menuLeaveTimer,
                submenuLeaveTimer,
              ),
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
