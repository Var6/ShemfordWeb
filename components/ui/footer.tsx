import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

const quickLinks = [
  { label: "Home",        href: "/"           },
  { label: "About Us",   href: "/about"      },
  { label: "Admissions", href: "/admission"  },
  { label: "Campus",     href: "/Campus"     },
  { label: "Events",     href: "/Events"     },
  { label: "Contact Us", href: "/contact"    },
];

const academicLinks = [
  { label: "CBSE Disclosure",  href: "/CBSE"        },
  { label: "Academic Calendar",href: "/Calender"    },
  { label: "Our Faculties",    href: "/Faculties"   },
  { label: "Facilities",       href: "/Facilities"  },
  { label: "Achievements",     href: "/Achivement"  },
  { label: "Announcements",    href: "/Announcement"},
];

const socialLinks = [
  { label: "Facebook",  href: siteConfig.links.facebook,  Icon: Facebook  },
  { label: "Instagram", href: siteConfig.links.instagram, Icon: Instagram },
  { label: "YouTube",   href: siteConfig.links.youtube,   Icon: Youtube   },
  { label: "Twitter",   href: siteConfig.links.twitter,   Icon: Twitter   },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* ── School info ── */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image src="/icon.png" alt="Shemford" width={44} height={44} />
              <div>
                <p className="font-bold text-white text-lg leading-tight">Shemford</p>
                <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest">
                  Futuristic School
                </p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Premier CBSE school in Jaganpur, Patna, Bihar — nurturing curious
              minds and building confident, capable citizens since 2012.
            </p>

            <div className="space-y-2.5 mb-6">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                <span>Jaganpura Road, Udaini, Patna, Bihar 804453</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-orange-500 shrink-0" />
                <a href="tel:+919431201060" className="hover:text-orange-400 transition-colors">
                  +91 94312 01060
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-orange-500 shrink-0" />
                <a href="mailto:info@shemfordpatna.com" className="hover:text-orange-400 transition-colors">
                  info@shemfordpatna.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-orange-500 shrink-0" />
                <a href="mailto:admissions@shemfordpatna.com" className="hover:text-orange-400 transition-colors">
                  admissions@shemfordpatna.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800
                    hover:bg-orange-600 text-gray-400 hover:text-white transition-colors"
                >
                  <s.Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="flex items-center gap-2 text-sm hover:text-orange-400 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Academics ── */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Academics
            </h3>
            <ul className="space-y-2.5">
              {academicLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="flex items-center gap-2 text-sm hover:text-orange-400 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Map ── */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Find Us
            </h3>
            <div className="rounded-xl overflow-hidden h-44">
              <iframe
                className="w-full h-full"
                src="https://maps.google.com/maps?width=600&height=400&hl=en&q=SHEMFORD%20Futuristic%20School%20Patna&t=&z=13&ie=UTF8&iwloc=B&output=embed"
                loading="lazy"
                title="Shemford Futuristic School location"
              />
            </div>
            <a
              href="https://maps.google.com/?q=SHEMFORD+Futuristic+School+Patna"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-sm text-orange-400
                hover:text-orange-300 transition-colors"
            >
              <MapPin className="h-3.5 w-3.5" />
              Get Directions
            </a>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row
          items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} SHEMFORD Futuristic School, Patna. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/CBSE/Disclouser" className="hover:text-orange-400 transition-colors">
              CBSE Disclosure
            </Link>
            <Link href="/admission" className="hover:text-orange-400 transition-colors">
              Admissions
            </Link>
            <Link href="/contact" className="hover:text-orange-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
