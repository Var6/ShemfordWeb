"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Facebook, Instagram, Twitter, Youtube,
  Menu, X, ChevronDown, ChevronRight, Phone, Mail,
} from "lucide-react";
import { siteConfig } from "@/config/site";

interface NavItem {
  label: string;
  href?: string;
  items?: NavItem[];
}

const socialLinks = [
  { label: "Facebook",  href: siteConfig.links.facebook,  Icon: Facebook  },
  { label: "Instagram", href: siteConfig.links.instagram, Icon: Instagram },
  { label: "YouTube",   href: siteConfig.links.youtube,   Icon: Youtube   },
  { label: "Twitter",   href: siteConfig.links.twitter,   Icon: Twitter   },
];

const navLinks: NavItem[] = [
  { label: "Home",  href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Academics",
    items: [
      { label: "CBSE Disclosure", href: "/CBSE"       },
      { label: "Calendar",        href: "/Calender"   },
      { label: "Admission",       href: "/admission"  },
      { label: "Facilities",      href: "/Facilities" },
      { label: "Faculties",       href: "/Faculties"  },
    ],
  },
  {
    label: "Campus",
    items: [
      { label: "Overview", href: "/Campus" },
      {
        label: "Student Life",
        items: [
          { label: "Events",        href: "/Events"       },
          { label: "Achievements",  href: "/Achivement"   },
          { label: "Announcements", href: "/Announcement" },
          { label: "Toppers",       href: "/Toppers"      },
        ],
      },
    ],
  },
  {
    label: "Connect",
    items: [
      { label: "Message",    href: "/Message"     },
      { label: "Journal",    href: "/Journal"     },
      { label: "Contact Us", href: "/contact"     },
      { label: "Grievances", href: "/grievances"  },
    ],
  },
];

/* ── Mobile accordion item ── */
function MobileNavItem({
  item,
  depth = 0,
  onClose,
}: {
  item: NavItem;
  depth?: number;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const pl = `${(depth + 1) * 16}px`;

  if (item.items) {
    return (
      <div>
        <button
          onClick={() => setOpen((o) => !o)}
          style={{ paddingLeft: pl }}
          className="w-full flex items-center justify-between pr-4 py-3 text-sm font-medium text-gray-800 hover:text-orange-600 hover:bg-orange-50 transition-colors"
        >
          <span>{item.label}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && (
          <div className="border-l-2 border-orange-200 ml-4">
            {item.items.map((child) => (
              <MobileNavItem key={child.label} item={child} depth={depth + 1} onClose={onClose} />
            ))}
          </div>
        )}
      </div>
    );
  }

  const isActive = pathname === item.href;
  return (
    <Link
      href={item.href || "#"}
      onClick={onClose}
      style={{ paddingLeft: pl }}
      className={`block pr-4 py-3 text-sm transition-colors ${
        isActive
          ? "text-orange-600 font-semibold bg-orange-50"
          : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
      }`}
    >
      {item.label}
    </Link>
  );
}

/* ── Main Navbar ── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeMenu, setActiveMenu]     = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname     = usePathname();

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const openMenu    = (label: string) => { clearTimeout(menuTimer.current!);    setActiveMenu(label); };
  const closeMenu   = ()              => { menuTimer.current    = setTimeout(() => { setActiveMenu(null); setActiveSubmenu(null); }, 180); };
  const openSub     = (label: string) => { clearTimeout(submenuTimer.current!); setActiveSubmenu(label); };
  const closeSub    = ()              => { submenuTimer.current = setTimeout(() => setActiveSubmenu(null), 180); };

  return (
    <header className="w-full z-50 sticky top-0">

      {/* ── Top info bar ── */}
      <div className="bg-gray-950 text-gray-400 text-xs px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-4 flex-wrap">
          <a href="mailto:info@shemfordpatna.com"
            className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
            <Mail className="h-3 w-3" /> info@shemfordpatna.com
          </a>
          <span className="h-3 w-px bg-gray-700" />
          <a href="tel:+919431201060"
            className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
            <Phone className="h-3 w-3" /> +91 94312 01060
          </a>
          <span className="h-3 w-px bg-gray-700" />
          <a href="mailto:admissions@shemfordpatna.com"
            className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
            <Mail className="h-3 w-3" /> admissions@shemfordpatna.com
          </a>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          {socialLinks.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              aria-label={s.label}
              className="p-1.5 rounded hover:text-orange-400 transition-colors">
              <s.Icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[4.5rem]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image src="/icon.png" alt="Shemford logo" width={46} height={46} />
            <div className="leading-tight">
              <p className="font-bold text-gray-900 text-xl tracking-tight">Shemford</p>
              <p className="text-orange-600 text-[0.64rem] font-semibold uppercase tracking-[0.22em]">
                Futuristic School
              </p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((item) => {
              if (!item.items) {
                const isActive = pathname === item.href;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href || "#"}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "text-orange-600 bg-orange-50"
                          : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const isRight = item.label === "Campus" || item.label === "Connect";

              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openMenu(item.label)}
                  onMouseLeave={closeMenu}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeMenu === item.label
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                    aria-expanded={activeMenu === item.label}
                    aria-haspopup="menu"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        activeMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-full ${isRight ? "right-0" : "left-0"} mt-1.5 min-w-[220px]
                      bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden py-1
                      transition-all duration-150 ${
                        activeMenu === item.label
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-1 pointer-events-none"
                      }`}
                  >
                    {item.items.map((child) => {
                      if (!child.items) {
                        return (
                          <Link
                            key={child.label}
                            href={child.href || "#"}
                            className="flex items-center px-4 py-2.5 text-sm text-gray-700
                              hover:text-orange-600 hover:bg-orange-50 transition-colors"
                          >
                            {child.label}
                          </Link>
                        );
                      }

                      return (
                        <div
                          key={child.label}
                          className="relative"
                          onMouseEnter={() => openSub(child.label)}
                          onMouseLeave={closeSub}
                        >
                          <button
                            type="button"
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-sm
                              transition-colors ${
                                activeSubmenu === child.label
                                  ? "text-orange-600 bg-orange-50"
                                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                              }`}
                          >
                            <span>{child.label}</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>

                          {/* Nested submenu */}
                          <div
                            className={`absolute top-0 ${isRight ? "right-full mr-1.5" : "left-full ml-1.5"}
                              min-w-[200px] bg-white border border-gray-200 rounded-xl shadow-xl
                              overflow-hidden py-1 transition-all duration-150 ${
                                activeSubmenu === child.label
                                  ? "opacity-100 visible translate-x-0"
                                  : `opacity-0 invisible ${isRight ? "translate-x-2" : "-translate-x-2"} pointer-events-none`
                              }`}
                          >
                            {child.items.map((nested) => (
                              <Link
                                key={nested.label}
                                href={nested.href || "#"}
                                className="flex items-center px-4 py-2.5 text-sm text-gray-700
                                  hover:text-orange-600 hover:bg-orange-50 transition-colors"
                              >
                                {nested.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Right: Apply button + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/admission"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-orange-600
                hover:bg-orange-700 text-white text-sm font-semibold rounded-lg
                transition-colors shadow-sm"
            >
              Apply Now
            </Link>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-orange-600
                hover:bg-orange-50 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto">
            {navLinks.map((item) => (
              <MobileNavItem key={item.label} item={item} onClose={() => setMobileOpen(false)} />
            ))}
            <div className="px-4 py-4 border-t border-gray-100">
              <Link
                href="/admission"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center py-3 bg-orange-600 hover:bg-orange-700
                  text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
