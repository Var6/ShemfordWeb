"use client";

import Link from "next/link";
import Image from "next/image";

interface NavItem {
  label: string;
  href?: string;
  items?: NavItem[];
}

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/shemford" },
  { label: "Instagram", href: "https://instagram.com/shemford" },
  { label: "YouTube", href: "https://youtube.com/@shemford" },
  { label: "Twitter", href: "https://twitter.com/shemford" },
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
      { label: "Shemford Hub", href: "/Shemford" },
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

function renderNavItem(item: NavItem) {
  if (item.items) {
    return (
      <li key={item.label} className="group relative">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-3xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70"
        >
          {item.label}
          <span className="text-xs">▾</span>
        </button>

        <div className="absolute left-0 top-full z-50 mt-3 min-w-[20rem] rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-2xl opacity-0 pointer-events-none transition duration-200 group-hover:opacity-100 group-hover:pointer-events-auto">
          <ul className="space-y-2">
            {item.items.map((child) => (
              <li key={child.label} className="group relative">
                {child.items ? (
                  <>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                    >
                      <span>{child.label}</span>
                      <span className="text-xs">▸</span>
                    </button>
                    <div className="absolute left-full top-0 ml-3 min-w-[18rem] rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-2xl opacity-0 pointer-events-none transition duration-200 group-hover:opacity-100 group-hover:pointer-events-auto">
                      <ul className="space-y-2">
                        {child.items.map((nested) => (
                          <li key={nested.label}>
                            <Link
                              href={nested.href || '#'}
                              className="block rounded-2xl px-4 py-3 text-sm text-slate-900 transition hover:bg-slate-100"
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
                    className="block rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-900 transition hover:bg-slate-100"
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
  return (
    <header className="w-full z-50 sticky top-0">
      <div className="bg-slate-950 text-slate-300 text-xs px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between flex-wrap gap-2 border-b border-white/10 shadow-[0_1px_20px_rgba(0,0,0,0.2)]">
        <div className="flex flex-wrap items-center gap-4 text-slate-200">
          <a
            href="mailto:info@shemford.edu.in"
            className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors"
          >
            ✉ info@shemford.edu.in
          </a>
          <span className="h-3 w-px bg-slate-700" />
          <a
            href="tel:+919999900000"
            className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors"
          >
            ☎ +91 99999 00000
          </a>
        </div>
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-slate-300">
          {socialLinks.map((s, i) => (
            <span key={s.label} className="flex items-center gap-4">
              {i !== 0 && <span className="h-3 w-px bg-slate-700" />}
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300 transition-colors"
              >
                {s.label}
              </a>
            </span>
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
            {navLinks.map((item) => renderNavItem(item))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
